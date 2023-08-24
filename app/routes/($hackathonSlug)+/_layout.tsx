import { type LoaderArgs, Response, json } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { prisma } from "~/utils/db.server.ts";

export async function loader({ params, request }: LoaderArgs) {
  const { hackathonSlug: slug } = params;
  const hackathon = slug
    ? await prisma.hackathon
        .findUniqueOrThrow({
          select: {
            challenge: { select: { id: true } },
            id: true,
            name: true,
            slug: true,
            workshop: { select: { id: true } }
          },
          where: { slug }
        })
        .catch((err) => {
          console.error(err);
          throw new Response(null, { status: 404, statusText: "Not Found" });
        })
    : null;
  return json({ hackathon });
}

export default function Layout() {
  const { hackathon } = useLoaderData<typeof loader>();
  return (
    <>
      <header>
        <h1>Cockroach Labs Hackpack</h1>
        {hackathon ? <h2>{hackathon.name}</h2> : null}
        <nav className="flex justify-center gap-4">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-crl-electric-purple font-bold" : ""
            }
            to="./"
          >
            Get Started
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-crl-electric-purple font-bold" : ""
            }
            to="./features"
          >
            Cool Features
          </NavLink>
          {hackathon?.challenge ? (
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-crl-electric-purple font-bold" : ""
              }
              to="./challenge"
            >
              Challenge
            </NavLink>
          ) : null}
          {hackathon?.workshop ? (
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-crl-electric-purple font-bold" : ""
              }
              to="./workshop"
            >
              Workshop
            </NavLink>
          ) : null}
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-crl-electric-purple font-bold" : ""
            }
            to="./careers"
          >
            Careers
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-crl-electric-purple font-bold" : ""
            }
            to="./help"
          >
            Get Help
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}
