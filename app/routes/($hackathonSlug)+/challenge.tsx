import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getParams } from "remix-params-helper";

import { ParamsSchema, findBySlug } from "~/utils/hackathons.server.ts";

export async function loader({ params }: LoaderFunctionArgs) {
  const result = getParams(params, ParamsSchema);
  const hackathonSlug = result.data?.hackathonSlug;

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
        <section className="mx-auto max-w-5xl p-4 md:flex md:gap-4">
          {challenge.image ? (
            <img
              alt={challenge.title}
              className="mx-auto mb-4 rounded-md shadow-md md:max-w-xs"
              src={challenge.image}
            />
          ) : null}
          <div>
            <h2 className="mx-auto max-w-max bg-gradient-to-r from-crl-dark-blue via-crl-electric-purple to-crl-iridescent-blue bg-clip-text text-center font-poppins text-3xl font-bold leading-none tracking-tight text-transparent">
              {challenge.title}
            </h2>
            <p>{challenge.description}</p>
            <h3 className="mt-2 text-2xl font-semibold leading-none tracking-tight text-crl-deep-purple">
              Prize
            </h3>
            <p>{challenge.prize}</p>
          </div>
        </section>
      ) : null}
    </>
  );
}
