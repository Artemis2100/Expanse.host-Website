# Page Status Management

Easy-to-use system for managing page statuses (coming soon, maintenance, active).

## 🚀 Quick Start - 3 Simple Steps

### Step 1: Update Configuration
Open `app/config/page-status.ts` and add your route:

```typescript
export const pageStatusConfig: PageStatusConfig = {
  webhosting: 'coming-soon',        // ✅ Already configured
  colocation: 'coming-soon',        // ✅ Already configured
  infrastructure: 'coming-soon',    // 👈 Add this line
};
```

### Step 2: Update Page Component
In your page component (e.g., `app/infrastructure/page.tsx`), replace the content with:

```typescript
"use client"
import { usePageRedirect } from "../utils/use-page-redirect";

export default function InfrastructurePage() {
  usePageRedirect();  // 👈 Add this line
  return null;        // 👈 Return null (or keep your content if you want)
}
```

### Step 3: Done! 🎉
That's it! The page will now automatically redirect to `/coming-soon`.

## 📋 Available Statuses

- `'active'` - Page is active and accessible (default - no redirect)
- `'coming-soon'` - Redirects to `/coming-soon`
- `'maintenance'` - Redirects to `/maintenance` (create this page when needed)

## 💡 Common Use Cases

### ✅ Put a page into "Coming Soon" mode:

**1. Edit `app/config/page-status.ts`:**
```typescript
export const pageStatusConfig: PageStatusConfig = {
  infrastructure: 'coming-soon',  // 👈 Add this
};
```

**2. Edit your page component:**
```typescript
"use client"
import { usePageRedirect } from "../utils/use-page-redirect";

export default function InfrastructurePage() {
  usePageRedirect();
  return null;
}
```

### ✅ Put a page back to active:

**Option 1:** Remove from config (recommended)
```typescript
export const pageStatusConfig: PageStatusConfig = {
  // infrastructure: 'coming-soon',  // 👈 Comment out or remove
};
```

**Option 2:** Set to active
```typescript
export const pageStatusConfig: PageStatusConfig = {
  infrastructure: 'active',  // 👈 Set to active
};
```

**Option 3:** Remove the hook from the page component and restore original content

### ✅ Put a page into "Maintenance" mode:

**1. Edit `app/config/page-status.ts`:**
```typescript
export const pageStatusConfig: PageStatusConfig = {
  infrastructure: 'maintenance',  // 👈 Change to maintenance
};
```

**2. Create maintenance page** (copy from `coming-soon/page.tsx` and customize)

**3. Page component already uses `usePageRedirect()` - no changes needed!**

## 📝 Current Configuration

Currently configured pages:
- ✅ `webhosting` → `coming-soon`
- ✅ `colocation` → `coming-soon`

## 🔍 How It Works

1. The `usePageRedirect()` hook detects the current page route
2. It checks `page-status.ts` configuration
3. If the page is set to `'coming-soon'` or `'maintenance'`, it redirects
4. If the page is `'active'` or not in config, it does nothing

## ⚠️ Important Notes

- **Route names** should match the folder name (e.g., `webhosting` for `/webhosting`)
- **Routes are case-sensitive** - use lowercase
- **The hook must be called** in the page component for redirects to work
- **Pages return `null`** while redirecting to prevent flash of content
- **No need to remove page content** - the hook handles the redirect before rendering

## 🎯 Examples

### Example: Infrastructure page maintenance

**Before (active):**
```typescript
// app/infrastructure/page.tsx
export default function InfrastructurePage() {
  return <div>...</div>;  // Full page content
}
```

**After (maintenance):**
```typescript
// 1. Update app/config/page-status.ts
export const pageStatusConfig: PageStatusConfig = {
  infrastructure: 'maintenance',
};

// 2. Update app/infrastructure/page.tsx
"use client"
import { usePageRedirect } from "../utils/use-page-redirect";

export default function InfrastructurePage() {
  usePageRedirect();
  return null;
}
```

That's it! Super simple. 🚀

