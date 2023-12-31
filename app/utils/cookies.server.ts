import { createCookie } from "@remix-run/node";

export const redirectToCookie = createCookie("redirect-to", {
  httpOnly: true,
  maxAge: 60, // 1 minute because it makes no sense to keep it for a long time
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production"
});

export const bannerCookie = createCookie("banner-cookie", {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 5, // 10 days because it makes no sense to keep it for a longer than the event+buffer
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production"
});
