import { cssBundleHref } from "@remix-run/css-bundle";
import { type LinksFunction, type LoaderArgs, json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

import iconHref from "~/components/icons/sprite.svg";
import styles from "~/tailwind.css";
import { ClientHintCheck, getHints } from "~/utils/client-hints.tsx";
import { prisma } from "~/utils/db.server.ts";
import { useNonce } from "~/utils/nonce-provider.ts";

export async function loader({ params, request }: LoaderArgs) {
  const { hackathonSlug: slug } = params;
  const tracking = slug
    ? await prisma.hackathon
        .findUniqueOrThrow({
          select: {
            referralId: true,
            utmSource: true
          },
          where: { slug }
        })
        .catch((err) => {
          console.error(err);
          throw new Response(null, { status: 404, statusText: "Not Found" });
        })
    : null;
  return json({ requestInfo: { hints: getHints(request) }, tracking });
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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
