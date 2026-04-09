// Glitchtip (Sentry-compatible): set NEXT_PUBLIC_SENTRY_DSN_WEBSITE after deployment (errors only; no tracing).
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN_WEBSITE ?? "",
  tracesSampleRate: 0,
});
