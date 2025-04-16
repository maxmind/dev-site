The web service may be accessed using `curl`, a simple command-line HTTP client.
The `-u` flag is used to pass the
[HTTP basic authentication header](https://en.wikipedia.org/wiki/Basic_access_authentication#Client_side)
that provides the web service with your credentials.

For the following examples, replace `{account_id}` and `{license_key}`
(including the brackets) with your
[account ID and license key](https://www.maxmind.com/en/accounts/current/license-key), and
replace `{ip_address}` with the IP address you wish to look up.

#### GeoIP Country
```bash
# Retrieve data for your IP address.
curl -u "{account_id}:{license_key}" \
  "https://geoip.maxmind.com/geoip/v2.1/country/me?pretty"

# Retrieve data for an arbitrary IP address.
curl -u "{account_id}:{license_key}" \
  "https://geoip.maxmind.com/geoip/v2.1/country/{ip_address}?pretty"
```

#### GeoIP City Plus
```bash
# Retrieve data for your IP address.
curl -u "{account_id}:{license_key}" \
  "https://geoip.maxmind.com/geoip/v2.1/city/me?pretty"

# Retrieve data for an arbitrary IP address.
curl -u "{account_id}:{license_key}" \
  "https://geoip.maxmind.com/geoip/v2.1/city/{ip_address}?pretty"
```

#### GeoIP Insights
```bash
# Retrieve data for your IP address.
curl -u "{account_id}:{license_key}" \
  "https://geoip.maxmind.com/geoip/v2.1/insights/me?pretty"

# Retrieve data for an arbitrary IP address.
curl -u "{account_id}:{license_key}" \
  "https://geoip.maxmind.com/geoip/v2.1/insights/{ip_address}?pretty"
```

#### GeoLite Country
```bash
# Retrieve data for your IP address.
curl -u "{account_id}:{license_key}" \
  "https://geolite.info/geoip/v2.1/country/me?pretty"

# Retrieve data for an arbitrary IP address.
curl -u "{account_id}:{license_key}" \
  "https://geolite.info/geoip/v2.1/country/{ip_address}?pretty"
```

#### GeoLite City
```bash
# Retrieve data for your IP address.
curl -u "{account_id}:{license_key}" \
  "https://geolite.info/geoip/v2.1/city/me?pretty"

# Retrieve data for an arbitrary IP address.
curl -u "{account_id}:{license_key}" \
  "https://geolite.info/geoip/v2.1/city/{ip_address}?pretty"
```
