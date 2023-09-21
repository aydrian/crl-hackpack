import type { LoaderFunctionArgs } from "@remix-run/node";

import satori, { type SatoriOptions } from "satori";
import svg2img from "svg2img";
import invariant from "tiny-invariant";

import { cachified } from "~/utils/cache.server.ts";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    tw?: string;
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const hackathon = url.searchParams.get("hackathon");
  invariant(typeof hackathon === "string", "hackathon queryparam is expected");

  const data = await cachified({
    async getFreshValue() {
      const startDate = url.searchParams.get("startDate");
      invariant(
        typeof startDate === "string",
        "startDate queryparam is expected"
      );
      const endDate = url.searchParams.get("endDate");
      invariant(typeof endDate === "string", "endDate queryparam is expected");

      const dates = new Intl.DateTimeFormat(undefined, {
        dateStyle: "long",
        timeZone: "UTC"
      })
        .formatRange(new Date(startDate), new Date(endDate))
        .replace(/\u2009/g, " ");
      console.log({ dates, endDate, startDate });

      const baseUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/"
          : "https://crl-hackpack.fly.dev/";

      const jsx = (
        <div tw="h-full w-full flex flex-col">
          <div tw="flex justify-center items-center h-[125px] bg-white">
            <img
              alt="Cockroach Labs"
              height={94}
              src={`${baseUrl}img/Full-Logo-Horizontal_Full-Color-Light-BG.png`}
              width={666}
            />
          </div>
          <div
            style={{
              backgroundImage: `url(${baseUrl}img/social-background.png)`,
              backgroundSize: "1200px 475px",
              gap: "104px"
            }}
            tw="flex justify-center text-white"
          >
            <div tw="flex justify-center items-center">
              <svg
                style={{ height: "358px", width: "244px" }}
                viewBox="0 0 83.69 122.88"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <linearGradient id="icon-gradient">
                  <stop offset="0" stopColor="#0496ff"></stop>
                  <stop offset="1" stopColor="#6933ff"></stop>
                </linearGradient>
                <path
                  d="m9.24 11.3 5.89 12.31c4.65-4.09 9.16-6.01 11.76-6.89l-5.4-11.38-.01-.02c-.3-.62-.83-1.06-1.45-1.27-.63-.21-1.33-.2-1.97.1l-.02.01-7.62 3.71c-.64.32-1.08.85-1.29 1.46-.22.62-.2 1.33.11 1.97zm68.65-4.22c.25.2.45.46.59.78 1.48 3.59 2.11 8.08 2.11 12.81 0 5.08-.72 10.5-1.89 15.4 3.19 5.9 5 12.64 5 19.79v57.4c0 2.65-1.08 5.06-2.83 6.8a9.609 9.609 0 0 1-6.8 2.83H9.58c-2.64 0-5.03-1.08-6.76-2.81C1.08 118.33 0 115.94 0 113.3V55.85c0-7.18 1.83-13.94 5.04-19.86C3.98 31.76 3.47 27 3.47 22.32c0-5.03.59-10.01 1.73-14.22.11-.42.36-.78.67-1.03.62-1.14 1.58-2.1 2.82-2.71L16.31.65l.06-.03a6.53 6.53 0 0 1 4.9-.27c1.56.54 2.92 1.66 3.7 3.26l.03.06 5.63 11.87c3.57-1 7.33-1.53 11.21-1.53 3.9 0 7.68.54 11.27 1.55l5.64-11.88.02-.03.01-.02v-.01a6.461 6.461 0 0 1 3.7-3.26 6.53 6.53 0 0 1 4.9.27l.06.03 7.62 3.71c1.25.6 2.21 1.57 2.83 2.71zM8.06 31.23c1.24-1.7 2.61-3.3 4.09-4.79l-4.53-9.47c-.16 1.75-.24 3.55-.24 5.35.01 3.02.23 6.05.68 8.91zm67.63.08c.62-3.5.98-7.15.98-10.64 0-1.51-.07-2.97-.21-4.38l-4.87 10.19c1.48 1.5 2.85 3.12 4.1 4.83zM54.07 19.95l-.08-.02a.31.31 0 0 0-.08-.02c-.23-.06-.39-.11-.57-.2h-.01a37.551 37.551 0 0 0-11.47-1.78c-3.93 0-7.72.61-11.3 1.73l-.12.06a4.671 4.671 0 0 1-.65.22c-.11.03-.25.07-.41.11a38.164 38.164 0 0 0-14.31 9.02C8.18 35.94 3.91 45.42 3.91 55.85v57.45c0 1.55.64 2.97 1.66 4a5.63 5.63 0 0 0 4 1.66h64.49c1.57 0 3-.64 4.03-1.68a5.677 5.677 0 0 0 1.68-4.03v-57.4c0-10.43-4.27-19.91-11.14-26.79a38.15 38.15 0 0 0-14.56-9.11zm14.57 3.66 5.89-12.31c.31-.64.33-1.35.11-1.97-.21-.61-.65-1.14-1.28-1.45l-7.62-3.71-.02-.01c-.63-.3-1.34-.32-1.97-.1-.62.21-1.15.65-1.45 1.27l-.01.01v.01l-5.4 11.38c2.59.87 7.1 2.79 11.75 6.88zM12.32 52.99a1.946 1.946 0 0 1-2.39 1.37 1.954 1.954 0 0 1-1.37-2.4c3-10.89 9-18.21 16.26-22.42 5.52-3.2 11.76-4.58 17.95-4.35 6.17.23 12.29 2.07 17.61 5.3C67.88 35.06 73.8 42.42 76 52.01c.24 1.05-.42 2.1-1.47 2.34-1.05.24-2.1-.42-2.34-1.47-1.95-8.48-7.19-15-13.85-19.06a32.78 32.78 0 0 0-15.71-4.74c-5.48-.2-10.99 1.01-15.85 3.83-6.43 3.73-11.77 10.28-14.46 20.08zm8.26 13.07h42.75c2.69 0 5.14 1.1 6.91 2.87a9.76 9.76 0 0 1 2.87 6.91v26.24c0 2.69-1.1 5.14-2.87 6.91a9.76 9.76 0 0 1-6.91 2.87H20.58a9.76 9.76 0 0 1-6.91-2.87 9.76 9.76 0 0 1-2.87-6.91V75.85c0-2.69 1.1-5.14 2.87-6.91a9.727 9.727 0 0 1 6.91-2.88zm8.14-15.61H55.8c1.27 0 2.31 1.04 2.31 2.31v6.33c0 1.27-1.04 2.31-2.31 2.31H28.72c-1.27 0-2.31-1.04-2.31-2.31v-6.33c0-1.27 1.04-2.31 2.31-2.31zm-4.51 34.34v5.98c0 1.02-.83 1.85-1.85 1.85s-1.85-.83-1.85-1.85v-5.98H14.7v17.3c0 1.61.66 3.08 1.73 4.15a5.842 5.842 0 0 0 4.15 1.73h42.75c1.61 0 3.08-.66 4.15-1.73a5.842 5.842 0 0 0 1.73-4.15v-17.3h-45zm-9.5-3.91H69.2v-5.03c0-1.61-.66-3.08-1.73-4.15a5.825 5.825 0 0 0-4.15-1.73H20.58c-1.61 0-3.08.66-4.15 1.73a5.866 5.866 0 0 0-1.73 4.15v5.03h.01z"
                  fill="url(#icon-gradient)"
                />
              </svg>
            </div>
            <div
              style={{ gap: "32px" }}
              tw="flex flex-col justify-center items-center h-[475px] text-white"
            >
              <div tw="flex flex-col justify-center items-center">
                <h1
                  style={{ fontFamily: "Poppins", lineHeight: "4rem" }}
                  tw="text-9xl font-bold"
                >
                  HackPack
                </h1>
                <h2
                  style={{ lineHeight: "2rem" }}
                  tw="text-[43px] font-semibold"
                >
                  A resource for hackathons
                </h2>
              </div>
              <div tw="flex flex-col justify-center items-center">
                <h2 style={{ lineHeight: "1rem" }} tw="text-6xl font-semibold">
                  {hackathon}
                </h2>
                <p style={{ lineHeight: "1rem" }} tw="text-5xl font-medium">
                  {dates}
                </p>
              </div>
            </div>
          </div>
        </div>
      );

      const svg = await satori(jsx, {
        fonts: await Promise.all([getFont("Inter"), getFont("Poppins")]).then(
          (fonts) => fonts.flat()
        ),
        height: 600,
        width: 1200
      });

      const { data, error } = await new Promise(
        (
          resolve: (value: { data: Buffer | null; error: Error | null }) => void
        ) => {
          // @ts-ignore svg2img is old and doesn't have types
          svg2img(svg, (error, buffer) => {
            if (error) {
              resolve({ data: null, error });
            } else {
              resolve({ data: buffer, error: null });
            }
          });
        }
      );
      if (error) {
        return new Response(error.toString(), {
          headers: {
            "Content-Type": "text/plain"
          },
          status: 500
        });
      }
      return new Response(data, {
        headers: {
          "Cache-Control": "public, max-age=604800, immutable",
          "Content-Type": "image/png"
        }
      });
    },
    key: `social-preview-${hackathon}`,
    ttl: 1000 * 60 * 60 * 24 * 3
  });

  return data;
}

async function getFont(
  font: string,
  weights = [400, 500, 600, 700],
  text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\!@#$%^&*()_+-=<>?[]{}|;:,.`'’\"–—"
) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${font}:wght@${weights.join(
      ";"
    )}&text=${encodeURIComponent(text)}`,
    {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
      }
    }
  ).then((response) => response.text());
  const resource = css.matchAll(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/g
  );
  return Promise.all(
    [...resource]
      .map((match) => match[1])
      .map((url) => fetch(url).then((response) => response.arrayBuffer()))
      .map(async (buffer, i) => ({
        data: await buffer,
        name: font,
        style: "normal",
        weight: weights[i]
      }))
  ) as Promise<SatoriOptions["fonts"]>;
}
