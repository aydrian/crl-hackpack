import type { LoaderArgs } from "@remix-run/node";

import { TrackingLink } from "~/components/tracking-link.tsx";

export async function loader({ request }: LoaderArgs) {
  return null;
}

export default function Index() {
  return (
    <div>
      <h1 className="mb-4 font-poppins text-4xl font-bold leading-none tracking-tight">
        Get Started
      </h1>
      <TrackingLink href="https://cockroachlabs.cloud/signup">
        Sign up
      </TrackingLink>
      <TrackingLink href="https://cockroachlabs.com">
        Cockroach Labs
      </TrackingLink>
    </div>
  );
}
