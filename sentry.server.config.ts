// Marketing site: client-side Glitchtip only; server SDK disabled.
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  enabled: false,
});
