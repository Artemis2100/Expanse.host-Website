/**
 * Expanse Panel (newcorepanel) URLs for marketing → checkout handoff.
 *
 * Handoff uses panel `/order/continue` → login if needed → `/{teamId}/cloud/.../order`.
 * Canonical plan/region ids live in newcorepanel `src/config/marketing-catalog.ts`
 * and must match DB: VirtFusionPlan.planId, VirtFusionLocation.storeSlug,
 * PterodactylPlan.planId, and Pterodactyl settings location `slug` or `region`.
 */
export function getPanelBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_PANEL_URL ?? "https://panel.expanse.host";
  return raw.replace(/\/$/, "");
}

/** Marketing → panel: sign in if needed, then land on team dashboard order page with prefilled query. */
export function panelOrderContinueUrl(
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

export function panelStoreVpsUrl(planKey: string, query?: Record<string, string | undefined>): string {
  return panelOrderContinueUrl("vps", { planKey, ...query });
}

export function panelStoreGameServerUrl(planKey: string, query?: Record<string, string | undefined>): string {
  return panelOrderContinueUrl("game", { planKey, ...query });
}
