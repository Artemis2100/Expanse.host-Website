/**
 * Expanse Panel (newcorepanel) URLs for marketing → checkout handoff.
 *
 * Canonical plan/region ids live in newcorepanel `src/config/marketing-catalog.ts`
 * and must match DB: VirtFusionPlan.planId, VirtFusionLocation.storeSlug,
 * PterodactylPlan.planId, and Pterodactyl settings location `slug` or `region`.
 */
export function getPanelBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_PANEL_URL ?? "https://panel.expanse.host";
  return raw.replace(/\/$/, "");
}

export function panelStoreVpsUrl(planKey: string, query?: Record<string, string | undefined>): string {
  const u = new URL(`/store/vps/${encodeURIComponent(planKey)}`, `${getPanelBaseUrl()}/`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v != null && v !== "") u.searchParams.set(k, v);
    }
  }
  return u.toString();
}

export function panelStoreGameServerUrl(planKey: string, query?: Record<string, string | undefined>): string {
  const u = new URL(`/store/game-servers/${encodeURIComponent(planKey)}`, `${getPanelBaseUrl()}/`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v != null && v !== "") u.searchParams.set(k, v);
    }
  }
  return u.toString();
}
