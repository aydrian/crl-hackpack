import { type LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { SocialBar } from "~/components/social-bar.tsx";
import { TrackingLink } from "~/components/tracking-link.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "~/components/ui/accordion.tsx";
import { Badge } from "~/components/ui/badge.tsx";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/components/ui/card.tsx";
import imgCampRoach from "~/images/camp-roach.webp";
import imgCampRoach2 from "~/images/camp-roach-2.webp";
import imgOffice from "~/images/office.webp";
import imgRoofParty from "~/images/roof-party.webp";
import { findBySlug } from "~/utils/hackathons.server.ts";
import { cn } from "~/utils/misc.ts";

export async function loader({ params }: LoaderArgs) {
  const { hackathonSlug } = params;
  const hackathon = await findBySlug(hackathonSlug, {
    id: true,
    name: true,
    slug: true,
    staff: {
      orderBy: { staff: { firstName: "asc" } },
      select: { alumYear: true, staff: true },
      where: { roles: { has: "recruiter" } }
    }
  });

  return json({ hackathon });
}

export default function Careers() {
  const { hackathon } = useLoaderData<typeof loader>();
  const singleRecruiter = hackathon?.staff.length === 1;
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 bg-hero-pattern bg-cover bg-no-repeat p-4 text-white">
        <h1 className="font-poppins text-4xl font-bold leading-none tracking-tight">
          Careers
        </h1>
        <code className="text-center font-mono text-xl">
          &#47;* Thrive at Cockroach Labs */
        </code>
      </div>
      <img
        alt="Cockroach Labs Office"
        className="mx-auto my-4 max-w-5xl rounded-md md:shadow-md"
        src={imgOffice}
      />
      <div className="mx-auto max-w-5xl md:mx-auto md:flex">
        <div>
          <section className="py-4">
            <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
              Students / Internship Program
            </h2>
            <p className="mb-4 text-gray-800">
              Looking for an intership? Check out what the Cockroach Labs{" "}
              <TrackingLink
                className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                href="https://www.cockroachlabs.com/careers/internships/"
              >
                Students / Internship Program
              </TrackingLink>{" "}
              has to offer.
            </p>
          </section>
          <section className="mx-auto max-w-5xl py-4">
            <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
              Open Positions
            </h2>
            <p className="mb-4 text-gray-800">
              Graduating soon and looking to start your career with something
              full time? Check out our current{" "}
              <TrackingLink
                className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                href="https://www.cockroachlabs.com/careers/open-positions/"
              >
                Open Positions
              </TrackingLink>{" "}
              across all our departments. You can also learn about our{" "}
              <TrackingLink
                className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                href="https://www.cockroachlabs.com/careers/open-interview/"
              >
                Open Interview Process
              </TrackingLink>
              .
            </p>
          </section>
        </div>
        <img
          alt="Camp Roach"
          className="mx-auto rounded-md object-cover md:mt-4 md:w-1/4 md:rotate-6 md:shadow-md"
          src={imgCampRoach}
        />
      </div>
      <div className="mx-auto max-w-5xl md:mx-auto md:flex md:flex-row-reverse">
        <section className="py-4">
          <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
            FAQs
          </h2>
          <p className="mb-4 text-gray-800">
            In addition to the FAQs found at the bottom of the{" "}
            <TrackingLink
              className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
              href="https://www.cockroachlabs.com/careers/internships/"
            >
              Students / Internship Program
            </TrackingLink>{" "}
            page, here are some frequently asked questions we get at hackathons:
            <Accordion collapsible type="single">
              <AccordionItem value="item-1">
                <AccordionTrigger>Can I give you my resume?</AccordionTrigger>
                <AccordionContent>
                  You can, but we would much rather you submit it as part of
                  your application.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Where will interns be located?
                </AccordionTrigger>
                <AccordionContent>
                  All interns will be expected to work from our NYC HQ.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Are there location requirements for joining as a new grad?
                </AccordionTrigger>
                <AccordionContent>
                  New grads will be expected to work out of our offices in NYC
                  or Toronto.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </p>
        </section>
        <img
          alt="Infest Party"
          className="mx-auto rounded-md object-cover md:mb-4 md:mr-6 md:max-w-[25%] md:-rotate-6"
          src={imgCampRoach2}
        />
      </div>
      {hackathon?.staff ? (
        <section className="mx-auto max-w-5xl py-4">
          <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
            Ask the on-site Recruiter
          </h2>
          <p className="mb-4 text-gray-800">
            Unable to find the answer to your question above? Want to hear more
            about what life is like at Cockroach Labs? Come talk to our
            in-person recruiter.
          </p>
          <div>
            {hackathon.staff.map(({ alumYear, staff }) => (
              <Card
                className={cn(
                  "overflow-hidden",
                  singleRecruiter ? "flex w-fit" : "max-w-[210px]"
                )}
                key={staff.id}
              >
                <div
                  className={cn(
                    "relative",
                    singleRecruiter ? "basis-1/3" : undefined
                  )}
                >
                  {alumYear ? (
                    <Badge className="absolute bottom-1 right-1 bg-crl-dark-blue text-[8px] opacity-70">{`Class of ${alumYear}`}</Badge>
                  ) : null}
                  <img
                    alt={`${staff.firstName} ${staff.lastName}`}
                    className={cn(
                      "aspect-square",
                      singleRecruiter ? "w-[150px]" : "w-full"
                    )}
                    src={staff.image}
                  />
                </div>
                <CardHeader
                  className={cn(
                    singleRecruiter ? "basis-2/3 space-y-0" : undefined
                  )}
                >
                  <CardTitle>{`${staff.firstName} ${staff.lastName}`}</CardTitle>
                  <CardDescription>{staff.title}</CardDescription>
                  <SocialBar staff={staff} />
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <img
        alt="Party on Cockroach Labs Roofdeck"
        className="mx-auto my-4 max-w-5xl rounded-md"
        src={imgRoofParty}
      />
    </>
  );
}
