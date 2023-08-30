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
import { useEffect } from "react";

import iconHref from "~/components/icons/sprite.svg";
import { Toaster } from "~/components/ui/toaster.tsx";
import { useToast } from "~/components/ui/use-toast.ts";
import styles from "~/tailwind.css";
import { ClientHintCheck, getHints } from "~/utils/client-hints.tsx";
import * as hackathons from "~/utils/hackathons.server.ts";
// import { getFlashSession } from "~/utils/flash-session.server.ts";
import { useNonce } from "~/utils/nonce-provider.ts";

import { type FlashSessionValues } from "./utils/flash-session.server.ts";

export async function loader({ params, request }: LoaderArgs) {
  // const { flash, headers } = await getFlashSession(request);
  const { hackathonSlug } = params;
  const tracking = await hackathons.findBySlug(hackathonSlug, {
    referralId: true,
    utmSource: true
  });

  const hackathon = !hackathonSlug
    ? await hackathons.findCurrent({ name: true, slug: true }, 3)
    : null;
  const flash: FlashSessionValues = hackathon
    ? { toast: { text: `${hackathon.name}? ${hackathon.slug}` } }
    : {};

  return json({ flash, requestInfo: { hints: getHints(request) }, tracking });
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
  const { flash } = useLoaderData<typeof loader>();
  const nonce = useNonce();
  const { toast } = useToast();

  useEffect(() => {
    if (flash?.toast) {
      const { text } = flash.toast;
      toast({ description: text });
    }
  }, [flash?.toast, toast]);
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
