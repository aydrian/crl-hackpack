import { useRouteLoaderData } from "@remix-run/react";

import { type loader as rootLoader } from "~/root.tsx";

export function TrackingLink({
  children,
  href = "",
  referralId,
  source,
  target,
  ...props
}: React.HTMLProps<HTMLAnchorElement> & {
  referralId?: string;
  source?: string;
}) {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  const url = new URL(href);
  url.searchParams.append(
    "utm_source",
    source ?? rootData?.tracking?.utmSource ?? "unknown"
  );
  url.searchParams.append("utm_medium", "events");
  url.searchParams.append("utm_campaign", "hackathon");
  if (url.hostname === "cockroachlabs.cloud") {
    url.searchParams.append(
      "referralId",
      referralId ?? rootData?.tracking?.referralId ?? "hackathon-unknown"
    );
  }
  return (
    <a href={url.toString()} target={target ?? "_blank"} {...props}>
      {children}
    </a>
  );
}
