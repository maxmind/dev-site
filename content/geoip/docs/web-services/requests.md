---
draft: false
title: GeoIP and GeoLite API Requests
type: 'has-toc'
---

## Authorization and Security

The HTTP `Authorization` header is required for authorization. The username is
your
[MaxMind account ID](https://www.maxmind.com/en/accounts/current/license-key).
The password is your
[MaxMind license key](https://www.maxmind.com/en/accounts/current/license-key).

{{< alert warning >}} You must be approved for a
[GeoIP web service trial](https://www.maxmind.com/en/create-account?service_geoip=1),
[purchase service credit](https://www.maxmind.com/en/geoip-api-web-services) for
use with our web services, or have a
[GeoLite account](https://www.maxmind.com/en/create-account), in order to
receive an account ID and license key. {{</ alert >}}

We use
[basic HTTP authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).
The APIs which require authentication are only available via HTTPS. The
credentials are never transmitted unencrypted. If you attempt to access this
service via HTTP, you will receive a `403 Forbidden` HTTP response, except at
`geolite.info`, which redirects HTTP requests to HTTPS.

We require TLS 1.2 or greater for all requests to our servers to keep your data
secure.

## Service Endpoints

The endpoint for each service is as specified below. Each endpoint expects an IP
address to be defined as a path parameter (`{ip_address}`).

The IP address can be either an IPv4 or an IPv6 address. IPv4 addresses should
be passed in the standard dotted quad form, for example `1.2.3.4`. IPv6
addresses should be passed as strings as well. We recommend using the canonical
form as described in [RFC 5952](https://datatracker.ietf.org/doc/html/rfc5952),
for example `2001:db8::1:0:0:1`. We do not accept an IPv6 address with a zone
ID, for example `fe80::1%eth0`.

You can also use the string `me` as the IP address. In this case, the record for
the IP address you are querying from will be returned. This is useful when your
application does not have easy access to its public IP address, e.g., when the
system making the query is behind a NAT.

### GeoIP Endpoints

| Service   | HTTP Method | Endpoint                                                     |
| --------- | ----------- | ------------------------------------------------------------ |
| Country   | `GET`       | `https://geoip.maxmind.com/geoip/v2.1/country/{ip_address}`  |
| City Plus | `GET`       | `https://geoip.maxmind.com/geoip/v2.1/city/{ip_address}`     |
| Insights  | `GET`       | `https://geoip.maxmind.com/geoip/v2.1/insights/{ip_address}` |

The `geoip.maxmind.com` hostname automatically picks the data center
geographically closest to you.

### GeoLite Endpoints

| Service | HTTP Method | Endpoint                                               |
| ------- | ----------- | ------------------------------------------------------ |
| Country | `GET`       | `https://geolite.info/geoip/v2.1/country/{ip_address}` |
| City    | `GET`       | `https://geolite.info/geoip/v2.1/city/{ip_address}`    |

The `geolite.info` hostname automatically picks the data center geographically
closest to you.

## Headers

The `Authorization` header is always required. See
[Authorization and Security](#authorization-and-security) for more details.

The `Accept` and `Accept-Charset` headers are optional. The service ignores them
and always returns JSON encoded as UTF-8.

## Troubleshooting IP Lookups

[Learn about common troubleshooting steps to make sure that you're querying the correct IP addresses, and making efficient use of your queries, on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/optimize-your-maxmind-web-service-integration)
