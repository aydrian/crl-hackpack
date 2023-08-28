import { type LoaderArgs, Response, json } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { Icon } from "~/components/icon.tsx";
import { prisma } from "~/utils/db.server.ts";

export async function loader({ params }: LoaderArgs) {
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
        <h1 className="text-center font-poppins text-4xl font-bold leading-none tracking-tight">
          Cockroach Labs Hackpack
        </h1>
        {hackathon ? (
          <h2 className="text-center font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
            {hackathon.name}
          </h2>
        ) : null}
        <nav className="mt-2 flex justify-center gap-4">
          <NavLink
            className={({ isActive }) =>
              isActive ? "font-bold text-crl-electric-purple" : ""
            }
            to="./"
          >
            Get Started
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "font-bold text-crl-electric-purple" : ""
            }
            to="./features"
          >
            Cool Features
          </NavLink>
          {hackathon?.challenge ? (
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-bold text-crl-electric-purple" : ""
              }
              to="./challenge"
            >
              Challenge
            </NavLink>
          ) : null}
          {hackathon?.workshop ? (
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-bold text-crl-electric-purple" : ""
              }
              to="./workshop"
            >
              Workshop
            </NavLink>
          ) : null}
          <NavLink
            className={({ isActive }) =>
              isActive ? "font-bold text-crl-electric-purple" : ""
            }
            to="./careers"
          >
            Careers
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "font-bold text-crl-electric-purple" : ""
            }
            to="./help"
          >
            Get Help
          </NavLink>
        </nav>
      </header>
      <main className="grow">
        <Outlet />
      </main>
      <footer className="flex items-center justify-between bg-crl-deep-purple p-4 text-sm font-bold text-white">
        <div className="flex flex-col text-xs">Cockroach Labs</div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/aydrian/crl-hackpack"
            rel="noreferrer"
            target="_blank"
          >
            <Icon className="h-8 w-8" name="github" />
            <span className="sr-only">GitHub Repo</span>
          </a>
        </div>
      </footer>
    </>
  );
}
