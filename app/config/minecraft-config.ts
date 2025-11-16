/**
 * Minecraft Plans Configuration
 * 
 * Maps plan names to product IDs (PIDs) for cart redirects
 * Update these PIDs based on your WHMCS configuration
 */

// Plan ID mapping: Maps plan names (e.g., "4GB Ram") to plan IDs (e.g., "premium-4gb")
export const planNameToPlanId: Record<string, string> = {
  "4GB Ram": "premium-4gb",
  "8GB Ram": "premium-8gb",
  "12GB Ram": "premium-12gb",
  "16GB Ram": "premium-16gb",
  "20GB Ram": "premium-20gb",
  "24GB Ram": "premium-24gb",
  "32GB Ram": "premium-32gb",
  "48GB Ram": "premium-48gb",
  "64GB Ram": "premium-64gb",
};

// Product ID (PID) mapping: Maps plan IDs to WHMCS product IDs
// These PIDs can be found in the button IDs on the product listing page (e.g., id="product40-order-button")
export const planPidMap: Record<string, number> = {
  "premium-4gb": 40,  // From WHMCS button ID: product40-order-button
  "premium-8gb": 41,  // User provided
  "premium-12gb": 42, // User provided
  "premium-16gb": 43, // User provided
  "premium-20gb": 44, // User provided
  "premium-24gb": 45, // From user's code
  "premium-32gb": 46, // From user's code
  "premium-48gb": 48, // User provided
  "premium-64gb": 49, // User provided
};

// Location ID to Config ID mapping
// Maps location IDs from locations.json to WHMCS config option IDs
// These values correspond to configoption[39] in WHMCS
export const locationConfigMap: Record<string, number> = {
  "us-ny": 147,      // New York City, USA (from WHMCS screenshot)
  "germany": 146,    // Frankfurt, Germany (from WHMCS screenshot)
  "sg": 148,         // Singapore (from WHMCS screenshot)
  "hongkong": 149,   // Hong Kong (user provided, may need verification)
};

// Config option IDs for premium plans
export const PREMIUM_CONFIG_OPTION_LOCATION = 39;  // Location selection
export const PREMIUM_CONFIG_OPTION_SOFTWARE = 40;  // Software selection
export const PREMIUM_CONFIG_OPTION_SPLITS = 42;    // Number of Splits
export const PREMIUM_CONFIG_OPTION_BACKUPS = 44;   // Extra Backups
export const PREMIUM_CUSTOMFIELD_SERVER_NAME = 14; // Server Name (custom field)

// Software config option values (configoption[40])
export const softwareConfigMap: Record<string, number> = {
  "paper": 150,      // Paper (Includes Plugin Installer)
  "forge": 151,      // Forge (Mod Support)
  "fabric": 152,     // Fabric (Lightweight Mod Loader)
};

// Splits config option values (configoption[42])
export const splitsConfigMap: Record<string, number> = {
  "no-extra": 177,   // No Extra Splits
  "1": 155,          // 1 Split $0.50
  "2": 163,          // 2 Split $1.00
  "3": 164,          // 3 Split $1.50
  "4": 165,          // 4 Split $2.00
  "5": 166,          // 5 Split $2.50
  "6": 167,          // 6 Split $3.00
  "7": 168,          // 7 Split $3.50
  "8": 169,          // 8 Split $4.00
  "9": 170,          // 9 Split $4.50
  "10": 171,         // 10 Split $5.00
};

// Extra Backups config option values (configoption[44])
export const backupsConfigMap: Record<string, number> = {
  "2-included": 176,  // 2 Included (default, free)
  "2+1": 157,         // 2+1 Backups $2.00 (from screenshot)
  "2+2": 172,         // 2+2 Backups $4.00 (from screenshot)
  "2+3": 173,         // 2+3 Backups $6.00 (inferred from screenshot)
  "2+4": 174,         // 2+4 Backups $8.00 (inferred from screenshot)
  "2+5": 175,         // 2+5 Backups $10.00 (inferred from screenshot)
};

interface MinecraftCartOptions {
  planName: string;
  locationId: string;
  serverName?: string;
  software?: string;    // e.g., "paper", "forge", "fabric"
  splits?: string;      // e.g., "no-extra", "1", "2", ..., "10"
  backups?: string;     // e.g., "2-included", "2+1", "2+2", etc.
}

/**
 * Get the cart redirect URL for a Minecraft plan with all configuration options
 * @param options - Configuration options for the cart URL
 * @returns The cart URL or null if mapping is invalid
 */
export function getMinecraftCartUrl(options: MinecraftCartOptions): string | null {
  const { planName, locationId, serverName, software = "paper", splits = "no-extra", backups = "2-included" } = options;

  // Get plan ID from plan name
  const planId = planNameToPlanId[planName];
  if (!planId) {
    console.error(`No plan ID found for plan: ${planName}`);
    return null;
  }

  // Get PID from plan ID
  const pid = planPidMap[planId];
  if (!pid || pid === 0) {
    console.error(`No PID found for plan ID: ${planId}. Please update minecraft-config.ts`);
    return null;
  }

  // Get config ID from location ID
  const locationConfigId = locationConfigMap[locationId];
  if (!locationConfigId) {
    console.error(`No config ID found for location: ${locationId}`);
    return null;
  }

  // Get software config ID
  const softwareConfigId = softwareConfigMap[software];
  if (!softwareConfigId || softwareConfigId === 0) {
    console.error(`No config ID found for software: ${software}`);
    return null;
  }

  // Get splits config ID
  const splitsConfigId = splitsConfigMap[splits];
  if (!splitsConfigId || splitsConfigId === 0) {
    console.error(`No config ID found for splits: ${splits}`);
    return null;
  }

  // Get backups config ID
  const backupsConfigId = backupsConfigMap[backups];
  if (!backupsConfigId) {
    console.error(`No config ID found for backups: ${backups}`);
    return null;
  }

  // Build the cart URL with all config options
  const baseUrl = `https://my.expanse.host/cart.php?a=add&pid=${pid}`;
  const params: string[] = [];
  
  // Add config options (these need to be in the format configoption[39]=146)
  params.push(`configoption[${PREMIUM_CONFIG_OPTION_LOCATION}]=${locationConfigId}`);
  params.push(`configoption[${PREMIUM_CONFIG_OPTION_SOFTWARE}]=${softwareConfigId}`);
  params.push(`configoption[${PREMIUM_CONFIG_OPTION_SPLITS}]=${splitsConfigId}`);
  params.push(`configoption[${PREMIUM_CONFIG_OPTION_BACKUPS}]=${backupsConfigId}`);
  
  // Add server name if provided (encode the value but keep brackets in the key)
  if (serverName && serverName.trim()) {
    const encodedServerName = encodeURIComponent(serverName.trim());
    params.push(`customfield[${PREMIUM_CUSTOMFIELD_SERVER_NAME}]=${encodedServerName}`);
  }

  const url = `${baseUrl}&${params.join('&')}`;
  return url;
}
