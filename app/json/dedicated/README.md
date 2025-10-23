# VDS Configuration JSON Files

This folder contains JSON configuration files for VDS plans and locations.

## Files

### vds-plans.json
Contains all VDS server configurations with the following structure:

```json
{
  "id": "unique-identifier",
  "name": "Display Name",
  "cpu": {
    "model": "CPU Model Name",
    "cores": "X Cores @ Y GHz"
  },
  "ram": {
    "size": "XGB",
    "type": "DDR4/DDR5"
  },
  "storage": {
    "size": "XGB/TB",
    "type": "NVMe/SSD"
  },
  "network": {
    "speed": "XGbps",
    "description": "Network Speed"
  },
  "ddos": {
    "enabled": true/false,
    "level": "Protection Level"
  },
  "price": 0.00,
  "status": "in_stock|low_stock|out_of_stock",
  "deliveryTime": "Instant Setup / X Hours",
  "badge": "POPULAR" // Optional badge
}
```

### locations.json
Contains all server location configurations:

```json
{
  "id": "country-code",
  "city": "City Name",
  "country": "Country Name",
  "countryCode": "CODE",
  "flag": "/flags/flag-image.png"
}
```

## How to Add/Edit Plans

1. **Add a new VDS plan**: Add a new object to the `vds-plans.json` array
2. **Modify existing plan**: Edit the values in the existing plan object
3. **Remove a plan**: Delete the object from the array

## How to Add/Edit Locations

1. **Add a new location**: Add a new object to the `locations.json` array
2. **Modify existing location**: Edit the values in the existing location object
3. **Remove a location**: Delete the object from the array

## Available CPU Models

The system will automatically extract unique CPU models for filtering. Currently configured:
- AMD Ryzen 9 5950X
- AMD Ryzen 9 7950X
- AMD EPYC 7763

## Status Values

- `in_stock`: Server is available for immediate provisioning
- `low_stock`: Limited availability
- `out_of_stock`: Currently unavailable

## Notes

- Changes to these files require a page reload to take effect
- Ensure all required fields are present to avoid errors
- Price should be a number (not a string)
- Images paths should be relative to the public folder
