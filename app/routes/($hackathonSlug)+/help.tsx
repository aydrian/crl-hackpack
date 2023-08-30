import { type LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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

export async function loader({ params }: LoaderArgs) {
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
      <div className="bg-hero-pattern flex flex-col items-center justify-center gap-2 bg-cover bg-no-repeat p-4 text-white">
        <h1 className="font-poppins text-4xl font-bold leading-none tracking-tight">
          Get Help
        </h1>
        <code className="font-mono text-xl">
          &#47;* Survive anything. Thrive everywhere. */
        </code>
      </div>
      {hackathon ? (
        <section className="mx-auto max-w-4xl p-4">
          <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
            On-site Team
          </h2>
          <p className="mb-4 text-gray-800">
            Come find one of our team members to help you out.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {hackathon.staff.map(({ alumYear, roles, staff }) => (
              <Card className="max-w-[210px] overflow-hidden" key={staff.id}>
                <div className="relative">
                  {alumYear ? (
                    <Badge className="absolute bottom-1.5 right-1.5 bg-crl-dark-blue">{`Class of ${alumYear} Alum`}</Badge>
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
                    {staff.location ? (
                      <div className="text-xs font-light">{staff.location}</div>
                    ) : null}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
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
      <section className="mx-auto max-w-4xl p-4">
        <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          Docs Hub
        </h2>
        <p className="mb-4 text-gray-800">Search our Documentation Library</p>
        <Button asChild className="bg-crl-electric-purple">
          <TrackingLink href="https://www.cockroachlabs.com/docs/">
            Join the Community
          </TrackingLink>
        </Button>
      </section>
      <section className="mx-auto max-w-4xl p-4">
        <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          Community Slack
        </h2>
        <p className="mb-4 text-gray-800">Ask a question</p>
        <Button asChild className="bg-crl-electric-purple">
          <TrackingLink href="https://www.cockroachlabs.com/join-community/">
            Join the Community
          </TrackingLink>
        </Button>
      </section>
      <section className="mx-auto max-w-4xl p-4">
        <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          Community Forum
        </h2>
        <p className="mb-4 text-gray-800">Ask a question or search</p>
        <Button asChild className="bg-crl-electric-purple">
          <a
            href="https://forum.cockroachlabs.com/"
            rel="noreferrer"
            target="_blank"
          >
            Join the Forum
          </a>
        </Button>
      </section>
    </>
  );
}
