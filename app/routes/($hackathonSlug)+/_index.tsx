import { type LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { IconGradient } from "~/components/icon.tsx";
import { useHints } from "~/utils/client-hints.tsx";
import { findBySlug } from "~/utils/hackathons.server.ts";

export async function loader({ params }: LoaderArgs) {
  const { hackathonSlug } = params;
  const hackathon = await findBySlug(hackathonSlug, {
    endDate: true,
    id: true,
    name: true,
    startDate: true
  });

  return json({ hackathon });
}

export default function Index() {
  const { hackathon } = useLoaderData<typeof loader>();
  const { timeZone } = useHints();
  return (
    <>
      <div className="bg-hero-pattern flex flex-col items-center justify-center gap-2 bg-cover bg-no-repeat p-4 text-white">
        <div>
          <IconGradient className="h-24 w-24" name="backpack" />
        </div>
        <h1 className="font-poppins text-5xl font-bold leading-none tracking-tight">
          Cockroach Labs HackPack
        </h1>
        <h2 className="font-poppins text-3xl font-semibold leading-none tracking-tight">
          Resources for {hackathon ? hackathon.name : "Hackathons"}
        </h2>
        {hackathon ? (
          <div className="text-xl font-medium">
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: "long",
              timeZone
            }).formatRange(
              new Date(hackathon.startDate),
              new Date(hackathon.endDate)
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}
