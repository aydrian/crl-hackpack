import type { LoaderArgs } from "@remix-run/node";

import { TrackingLink } from "~/components/tracking-link.tsx";

export async function loader({ request }: LoaderArgs) {
  return null;
}

export default function Index() {
  return (
    <div>
      <h1>Get Started</h1>
      <TrackingLink
        href="https://cockroachlabs.cloud/signup"
        referralId="hackathon_hackthenorth2023"
        source="hackthenorth2023"
      >
        Sign up
      </TrackingLink>
      <TrackingLink href="https://cockroachlabs.com" source="hackthenorth2023">
        Cockroach Labs
      </TrackingLink>
    </div>
  );
}
