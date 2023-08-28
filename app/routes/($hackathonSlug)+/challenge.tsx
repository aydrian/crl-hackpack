import { type LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { prisma } from "~/utils/db.server.ts";

export async function loader({ params }: LoaderArgs) {
  const { hackathonSlug: slug } = params;
  const hackathon = slug
    ? await prisma.hackathon
        .findUniqueOrThrow({
          select: {
            challenge: true,
            id: true,
            name: true,
            slug: true
          },
          where: { slug }
        })
        .catch((err) => {
          console.error(err);
          throw new Response(null, { status: 404, statusText: "Not Found" });
        })
    : null;
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
      <h1 className="mb-4 font-poppins text-4xl font-bold leading-none tracking-tight">
        Challenge
      </h1>
      {challenge ? (
        <section>
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
