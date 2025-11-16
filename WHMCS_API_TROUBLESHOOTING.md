# WHMCS API 403 Forbidden Troubleshooting

If you're getting a `403 Forbidden` error when fetching stock, here are the steps to fix it:

## Common Causes & Solutions

### 1. **Check API Credentials**
Make sure your `.env.local` has the correct credentials:
```env
WHMCS_URL=https://my.expanse.host
WHMCS_API_IDENTIFIER=hQ2AaqeIN5nvSYvgBqxpkL1UKqPxTymC
WHMCS_API_SECRET=as7nSM6pOdxjtFAjpodJAb4OAYXoX648
```

**Verify in WHMCS:**
- Go to Setup > Staff Management > API Credentials
- Check that the Identifier and Secret match exactly (case-sensitive)

### 2. **Check IP Whitelisting**
WHMCS may have IP whitelisting enabled for the API.

**To disable or add your IP:**
1. Go to Setup > Staff Management > API Credentials
2. Click on your API credential
3. Under "Allowed IPs":
   - **Option A**: Leave blank (allows all IPs) - **Recommended for server-to-server**
   - **Option B**: Add your server's IP address
   - **Option C**: Add `127.0.0.1` if testing locally

### 3. **Check API Permissions**
Make sure the API credential has the right permissions:

**Required Permission:**
- ✅ `GetProducts` - Should be enabled

**To check:**
1. Go to Setup > Staff Management > API Credentials
2. Click on your API credential
3. Scroll to "API Permissions"
4. Ensure "GetProducts" is checked

### 4. **Test API Credentials Manually**

You can test the API credentials with curl:

```bash
curl -X POST "https://my.expanse.host/includes/api.php" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "action=GetProducts" \
  -d "identifier=hQ2AaqeIN5nvSYvgBqxpkL1UKqPxTymC" \
  -d "secret=as7nSM6pOdxjtFAjpodJAb4OAYXoX648" \
  -d "responsetype=json"
```

If this works, the issue is with the Next.js API route. If this fails, the issue is with WHMCS configuration.

### 5. **Check WHMCS API Status**
- Make sure WHMCS API is enabled (Setup > General Settings > Security)
- Some WHMCS installations require API to be explicitly enabled

### 6. **Server IP vs Local IP**
If testing locally:
- The API will use your local IP, which may not be whitelisted
- Either add your local IP to whitelist OR disable IP whitelisting for API access

### 7. **Check WHMCS URL Format**
Make sure the URL in `.env.local` doesn't have a trailing slash:
```env
# ✅ Correct
WHMCS_URL=https://my.expanse.host

# ❌ Wrong
WHMCS_URL=https://my.expanse.host/
```

## Quick Fix Checklist

- [ ] API credentials in `.env.local` match WHMCS exactly
- [ ] IP whitelisting is disabled OR your server IP is whitelisted
- [ ] API has `GetProducts` permission enabled
- [ ] WHMCS API is enabled in settings
- [ ] URL has no trailing slash
- [ ] Test with curl to verify credentials work

## Still Having Issues?

If the above doesn't work, check WHMCS error logs:
- `WHMCS_ROOT/modules/api/error_log.php` (if exists)
- WHMCS admin panel > Utilities > Logs > API Log

