import { type LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { findBySlug } from "~/utils/hackathons.server.ts";

export async function loader({ params }: LoaderArgs) {
  const { hackathonSlug } = params;
  const hackathon = await findBySlug(hackathonSlug, {
    challenge: true,
    id: true,
    name: true,
    slug: true
  });

  if (!hackathon?.challenge) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }
  return json({ hackathon });
}
export default function Challenge() {
  const { hackathon } = useLoaderData<typeof loader>();
  const { challenge } = hackathon;
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 bg-hero-pattern bg-cover bg-no-repeat p-4 text-white">
        <h1 className="font-poppins text-4xl font-bold leading-none tracking-tight">
          Challenge
        </h1>
        <code className="text-center font-mono text-xl">
          &#47;* Build what you dream */
        </code>
      </div>
      {challenge ? (
        <section className="mx-auto max-w-5xl p-4">
          <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
            {challenge.title}
          </h2>
          <p>{challenge.description}</p>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Prize
          </h3>
          <p>{challenge.prize}</p>
        </section>
      ) : null}
    </>
  );
}
