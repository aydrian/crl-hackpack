import { cssBundleHref } from "@remix-run/css-bundle";
import { type LinksFunction, type LoaderArgs, json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData
} from "@remix-run/react";

import iconHref from "~/components/icons/sprite.svg";
import { Toaster } from "~/components/ui/toaster.tsx";
import styles from "~/tailwind.css";
import { ClientHintCheck, getHints } from "~/utils/client-hints.tsx";
import * as hackathons from "~/utils/hackathons.server.ts";
import { useNonce } from "~/utils/nonce-provider.ts";

import { HackathonBanner } from "./routes/resources+/hackathon-banner.tsx";
import { bannerCookie } from "./utils/cookies.server.ts";

export async function loader({ params, request }: LoaderArgs) {
  const { hackathonSlug } = params;
  const tracking = await hackathons.findBySlug(hackathonSlug, {
    referralId: true,
    utmSource: true
  });

  const bannerDismissed =
    (await bannerCookie.parse(request.headers.get("Cookie"))) ?? false;

  const currentHackathon =
    !hackathonSlug && !bannerDismissed
      ? await hackathons.findCurrent(
          {
            endDate: true,
            name: true,
            slug: true,
            startDate: true,
            website: true
          },
          3
        )
      : null;

  return json({
    currentHackathon,
    requestInfo: { hints: getHints(request) },
    tracking
  });
}

export const links: LinksFunction = () => [
  { as: "image", href: iconHref, rel: "preload", type: "image/svg+xml" },
  { as: "style", href: "/fonts/poppins/font.css", rel: "preload" },
  { as: "style", href: styles, rel: "preload" },
  { href: "/fonts/poppins/font.css", rel: "stylesheet" },
  { href: styles, rel: "stylesheet" },
  ...(cssBundleHref ? [{ href: cssBundleHref, rel: "stylesheet" }] : [])
];

export default function App() {
  const { currentHackathon } = useLoaderData<typeof loader>();
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <ClientHintCheck nonce={nonce} />
        <Meta />
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col">
        {currentHackathon ? (
          <HackathonBanner hackathon={currentHackathon} />
        ) : null}
        <Outlet />
        <Toaster />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
}

export function useRootLoaderData() {
  return useRouteLoaderData<typeof loader>("root");
}
