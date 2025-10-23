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
[GeoIP web service trial](https://www.maxmind.com/en/request-service-trial?service_geoip=1),
[purchase service credit](https://www.maxmind.com/en/geoip2-precision-insights)
for use with our web services, or have a
[GeoLite account](https://www.maxmind.com/en/geolite2/signup), in order to
receive an account ID and license key. {{</ alert >}}

We use
[basic HTTP authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).
The APIs which require authentication are only available via HTTPS. The
credentials are never transmitted unencrypted. If you attempt to access this
service via HTTP, you will receive a `403 Forbidden` HTTP response.

We require TLS 1.2 or greater for all requests to our servers to keep your data
secure.

## Service Endpoints

The endpoint for each service is as specified below. Each endpoint expects an IP
address to be defined as a path parameter (`{ip_address}`).

The IP address can be either an IPv4 or an IPv6 address. IPv4 addresses should
be passed in the standard dotted quad form, for example `1.2.3.4`. IPv6
addresses should be passed as strings as well. We recommend using the canonical
form as described in [RFC 5952](https://tools.ietf.org/html/rfc5952), for
example `2001:db8::1:0:0:1`, but we will handle any valid IPv6 string
representation.

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

The `Accept` header for a request is entirely optional. If you do include one,
you must accept one of the following:

- `application/json`
- `application/vnd.maxmind.com-country+json`
- `application/vnd.maxmind.com-country+json; charset=UTF-8; version=2.1`

Substitute the appropriate service's type for "country". A request for any other
MIME type will result in a `415 Unsupported Media Type` error.

If you set the `Accept-Charset` header in your client code, you must accept the
`UTF-8` character set. If you don't you will receive a `406 Not Acceptable`
response.

## Troubleshooting IP Lookups

[Learn about common troubleshooting steps to make sure that you're querying the correct IP addresses, and making efficient use of your queries, on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/optimize-your-maxmind-web-service-integration)
