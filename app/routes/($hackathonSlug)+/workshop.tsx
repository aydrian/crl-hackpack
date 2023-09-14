import { type LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Button } from "~/components/ui/button.tsx";
import imgTShirt from "~/images/t-shirt.webp";
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
      <div className="flex flex-col items-center justify-center gap-2 bg-hero-pattern bg-cover bg-no-repeat p-4 text-white">
        <h1 className="font-poppins text-4xl font-bold leading-none tracking-tight">
          Workshop
        </h1>
        <code className="text-center font-mono text-xl">
          &#47;* Build your skills */
        </code>
      </div>
      {workshop ? (
        <>
          <section className="mx-auto max-w-5xl p-4 text-center">
            <h2 className="mx-auto mb-1.5 max-w-max bg-gradient-to-r from-crl-dark-blue via-crl-electric-purple to-crl-iridescent-blue bg-clip-text text-center font-poppins text-3xl font-bold leading-none tracking-tight text-transparent">
              {workshop.title}
            </h2>
            <h3 className="mb-2 text-center text-2xl font-semibold leading-none tracking-tight">
              {new Intl.DateTimeFormat(undefined, {
                dateStyle: "long",
                timeStyle: "short",
                timeZone
              }).format(new Date(workshop.date))}{" "}
              in {workshop.location}
            </h3>
            <p className="text-left">{workshop.description}</p>
            <Button asChild className="mt-2 bg-crl-electric-purple">
              <a href={workshop.url} rel="noreferrer" target="_blank">
                View the Workshop
              </a>
            </Button>
          </section>
          <section className="mx-auto max-w-2xl p-4 text-center md:flex md:justify-center md:gap-4">
            <img
              alt="Hackathon Shirt"
              className="max-w-[200px] rounded-md shadow-md"
              src={imgTShirt}
            />
            <div className="relative text-center font-poppins text-3xl font-bold text-crl-deep-purple">
              Workshop attends will receive the Cockroach Labs Hackathon
              t-shirt.
              <span className="text-light absolute bottom-0 left-0 mx-auto w-full text-center text-sm">
                (while supplies last)
              </span>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
}
