import { createRequestHandler } from "@remix-run/express";
import { broadcastDevReady, installGlobals } from "@remix-run/node";
import compression from "compression";
import crypto from "crypto";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import * as fs from "node:fs";
import sourceMapSupport from "source-map-support";

sourceMapSupport.install();
installGlobals();

const BUILD_PATH = "./build/index.js";
/**
 * @type { import('@remix-run/node').ServerBuild | Promise<import('@remix-run/node').ServerBuild> }
 */
let build = await import(BUILD_PATH);

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }));

app.use(morgan("tiny"));

app.use((_, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString("hex");
  next();
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "connect-src": [
          process.env.NODE_ENV === "development" ? "ws:" : null,
          process.env.SENTRY_DSN ? "*.ingest.sentry.io" : null,
          "'self'"
        ].filter(Boolean),
        "font-src": ["'self'"],
        "frame-src": ["'self'"],
        "img-src": ["'self'", "data:"],
        "script-src": [
          "'strict-dynamic'",
          "'self'",
          // @ts-expect-error
          (_, res) => `'nonce-${res.locals.cspNonce}'`
        ],
        "script-src-attr": [
          // @ts-expect-error
          (_, res) => `'nonce-${res.locals.cspNonce}'`
        ],
        "upgrade-insecure-requests": null
      },
      // NOTE: Remove reportOnly when you're ready to enforce this CSP
      reportOnly: true
    },
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "same-origin" }
  })
);

function getLoadContext(_, res) {
  return { cspNonce: res.locals.cspNonce };
}

app.all(
  "*",
  process.env.NODE_ENV === "development"
    ? await createDevRequestHandler()
    : createRequestHandler({
        build,
        getLoadContext,
        mode: process.env.NODE_ENV
      })
);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Express server listening on port ${port}`);

  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build);
  }
});

async function createDevRequestHandler() {
  const chokidar = await import("chokidar");
  const watcher = chokidar.watch(BUILD_PATH, { ignoreInitial: true });

  watcher.on("all", async () => {
    // 1. purge require cache && load updated server build
    const stat = fs.statSync(BUILD_PATH);
    build = import(BUILD_PATH + "?t=" + stat.mtimeMs);
    // 2. tell dev server that this app server is now ready
    broadcastDevReady(await build);
  });

  return async (req, res, next) => {
    try {
      //
      return createRequestHandler({
        build: await build,
        getLoadContext,
        mode: "development"
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
