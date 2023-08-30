import { createCookieSessionStorage } from "@remix-run/node";
import { z } from "zod";

import type { ToastProps } from "~/components/ui/toast.tsx";
// Name of the session, can be whatever you want
const FLASH_SESSION = "flash";
// Pretty standard cookie session storage ( you can refer to the following for
// a more detailed explanation:
// https://remix.run/docs/en/1.19.3/utils/sessions#using-sessions
export const flashSessionStorage = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    // name of our session
    name: FLASH_SESSION,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production"
  }
});

/**
 * This helper method is used to retrieve the cookie from the request,
 * parse it, and then gets the session used to store flash information
 */
function getSessionFromRequest(request: Request) {
  // Gets the cookie header from the request
  const cookie = request.headers.get("Cookie");
  // Gets our session using the instance we defined above to get the session
  // information
  return sessionStorage.getSession(cookie);
}

/**
 * Helper method used to add flash session values to the session
 */
export async function flashMessage(
  flash: FlashSessionValues,
  headers?: ResponseInit["headers"]
) {
  // Gets the session we defined above
  const session = await sessionStorage.getSession();
  // Stores flash information into it that we pass to this function
  session.flash(FLASH_SESSION, flash);
  // Creates a cookie header to store into the response
  const cookie = await sessionStorage.commitSession(session);
  // If you've already passed in some custom headers this will create headers
  // and allow us to append additional properties
  const newHeaders = new Headers(headers);
  // Unlike JS objects headers can have multiple properties of the same name
  // So if you already passed in a Set-Cookie it will work fine and it will
  // set both cookies at the same time
  newHeaders.append("Set-Cookie", cookie);
  // Returns the headers to be given to the response object
  return newHeaders;
}
// This is your schema to validate the toast type, you can add additional schemas
// If you want to use flash storage for different things
const toastMessageSchema = z.object({
  // Message to display to the user
  text: z.string(),
  // Type of notification
  variant: z.custom<ToastProps["variant"]>()
});
// Infers the type for later usage and type safety
// type ToastMessage = z.infer<typeof toastMessageSchema>;

// Schema to validate the flash session storage
const flashSessionValuesSchema = z.object({
  // validation schema from above
  toast: toastMessageSchema.optional()
});
// Here we infer the type schema and we get a fully typed object wherever we use
// The values we get from the session!
export type FlashSessionValues = z.infer<typeof flashSessionValuesSchema>;

/**
 * Helper method used to get the flash session data from the session and show it to the user
 * @param request Request object
 * @returns Returns the the flash session data from the session and headers to purge the flash storage
 */
export async function getFlashSession(request: Request) {
  // We retrieve the session by using the current requests cookie.
  const session = await getSessionFromRequest(request);
  // We validate that our data is correct via zod
  const result = flashSessionValuesSchema.safeParse(session.get(FLASH_SESSION));
  // If it isn't we set it to undefined
  const flash = result.success ? result.data : undefined;
  // We create the headers to purge the message from the cookie storage
  const headers = new Headers({
    "Set-Cookie": await sessionStorage.commitSession(session)
  });
  // Headers need to be returned to purge the flash storage
  return { flash, headers };
}
