/**
 * Expanse Panel (newcorepanel) URLs for marketing → checkout handoff.
 *
 * `/order/continue` → Clerk if needed → team picker when user has multiple teams
 * → `/{teamId}/cloud/.../order` with the same query params (`planKey`, `loc`, etc.).
 * Those keys must match panel DB plan_id / location identifiers used by the order APIs.
 */
export function getPanelBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_PANEL_URL ?? "https://panel.expanse.host";
  return raw.replace(/\/$/, "");
}

/** Build `panel.expanse.host/order/continue?service=…&planKey=…` (and optional params). */
export function panelOrderHandoffUrl(
  service: "vps" | "game",
  query?: Record<string, string | undefined>,
): string {
  const u = new URL("/order/continue", `${getPanelBaseUrl()}/`);
  u.searchParams.set("service", service === "vps" ? "vps" : "game");
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v != null && v !== "") u.searchParams.set(k, v);
    }
  }
  return u.toString();
}

export function panelVpsOrderHandoffUrl(
  planKey: string,
  query?: Record<string, string | undefined>,
): string {
  return panelOrderHandoffUrl("vps", { planKey, ...query });
}

export function panelGameServerOrderHandoffUrl(
  planKey: string,
  query?: Record<string, string | undefined>,
): string {
  return panelOrderHandoffUrl("game", { planKey, ...query });
}
