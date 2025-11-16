# Security Setup for Stock API

## Environment Variables Configuration

Add these to your `.env.local` file (server-side only):

```env
# WHMCS API Configuration (SERVER-SIDE ONLY - Never exposed to client)
WHMCS_URL=https://my.expanse.host
WHMCS_API_IDENTIFIER=hQ2AaqeIN5nvSYvgBqxpkL1UKqPxTymC
WHMCS_API_SECRET=as7nSM6pOdxjtFAjpodJAb4OAYXoX648

# Stock API Key (for protecting /api/stock endpoint)
# Use this generated key or create your own: openssl rand -hex 32
STOCK_API_KEY=2f077921674b46021fa2e0cbe777ef58353d24b6f8853dd26dc7f557f833fcf1

# Client-side API key (MUST be the same as STOCK_API_KEY)
# This is exposed to the client but only used to access your own API
NEXT_PUBLIC_STOCK_API_KEY=2f077921674b46021fa2e0cbe777ef58353d24b6f8853dd26dc7f557f833fcf1
```

## Security Features

✅ **API Key Authentication**: All requests to `/api/stock` require a valid API key  
✅ **WHMCS Credentials Protection**: Never exposed to client, only used server-side  
✅ **Constant-Time Comparison**: Prevents timing attacks on API key validation  
✅ **Caching**: Reduces load on WHMCS API (10-minute cache)  
✅ **Error Handling**: Proper error messages without exposing sensitive data  

## How It Works

1. Client-side code requests stock data with API key in header
2. Server validates API key before processing
3. If valid, server fetches from WHMCS using secure credentials
4. WHMCS credentials are NEVER sent to the client
5. Stock data is returned to client (without WHMCS credentials)

## Important Notes

- **Never commit `.env.local` to git** (it's already in .gitignore)
- **Never expose `WHMCS_API_IDENTIFIER` or `WHMCS_API_SECRET`** to client
- **Use `NEXT_PUBLIC_` prefix only for the stock API key** (needed client-side)
- **Regenerate API key if compromised**: Run `openssl rand -hex 32`

