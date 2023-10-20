import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Icon } from "~/components/icon.tsx";
import { SocialBar } from "~/components/social-bar.tsx";
import { TrackingLink } from "~/components/tracking-link.tsx";
import { Badge } from "~/components/ui/badge.tsx";
import { Button } from "~/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card.tsx";
import { findBySlug } from "~/utils/hackathons.server.ts";
import { cn } from "~/utils/misc.ts";

export async function loader({ params }: LoaderFunctionArgs) {
  const { hackathonSlug } = params;
  const hackathon = await findBySlug(hackathonSlug, {
    id: true,
    name: true,
    slug: true,
    staff: {
      orderBy: { staff: { firstName: "asc" } },
      select: { alumYear: true, roles: true, staff: true }
    }
  });

  return json({ hackathon });
}

export default function Help() {
  const { hackathon } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 bg-hero-pattern bg-cover bg-no-repeat p-4 text-white">
        <h1 className="font-poppins text-4xl font-bold leading-none tracking-tight">
          Get Help
        </h1>
        <code className="text-center font-mono text-xl">
          &#47;* Survive anything. Thrive everywhere. */
        </code>
      </div>
      {hackathon ? (
        <section className="mx-auto max-w-5xl py-4">
          <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
            On-site Team
          </h2>
          <p className="mb-4 text-gray-800">
            Come find one of our team members to help you out.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {hackathon.staff.map(({ alumYear, roles, staff }) => (
              <Card
                className="flex max-w-[210px] flex-col overflow-hidden"
                key={staff.id}
              >
                <div className="relative">
                  {alumYear ? (
                    <div className="absolute bottom-0 right-0 w-full bg-gradient-to-r from-crl-dark-blue via-crl-electric-purple p-1 text-xs font-medium text-white">{`Class of ${alumYear} Alum`}</div>
                  ) : null}
                  <img
                    alt={`${staff.firstName} ${staff.lastName}`}
                    className="aspect-square w-full"
                    src={staff.image}
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle>{`${staff.firstName} ${staff.lastName}`}</CardTitle>
                  <CardDescription>
                    <div>{staff.title}</div>
                    <div className="min-h-[1rem] text-xs font-light">
                      {staff.location}
                    </div>
                  </CardDescription>
                  <SocialBar staff={staff} />
                </CardHeader>
                <CardContent className="grow p-4 pt-0">
                  <div className="font-medium">Ask me about...</div>
                  <p className="text-sm font-light text-gray-800">
                    {staff.askAbout}
                  </p>
                </CardContent>
                <CardFooter className="flex-wrap gap-1 p-4 pt-0">
                  {roles.sort().map((role) => (
                    <Badge
                      className={cn(
                        role === "judge" && "bg-crl-deep-purple",
                        role === "mentor" && "bg-crl-action-blue",
                        role === "recruiter" && "bg-crl-electric-purple"
                      )}
                      key={role}
                    >
                      {role}
                    </Badge>
                  ))}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
      <section className="mx-auto max-w-5xl py-4">
        <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          <Icon
            className="mr-1 inline-block h-9 w-9"
            name="building-library-outline"
          />{" "}
          Docs Hub
        </h2>
        <p className="mb-4 text-gray-800">Search our Documentation Library</p>
        <Button asChild className="bg-crl-electric-purple">
          <TrackingLink href="https://www.cockroachlabs.com/docs/">
            Browse the Docs
          </TrackingLink>
        </Button>
      </section>
      <section className="mx-auto max-w-5xl py-4">
        <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          <Icon className="mr-1 inline-block h-9 w-9" name="slack" /> Community
          Slack
        </h2>
        <p className="mb-4 text-gray-800">Ask a question</p>
        <Button asChild className="bg-crl-electric-purple">
          <TrackingLink href="https://www.cockroachlabs.com/join-community/">
            Join the Community
          </TrackingLink>
        </Button>
      </section>
      <section className="mx-auto max-w-5xl py-4">
        <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          <Icon className="mr-1 inline-block h-9 w-9" name="discourse" />{" "}
          Community Forum
        </h2>
        <p className="mb-4 text-gray-800">Ask a question or search</p>
        <Button asChild className="bg-crl-electric-purple">
          <a
            href="https://forum.cockroachlabs.com/"
            rel="noreferrer"
            target="_blank"
          >
            Search the Forum
          </a>
        </Button>
      </section>
    </>
  );
}
