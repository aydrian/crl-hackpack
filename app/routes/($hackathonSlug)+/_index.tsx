import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Icon, IconGradient } from "~/components/icon.tsx";
import { TrackingLink } from "~/components/tracking-link.tsx";
import { Button } from "~/components/ui/button.tsx";
import { findBySlug } from "~/utils/hackathons.server.ts";

export async function loader({ params }: LoaderFunctionArgs) {
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
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 bg-hero-pattern bg-cover bg-no-repeat p-4 text-white">
        <div>
          <IconGradient className="h-24 w-24" name="backpack" />
        </div>
        <h1 className="text-center font-poppins text-5xl font-bold leading-none tracking-tight">
          Cockroach Labs HackPack
        </h1>
        <h2 className="font-poppins text-3xl font-semibold leading-none tracking-tight">
          Resources for {hackathon ? hackathon.name : "Hackathons"}
        </h2>
        {hackathon ? (
          <div className="text-xl font-medium">
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: "long",
              timeZone: "UTC"
            }).formatRange(
              new Date(hackathon.startDate),
              new Date(hackathon.endDate)
            )}
          </div>
        ) : null}
      </div>
      <section className="mx-auto max-w-5xl p-4">
        <h3 className="mb-2 font-poppins text-2xl font-semibold text-crl-deep-purple">
          We'll handle the data, so you can focus on your project.
        </h3>
        <p>
          Thank you for considering to use CockroachDB in your hackathon
          project. This site is filled with resources to help you in this
          journey. We think this time you spend getting to know and use
          CockroachDB will prove to be valuable to many future employers. And
          you may walk away with some awesome prizes as well.
        </p>
        <h3 className="mb-2 mt-4 font-poppins text-2xl font-semibold text-crl-deep-purple">
          The most highly evolved database on the planet
        </h3>
        <ul className="my-2 hidden font-poppins text-xl font-bold md:flex md:justify-around">
          <li>Scale Fast</li>
          <li>Survive Anything</li>
          <li>Thrive Everywhere</li>
        </ul>
        <p>
          CockroachDB is a cloud-native distributed SQL database designed to
          build, scale, and manage modern, data-intensive applications. It
          scales horizontally; survives disk, machine, rack, and even datacenter
          failures with minimal latency disruption and no manual intervention;
          supports strongly-consistent ACID transactions; and provides a
          familiar SQL API for structuring, manipulating, and querying data.
        </p>
        <ul className="md:flex md:justify-around">
          <li className="max-w-sm">
            <h4 className="font-poppins text-lg font-bold">
              Postgres Compatible
            </h4>
            <p className="text-sm font-light text-gray-800">
              Connect using your favorite Postgres library in your favorite
              language.
            </p>
          </li>
          <li className="max-w-sm">
            <h4 className="font-poppins text-lg font-bold">Start for free</h4>
            <p className="text-sm font-light text-gray-800">
              Get started quickly using our serverless database or deploy your
              own cluster using the open source version.
            </p>
          </li>
        </ul>
      </section>
      <section className="mx-auto max-w-5xl p-4">
        <h3 className="mb-2 font-poppins text-2xl font-semibold text-crl-deep-purple">
          Multi-region serverless database
        </h3>
        <p className="mb-2">
          The serverless database is a great fit for hackathons. Build using the
          free monthly resource alloance. Scale when needed.
        </p>
        <div className="sm:flex sm:items-center sm:justify-center sm:gap-8">
          <ul className="list-disc pl-4">
            <li>Postgres Compatible Database</li>
            <li>Elastic Scale</li>
            <li>Consumption Based Pricing</li>
            <li>Start for free. No credit card needed</li>
            <li>10GB of storage and 50M RUs per month</li>
            <li>Use with your favorite language</li>
          </ul>
          <div className="py-2">
            <Button
              asChild
              className="bg-gradient-to-r from-crl-dark-blue via-crl-electric-purple to-crl-iridescent-blue"
              size="lg"
            >
              <TrackingLink href="https://cockroachlabs.cloud/signup">
                Sign up for your free account
              </TrackingLink>
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl p-4">
        <h3 className="mb-2 font-poppins text-2xl font-semibold text-crl-deep-purple">
          It's dangerous to go alone... take this.
        </h3>
        <p>Choose your language and get started quickly.</p>
        <ul className="flex flex-wrap gap-0.5 py-4 text-center sm:gap-4">
          <li className="max-w-sm">
            <Button
              asChild
              className="h-24 w-24 flex-col gap-1 rounded-md bg-[#ed8b00] p-2 text-white"
              size="sm"
            >
              <TrackingLink href="https://www.cockroachlabs.com/docs/stable/build-a-java-app-with-cockroachdb">
                <Icon className="block h-8 w-8" name="java" />
                <div>Java</div>
              </TrackingLink>
            </Button>
          </li>
          <li className="max-w-sm">
            <Button
              asChild
              className="h-24 w-24 flex-col gap-1 rounded-md bg-[#3776AB] p-2 text-white"
              size="sm"
            >
              <TrackingLink href="https://www.cockroachlabs.com/docs/stable/build-a-python-app-with-cockroachdb-psycopg3">
                <Icon className="block h-8 w-8" name="python" />
                <div>Python</div>
              </TrackingLink>
            </Button>
          </li>
          <li className="max-w-sm">
            <Button
              asChild
              className="h-24 w-24 flex-col gap-1 rounded-md bg-[#339933] p-2 text-white"
              size="sm"
            >
              <TrackingLink href="https://www.cockroachlabs.com/docs/stable/build-a-nodejs-app-with-cockroachdb">
                <Icon className="block h-8 w-8" name="nodedotjs" />
                <div>Node.js</div>
              </TrackingLink>
            </Button>
          </li>
        </ul>
      </section>
    </>
  );
}
