import { type LoaderArgs, Response, json } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { Icon } from "~/components/icon.tsx";
import { TrackingLink } from "~/components/tracking-link.tsx";
import { Button } from "~/components/ui/button.tsx";
import Logo from "~/images/Full-Logo-Horizontal_Full-Color-Light-BG.png";
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
      <header className="flex items-center bg-white p-3">
        <div className="basis-3/12">
          <TrackingLink href="https://cockroachlabs.com">
            <img alt="Cockroach Labs" className="w-[12.5rem]" src={Logo} />
          </TrackingLink>
        </div>
        <div className="basis-6/12">
          <h1 className="text-center font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
            Cockroach Labs HackPack
          </h1>
          <nav className="mt-2 flex justify-center gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-crl-electric-purple"
                  : "hover:text-crl-action-blue"
              }
              end
              to="."
            >
              Get Started
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-crl-electric-purple"
                  : "hover:text-crl-action-blue"
              }
              to="./features"
            >
              Cool Features
            </NavLink>
            {hackathon?.challenge ? (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-crl-electric-purple"
                    : "hover:text-crl-action-blue"
                }
                to="./challenge"
              >
                Challenge
              </NavLink>
            ) : null}
            {hackathon?.workshop ? (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-crl-electric-purple"
                    : "hover:text-crl-action-blue"
                }
                to="./workshop"
              >
                Workshop
              </NavLink>
            ) : null}
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-crl-electric-purple"
                  : "hover:text-crl-action-blue"
              }
              to="./careers"
            >
              Careers
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-crl-electric-purple"
                  : "hover:text-crl-action-blue"
              }
              to="./help"
            >
              Get Help
            </NavLink>
          </nav>
        </div>
        <div className="flex basis-3/12 justify-end">
          <Button
            asChild
            className="rounded-full bg-crl-electric-purple"
            size="sm"
          >
            <TrackingLink href="https://cockroachlabs.cloud/signup">
              Sign up
            </TrackingLink>
          </Button>
        </div>
      </header>
      <main className="grow">
        <Outlet />
      </main>
      <footer className="flex items-center justify-between bg-crl-deep-purple p-4 text-sm font-bold text-white">
        <div className="flex basis-1/3 items-center gap-2 text-xs">
          <a
            href="https://instagram.com/cockroachdb"
            rel="noreferrer"
            target="_blank"
          >
            <Icon className="h-6 w-6" name="instagram" />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href="https://twitter.com/cockroachdb"
            rel="noreferrer"
            target="_blank"
          >
            <Icon className="h-6 w-6" name="twitter" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="https://youtube.com/cockroachdb"
            rel="noreferrer"
            target="_blank"
          >
            <Icon className="h-6 w-6" name="youtube" />
            <span className="sr-only">YouTube</span>
          </a>
          <a
            href="https://www.linkedin.com/company/cockroach-labs/"
            rel="noreferrer"
            target="_blank"
          >
            <Icon className="h-6 w-6" name="linkedin" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="https://www.reddit.com/r/cockroachdb"
            rel="noreferrer"
            target="_blank"
          >
            <Icon className="h-6 w-6" name="reddit" />
            <span className="sr-only">Reddit</span>
          </a>
          <a
            href="https://www.threads.net/@cockroachdb"
            rel="noreferrer"
            target="_blank"
          >
            <Icon className="h-6 w-6" name="threads" />
            <span className="sr-only">Threads</span>
          </a>
          <a
            href="https://github.com/cockroachdb"
            rel="noreferrer"
            target="_blank"
          >
            <Icon className="h-6 w-6" name="github" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
        <div className="basis-1/3 text-center">
          ©2023{" "}
          <TrackingLink
            className="hover:text-crl-electric-purple"
            href="https://cockroachlabs.com"
          >
            Cockroach Labs
          </TrackingLink>
        </div>
        <div className="flex basis-1/3 items-center justify-end gap-2">
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
