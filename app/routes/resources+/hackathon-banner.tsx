import { type ActionArgs, Response, redirect } from "@remix-run/node";
import { Form, Link, useLocation } from "@remix-run/react";

import { Icon } from "~/components/icon.tsx";
import { Button } from "~/components/ui/button.tsx";
import { bannerCookie } from "~/utils/cookies.server.ts";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent")?.toString();
  if (!(intent === "close")) {
    throw new Response("Bad Request", { status: 400 });
  }

  const redirectTo = formData.get("redirectTo")?.toString() ?? "/";

  let headers = new Headers();
  headers.append("Set-Cookie", await bannerCookie.serialize(true));

  return redirect(redirectTo, { headers });
}

export function HackathonBanner({
  hackathon
}: {
  hackathon: {
    endDate: string;
    name: string;
    slug: string;
    startDate: string;
    website?: null | string;
  };
}) {
  const location = useLocation();
  return (
    <div className="relative bg-crl-dark-blue p-2 text-center font-semibold text-white">
      <Icon className="mr-2 inline-block h-9 w-9" name="megaphone-outline" />
      Participating in{" "}
      {hackathon.website ? (
        <a className="hover:text-crl-iridescent-blue" href={hackathon.website}>
          {hackathon.name}
        </a>
      ) : (
        hackathon.name
      )}{" "}
      (
      {new Intl.DateTimeFormat(undefined, {
        dateStyle: "long",
        timeZone: "UTC"
      }).formatRange(
        new Date(hackathon.startDate),
        new Date(hackathon.endDate)
      )}
      )?
      <Button
        asChild
        className="ml-2 bg-transparent hover:text-crl-dark-blue"
        size="sm"
        variant="outline"
      >
        <Link reloadDocument to={`/${hackathon.slug}`}>
          Go here
        </Link>
      </Button>
      <Form
        action="/resources/hackathon-banner"
        className="absolute right-2 top-2 h-fit w-fit"
        method="POST"
      >
        <input name="redirectTo" type="hidden" value={location.pathname} />
        <Button
          className="inline-block h-auto w-auto text-white"
          name="intent"
          size="icon"
          value="close"
          variant="link"
        >
          <Icon className="h-6 w-6" name="x-circle-outline" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </Form>
    </div>
  );
}
