import { type LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Button } from "~/components/ui/button.tsx";
import { useHints } from "~/utils/client-hints.tsx";
import { findBySlug } from "~/utils/hackathons.server.ts";

export async function loader({ params }: LoaderArgs) {
  const { hackathonSlug } = params;
  const hackathon = await findBySlug(hackathonSlug, {
    id: true,
    name: true,
    slug: true,
    workshop: true
  });

  if (!hackathon?.workshop) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }
  return json({ hackathon });
}
export default function Workshop() {
  const { hackathon } = useLoaderData<typeof loader>();
  const { workshop } = hackathon;
  const { timeZone } = useHints();
  return (
    <>
      <div className="bg-hero-pattern flex flex-col items-center justify-center gap-2 bg-cover bg-no-repeat p-4 text-white">
        <h1 className="font-poppins text-4xl font-bold leading-none tracking-tight">
          Workshop
        </h1>
        <code className="font-mono text-xl">&#47;* Build your skills */</code>
      </div>
      {workshop ? (
        <section>
          <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
            {workshop.title}
          </h2>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: "long",
              timeStyle: "short",
              timeZone
            }).format(new Date(workshop.date))}{" "}
            in {workshop.location}
          </h3>
          <p>{workshop.description}</p>
          <Button asChild className="bg-crl-electric-purple">
            <a href={workshop.url} rel="noreferrer" target="_blank">
              Start
            </a>
          </Button>
        </section>
      ) : null}
    </>
  );
}
