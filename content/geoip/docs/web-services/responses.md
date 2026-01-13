---
draft: false
title: GeoIP and GeoLite API Responses
type: 'has-toc'
---

## Headers

The `Content-Type` for a successful response varies based on the service as
outlined below:

| Service         | Content-Type                                                            |
| --------------- | ----------------------------------------------------------------------- |
| GeoIP Country   | `application/vnd.maxmind.com-country+json; charset=UTF-8; version=2.1`  |
| GeoIP City      | `application/vnd.maxmind.com-city+json; charset=UTF-8; version=2.1`     |
| GeoIP Insights  | `application/vnd.maxmind.com-insights+json; charset=UTF-8; version=2.1` |
| GeoLite Country | `application/vnd.maxmind.com-country+json; charset=UTF-8; version=2.1`  |
| GeoLite City    | `application/vnd.maxmind.com-city+json; charset=UTF-8; version=2.1`     |

Errors may be returned with the `Content-Type` set to
`application/vnd.maxmind.com-error+json; charset=UTF-8; version=2.0`. If this is
the case, then the body of the response contains a JSON document with two keys,
`code` and `error`. See the [Errors](#errors) section for more details.

The response will always include a `Content-Length` header as well.

## Errors

When the server returns an error (`4xx` or `5xx`), the response may include a
JSON document in the body. This document is a single object with the keys `code`
and `error`. The `code` field is a static error code for machine use. The value
of any given code will never change, though codes can be added or removed. The
`error` field is a human-readable description of the error and may change at any
time.

Not all errors include a JSON body. An error in content negotiation will not
include a body, nor will many `5xx` errors, which typically happen outside of
our web service request handling code. You should check the `Content-Type` type
of an error response before attempting to decode the body as JSON.

In addition to the errors documented below, client code should also be prepared
to handle any valid HTTP `4xx` or `5xx` status code.

{{< rawhtml >}}

<div class="table">
  <table>
    <thead>
      <tr>
        <th>Code</th>
        <th>HTTP Status</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>IP_ADDRESS_INVALID</code></td>
        <td>400 Bad Request</td>
        <td>You have not supplied a valid IPv4 or IPv6 address.</td>
      </tr>
      <tr>
        <td><code>IP_ADDRESS_REQUIRED</code></td>
        <td>400 Bad Request</td>
        <td>You have not supplied an IP address, which is a required field.</td>
      </tr>
      <tr>
        <td><code>IP_ADDRESS_RESERVED</code></td>
        <td>400 Bad Request</td>
        <td>
          You have supplied an IP address which belongs to a reserved or private
          range.
        </td>
      </tr>
      <tr>
        <td><code>AUTHORIZATION_INVALID</code></td>
        <td>401 Unauthorized</td>
        <td>
          You have supplied an invalid
          <a href="https://www.maxmind.com/en/accounts/current/license-key"
            >MaxMind account ID and/or license key</a
          >
          in the
          <a
            href="/geoip/docs/web-services/requests#authorization-and-security"
            >Authorization</a
          >
          header.
        </td>
      </tr>
      <tr>
        <td><code>LICENSE_KEY_REQUIRED</code></td>
        <td>401 Unauthorized</td>
        <td>
          You have not supplied a
          <a href="https://www.maxmind.com/en/accounts/current/license-key"
            >MaxMind license key</a
          >
          in the
          <a
            href="/geoip/docs/web-services/requests#authorization-and-security"
            >Authorization</a
          >
          header.
        </td>
      </tr>
      <tr>
        <td><code>ACCOUNT_ID_REQUIRED</code></td>
        <td>401 Unauthorized</td>
        <td>
          You have not supplied a
          <a
            href="https://support.maxmind.com/knowledge-base/articles/find-your-maxmind-account-id"
            >MaxMind account ID</a
          >
          in the
          <a
            href="/geoip/docs/web-services/requests#authorization-and-security"
            >Authorization</a
          >
          header.
        </td>
      </tr>
      <tr>
        <td><code>INSUFFICIENT_FUNDS</code></td>
        <td>402 Payment Required</td>
        <td>
          The license key you have provided does not have sufficient funds to
          use this service. Please
          <a href="https://www.maxmind.com/en/geoip-api-web-services"
            >purchase more service credits</a
          >.
        </td>
      </tr>
      <tr>
        <td><code>PERMISSION_REQUIRED</code></td>
        <td>402 Payment Required</td>
        <td>
          You do not have permission to use the service. Please
          <a href="https://support.maxmind.com/knowledge-base"
            >contact our support team</a
          >
          for more information.
        </td>
      </tr>
      <tr>
        <td>(none)</td>
        <td>403 Forbidden</td>
        <td>
          This status is returned when the request body is larger than 20,000
          bytes.
        </td>
      </tr>
      <tr>
        <td><code>IP_ADDRESS_NOT_FOUND</code></td>
        <td>404 Not Found</td>
        <td>The supplied IP address is not in the database.</td>
      </tr>
      <tr>
        <td>(none)</td>
        <td>415 Unsupported Media Type</td>
        <td>
          Your request included an <code>Accept</code> or
          <code>Content-Type</code> header that is not supported. For
          <code>GET</code> requests, this means the web service cannot return
          content of the type specified in the <code>Accept</code> header. For
          <code>PUT</code> and <code>POST</code> requests, this means the web
          service cannot parse a request body of the type specified in the
          <code>Content-Type</code> header.
        </td>
      </tr>
      <tr>
        <td>(none)</td>
        <td>429 Too Many Requests</td>
        <td>
          Your request has been denied due to rate-limiting imposed by MaxMind.
          This is likely due to excessive previous requests resulting in error
          responses.
        </td>
      </tr>
      <tr>
        <td>(none)</td>
        <td>503 Service Unavailable</td>
        <td>
          There is a problem with the web service server. You can try this
          request again later.
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

### Rate-limiting

If customer requests result in excessive errors, MaxMind may impose rate limits
for a period of time.

## Response

All services return data as a JSON document. The document that is returned
always consists of an object (aka map or hash). Each key in the object in turn
maps to an object or an array of objects.

```json
{
  "anonymizer":           { ... },
  "city":                 { ... },
  "continent":            { ... },
  "country":              { ... },
  "location":             { ... },
  "postal":               { ... },
  "registered_country":   { ... },
  "represented_country":  { ... },
  "subdivisions":         [{ ... }, ... ],
  "traits":               { ... },
  "maxmind":              { ... }
}
```

The exact set of top-level keys varies based on the particular GeoIP web service
you are using. If a key maps to an undefined or empty value, it is not included
in the JSON object. This applies both to top-level keys and the objects they map
to.

The data returned in the document will be in UTF-8 encoding.

For full examples of response bodies, select one of the following:

- [GeoIP Country Body Example](#geoip-country-body-example)
- [GeoIP City Body Example](#geoip-city-body-example)
- [GeoIP Insights Body Example](#geoip-insights-body-example)

### Anonymizer

{{< anchor-target schema--response--anonymizer >}}

`anonymizer` is a JSON object that indicates whether the IP address is part of
an anonymizing service or network. This data is available for GeoIP Insights
only.

```json
{
  "confidence": 99,
  "is_anonymous": true,
  "is_anonymous_vpn": true,
  "is_hosting_provider": true,
  "is_public_proxy": true,
  "is_residential_proxy": true,
  "is_tor_exit_node": true,
  "network_last_seen": "2025-01-15",
  "provider_name": "NordVPN"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="anonymizer" >}}
  {{< geoip-schema-row key="confidence" valueType="integer" valueTypeNote="min: 1, max: 99" insights="true">}}
  A score ranging from 1 to 99 that represents our percent confidence that the network is currently part of an actively used VPN service.

  Currently we will only provide values of 30 and 99, but the number of values will increase as we improve our confidence ratings.

  [Learn more about anonymizer confidence on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_anonymous" valueType="boolean" insights="true">}}
  This is `true` if the IP address belongs to any sort of anonymous network. Otherwise, the key is not included in the `anonymizer` object.

  **Note:** This field has been moved from the `traits` object to the `anonymizer` object. It is still returned in the `traits` object for backwards compatibility but is deprecated there.

  [Learn more about anonymizer and proxy detection on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#anon-detection)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_anonymous_vpn" valueType="boolean" insights="true">}}
  This is `true` if the IP address is registered to an anonymous VPN provider. Otherwise, the key is not included in the `anonymizer` object.

  If a VPN provider does not register subnets under names associated with them, we will likely only flag their IP ranges using the `is_hosting_provider` flag.

  **Note:** This field has been moved from the `traits` object to the `anonymizer` object. It is still returned in the `traits` object for backwards compatibility but is deprecated there.

  [Learn more about VPNs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#VPN)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_hosting_provider" valueType="boolean" insights="true">}}
  This is `true` if the IP address belongs to a hosting or VPN provider (see description of `is_anonymous_vpn` flag). Otherwise, the key is not included in the `anonymizer` object.

  **Note:** This field has been moved from the `traits` object to the `anonymizer` object. It is still returned in the `traits` object for backwards compatibility but is deprecated there.

  [Learn more about hosting providers used for anonymizing on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#hosting-provider)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_public_proxy" valueType="boolean" insights="true">}}
  This is `true` if the IP address belongs to a public proxy. Otherwise, the key is not included in the `anonymizer` object.

  **Note:** This field has been moved from the `traits` object to the `anonymizer` object. It is still returned in the `traits` object for backwards compatibility but is deprecated there.

  [Learn more about public proxies on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#public-proxies)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_residential_proxy" valueType="boolean" insights="true">}}
  This is `true` if the IP address is on a suspected anonymizing network and belongs to a residential ISP (does not include peer-to-peer proxy IPs). Otherwise, the key is not included in the `anonymizer` object.

  **Note:** This field has been moved from the `traits` object to the `anonymizer` object. It is still returned in the `traits` object for backwards compatibility but is deprecated there.

  [Learn more about residential proxies on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#residential-proxies)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_tor_exit_node" valueType="boolean" insights="true">}}
  This is `true` if the IP address is a Tor exit node. Otherwise, the key is not included in the `anonymizer` object.

  **Note:** This field has been moved from the `traits` object to the `anonymizer` object. It is still returned in the `traits` object for backwards compatibility but is deprecated there.

  [Learn more about Tor exit nodes on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#tor-exit-nodes)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="network_last_seen" valueType="string" insights="true">}}
  The last day that the network was sighted in our analysis of anonymized networks. This is in the ISO 8601 date format (YYYY-MM-DD).

  [Learn more about anonymizer and proxy detection on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="provider_name" valueType="string" insights="true">}}
  The name of the VPN provider (e.g., NordVPN, SurfShark, etc.) associated with the network.

  Please note that MaxMind identifies a subset of VPN providers. A current list of VPN providers identified in the Anonymous Plus database is available on request.

  [Learn more about VPN provider detection on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind)
  {{</ geoip-schema-row >}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### City

{{< anchor-target schema--response--city >}}

`city` is a JSON object that contains details about the city associated with the
IP address.

```json
{
  "confidence": 25,
  "geoname_id": 54321,
  "names": {
    "de": "Los Angeles",
    "en": "Los Angeles",
    "es": "Los Ángeles",
    "fr": "Los Angeles",
    "ja": "ロサンゼルス市",
    "pt-BR": "Los Angeles",
    "ru": "Лос-Анджелес",
    "zh-CN": "洛杉矶"
  }
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="city" >}}
  {{< geoip-schema-row key="confidence" valueType="integer" valueTypeNote="min: 0, max: 100" insights="true">}}
  A value from 0-100 representing our confidence that the city is correct.

  [Learn more about confidence factors on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#confidence-factors)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="geoname_id" valueType="integer" city="true" insights="true">}}
  A unique identifier for the city as specified by [GeoNames](https://www.geonames.org/).

  [Learn more about GeoNames IDs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="names" valueType="object" city="true" insights="true">}}
  A map from locale codes, such as `en`, to the localized names for the feature.

  [Learn more about localized geolocation names on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names)
  {{</ geoip-schema-row >}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Continent

{{< anchor-target schema--response--continent >}}

`continent` is a JSON object that contains information about the continent
associated with the IP address.

```json
{
  "code": "NA",
  "geoname_id": 123456,
  "names": {
    "de": "Nordamerika",
    "en": "North America",
    "es": "América del Norte",
    "fr": "Amérique du Nord",
    "ja": "北アメリカ",
    "pt-BR": "América do Norte",
    "ru": "Северная Америка",
    "zh-CN": "北美洲"
  }
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="continent" >}}
  {{< geoip-schema-row key="code" valueType="string" country="true" city="true" insights="true">}}
  A two-character code for the continent associated with the IP address. The possible codes are:

  * `AF` – Africa
  * `AN` – Antarctica
  * `AS` – Asia
  * `EU` – Europe
  * `NA` – North America
  * `OC` – Oceania
  * `SA` – South America

  [Learn more about continent codes on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="geoname_id" valueType="integer" country="true" city="true" insights="true">}}
  A unique identifier for the continent as specified by [GeoNames](https://www.geonames.org/).

  [Learn more about GeoNames IDs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="names" valueType="object" country="true" city="true" insights="true">}}
  A map from locale codes, such as `en`, to the localized names for the feature.

  [Learn more about localized geolocation names on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names)
  {{</ geoip-schema-row >}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Country

{{< anchor-target schema--response--country >}}

`country` is a JSON object that contains details about the country where MaxMind
believes the end user is located.

```json
{
  "confidence": 75,
  "geoname_id": 6252001,
  "is_in_european_union": false,
  "iso_code": "US",
  "names": {
    "de": "USA",
    "en": "United States",
    "es": "Estados Unidos",
    "fr": "États-Unis",
    "ja": "アメリカ合衆国",
    "pt-BR": "Estados Unidos",
    "ru": "США",
    "zh-CN": "美国"
  }
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="country" >}}
  {{< geoip-schema-row key="confidence" valueType="integer" valueTypeNote="min: 0, max: 100" insights="true">}}
  A value from 0-100 representing our confidence that the country is correct.

  [Learn more about confidence factors on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#confidence-factors)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="geoname_id" valueType="integer" country="true" city="true" insights="true">}}
  A unique identifier for the country as specified by [GeoNames](https://www.geonames.org/).

  [Learn more about GeoNames IDs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_in_european_union" valueType="boolean" country="true" city="true" insights="true">}}
  This is `true` if the country is a member state of the European Union. Otherwise, the key is not included in the `country` object.

  [Learn more about the European Union flag on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#eu-flag)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="iso_code" valueType="string" country="true" city="true" insights="true">}}
  A two-character [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country code for the country associated with the IP address.

  [Learn more about country codes on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="names" valueType="object" country="true" city="true" insights="true">}}
  A map from locale codes, such as `en`, to the localized names for the feature.

  [Learn more about localized geolocation names on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names)
  {{</ geoip-schema-row >}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Location

{{< anchor-target schema--response--location >}}

`location` is a JSON object that contains specific details about the location
associated with the IP address.

```json
{
  "accuracy_radius": 20,
  "average_income": 128321,
  "latitude": 37.6293,
  "longitude": -122.1163,
  "metro_code": 807,
  "time_zone": "America/Los_Angeles"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="location" >}}
  {{< geoip-schema-row key="accuracy_radius" valueType="integer" city="true" insights="true">}}
  The approximate accuracy radius, in kilometers, around the latitude and longitude for the geographical entity (country, subdivision, city or postal code) associated with the IP address. We have a 67% confidence that the location of the end-user falls within the area defined by the accuracy radius and the latitude and longitude coordinates.

  [Learn about the geolocation area defined by latitude, longitude, and accuracy radius, on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geolocation-area)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="average_income" valueType="integer" insights="true">}}
  The average annual income associated with the IP address in US dollars. This is only available for IP addresses in the US.

  [Learn more about average income data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-user-context-data#income-pop-density)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="latitude" valueType="decimal" city="true" insights="true">}}
  The approximate [WGS84](https://en.wikipedia.org/wiki/World_Geodetic_System) latitude of the postal code, city, subdivision or country associated with the IP address.

  **The coordinates are not precise and should not be used to identify a particular street address
  or household. To better represent a level of accuracy, please include the `accuracy_radius` when
  displaying latitude and longitude and make it clear that the coordinates refer to a larger
  geographical area instead of a precise location.**

  [Learn about the geolocation area defined by latitude, longitude, and accuracy radius, on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geolocation-area)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="longitude" valueType="decimal" city="true" insights="true">}}
  The approximate [WGS84](https://en.wikipedia.org/wiki/World_Geodetic_System) longitude of the postal code, city, subdivision or country associated with the IP address.

  **The coordinates are not precise and should not be used to identify a particular street address
  or household. To better represent a level of accuracy, please include the `accuracy_radius` when
  displaying latitude and longitude and make it clear that the coordinates refer to a larger
  geographical area instead of a precise location.**

  [Learn about the geolocation area defined by latitude, longitude, and accuracy radius, on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geolocation-area)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="metro_code" valueType="integer" city="true" insights="true">}}
  **Deprecated**. This is a no-longer-maintained code for targeting advertisements in Google.
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="population_density" valueType="integer" insights="true">}}
  The estimated number of people per square kilometer. This is only available for IP addresses in the US.

  [Learn more about population density data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-user-context-data#income-pop-density)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="time_zone" valueType="string" city="true" insights="true">}}
  The time zone associated with location, as specified by the [IANA Time Zone Database](https://www.iana.org/time-zones), e.g., "America/New\_York".

  [Learn more about time zone data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#time-zone)
  {{</ geoip-schema-row >}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Postal

{{< anchor-target schema--response--postal >}}

`postal` is a JSON object that contains details about the postal code associated
with the IP address.

```json
{
  "code": "90001",
  "confidence": 10
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="postal" >}}
  {{< geoip-schema-row key="code" valueType="string" city="true" insights="true">}}
  A postal code close to the user’s location. For the following countries, we return partial postal codes with the number of characters indicated below:

  * United States: 5
  * Canada: 3
  * United Kingdom: 2-4
  * Brazil: 5
  * Ireland: 3
  * Japan: 7 (specified for the first 6. The last digit defaults to 1)
  * Netherlands: 4
  * Portugal: 7 (accurate for the first 4. The last 3 often defaults to `-001`)
  * Singapore: 2

  [Learn more about postal code data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="confidence" valueType="integer" valueTypeNote="min: 0, max: 100" insights="true">}}
  A value from 0-100 representing our confidence that the postal code is correct.

  [Learn more about confidence factors on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#confidence-factors)
  {{</ geoip-schema-row >}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Registered Country

{{< anchor-target schema--response--registered-country >}}

`registered_country` is a JSON object that contains details about the country in
which the ISP has registered the IP address.

[Learn about registered countries on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/country-level-and-city-level-geolocation-maxmind)

```json
{
  "geoname_id": 6252001,
  "is_in_european_union": true,
  "iso_code": "US",
  "names": {
    "de": "USA",
    "en": "United States",
    "es": "Estados Unidos",
    "fr": "États-Unis",
    "ja": "アメリカ合衆国",
    "pt-BR": "Estados Unidos",
    "ru": "США",
    "zh-CN": "美国"
  }
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="registered_country" >}}
  {{< geoip-schema-row key="geoname_id" valueType="integer" country="true" city="true" insights="true">}}
  A unique identifier for the country as specified by [GeoNames](https://www.geonames.org/).

  [Learn more about GeoNames IDs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_in_european_union" valueType="boolean" country="true" city="true" insights="true">}}
  This is `true` if the country is a member state of the European Union. Otherwise, the key is not included in the `country` object.

  [Learn more about the European Union flag on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#eu-flag)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="iso_code" valueType="string" country="true" city="true" insights="true">}}
  A two-character [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country code for the country associated with the IP address.

  [Learn more about country codes on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="names" valueType="object" country="true" city="true" insights="true">}}
  A map from locale codes, such as `en`, to the localized names for the feature.

  [Learn more about localized geolocation names on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names)
  {{</ geoip-schema-row >}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Represented Country

{{< anchor-target schema--response--represented-country >}}

`represented_country` is a JSON object that contains details about the country
which is represented by users of the IP address. For instance, the country
represented by an overseas military base.

[Learn about represented countries on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/country-level-and-city-level-geolocation-maxmind)

```json
{
  "geoname_id": 6252001,
  "is_in_european_union": true,
  "iso_code": "US",
  "names": {
    "de": "USA",
    "en": "United States",
    "es": "Estados Unidos",
    "fr": "États-Unis",
    "ja": "アメリカ合衆国",
    "pt-BR": "Estados Unidos",
    "ru": "США",
    "zh-CN": "美国"
  },
  "type": "military"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="represented_country" >}}
  {{< geoip-schema-row key="geoname_id" valueType="integer" country="true" city="true" insights="true">}}
  A unique identifier for the country as specified by [GeoNames](https://www.geonames.org/).

  [Learn more about GeoNames IDs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_in_european_union" valueType="boolean" country="true" city="true" insights="true">}}
  This is `true` if the country is a member state of the European Union. Otherwise, the key is not included in the `country` object.

  [Learn more about the European Union flag on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#eu-flag)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="iso_code" valueType="string" country="true" city="true" insights="true">}}
  A two-character [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country code for the country associated with the IP address.

  [Learn more about country codes on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="names" valueType="object" country="true" city="true" insights="true">}}
  A map from locale codes, such as `en`, to the localized names for the feature.

  [Learn more about localized geolocation names on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="type" valueType="string" country="true" city="true" insights="true">}}
  The type of represented country. Currently limited to `military`, but may include other types in the future.

  [Learn more about localized geolocation names on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names)
  {{</ geoip-schema-row >}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Subdivisions

{{< anchor-target schema--response--subdivisions >}}

`subdivisions` is an array of JSON objects. Each of these objects contains
details about a subdivision of the country in which the IP address resides.
Subdivisions are arranged from largest to smallest.

```json
[
  {
    "confidence": 50,
    "geoname_id": 5332921,
    "iso_code": "CA",
    "names": {
      "de": "Kalifornien",
      "en": "California",
      "es": "California",
      "fr": "Californie",
      "ja": "カリフォルニア",
      "ru": "Калифорния",
      "zh-CN": "加州"
    }
  }
]
```

<!-- prettier-ignore-start -->

{{< schema-table key="subdivision" >}}
  {{< geoip-schema-row key="confidence" valueType="integer" valueTypeNote="min: 0, max: 100" insights="true">}}
  A value from 0-100 representing our confidence that the region is correct.

  [Learn more about confidence factors on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#confidence-factors)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="geoname_id" valueType="integer" city="true" insights="true">}}
  A unique identifier for the region as specified by [GeoNames](https://www.geonames.org/).

  [Learn more about GeoNames IDs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="iso_code" valueType="string" city="true" insights="true">}}
  A string of up to three characters containing the region-portion of the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) code for the region associated with the IP address.

  [Learn more about ISO code data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="names" valueType="object" city="true" insights="true">}}
  A map from locale codes, such as `en`, to the localized names for the feature.

  [Learn more about localized geolocation names on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names)
  {{</ geoip-schema-row >}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Traits

{{< anchor-target schema--response--traits >}}

`traits` is a JSON object that contains general traits associated with the IP
address.

```json
{
  "autonomous_system_number": 1239,
  "autonomous_system_organization": "Linkem IR WiMax Network",
  "connection_type": "Cable/DSL",
  "domain": "example.com",
  "ip_address": "1.2.3.4",
  "ip_risk_snapshot": 45.5,
  "is_anonymous": true,
  "is_anonymous_vpn": true,
  "is_anycast": true,
  "is_hosting_provider": true,
  "is_public_proxy": true,
  "is_residential_proxy": true,
  "is_tor_exit_node": true,
  "isp": "Linkem spa",
  "mobile_country_code": "310",
  "mobile_network_code": "004",
  "organization": "Linkem IR WiMax Network",
  "network": "1.2.3.0/24",
  "static_ip_score": 1.5,
  "user_count": 1,
  "user_type": "traveler"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="traits" >}}
  {{< geoip-schema-row key="autonomous_system_number" valueType="integer" city="true" insights="true">}}
  The [autonomous system number](https://en.wikipedia.org/wiki/Autonomous_system_(Internet)) associated with the IP address.

  [Learn more about autonomous system data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#autonomous-system-data)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="autonomous_system_organization" valueType="string" city="true" insights="true">}}
  The organization associated with the registered [autonomous system number](https://en.wikipedia.org/wiki/Autonomous_system_(Internet)) for the IP address.

  [Learn more about autonomous system data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#autonomous-system-data)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="connection_type" valueType="string" city="true" insights="true">}}
  One of the following values: `Cable/DSL`, `Cellular`, `Corporate`, or `Satellite`. Additional values may be added in the future.

  **This field is not present in the GeoLite City web service.**

  [Learn more about connection type data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#connection-type-data)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="domain" valueType="string" city="true" insights="true">}}
  The second level domain associated with the IP address. This will be something like “example.com” or “example.co.uk”, not “foo.example.com”.

  **This field is not present in the GeoLite City web service.**

  [Learn more about domain name data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#domain-name-data)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="ip_address" valueType="string" country="true" city="true" insights="true">}}
  The requested IP address.
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="ip_risk_snapshot" valueType="decimal" valueTypeNote="min: 0.01, max: 99" insights="true">}}
  This field contains the risk associated with the IP address. The value ranges from 0.01 to 99. A higher score indicates a higher risk.

  Please note that the IP risk score provided in GeoIP products and services is more static than the IP risk score provided in minFraud and is not responsive to traffic on your network. If you need realtime IP risk scoring based on behavioral signals on your own network, please use minFraud.
  
  We do not provide an IP risk snapshot for low-risk networks. If this field is not populated, we either do not have signals for the network or the signals we have show that the network is low-risk. If you would like to get signals for low-risk networks, please use the minFraud web services.
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_anonymous" valueType="boolean" insights="true">}}
  **Deprecated.** This field has been moved to the [`anonymizer`](#anonymizer) object. It is still returned here for backwards compatibility.

  This is `true` if the IP address belongs to any sort of anonymous network. Otherwise, the key is not included in the `traits` object.

  [Learn more about anonymizer and proxy detection on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#anon-detection)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_anonymous_vpn" valueType="boolean" insights="true">}}
  **Deprecated.** This field has been moved to the [`anonymizer`](#anonymizer) object. It is still returned here for backwards compatibility.

  This is `true` if the IP address is registered to an anonymous VPN provider. Otherwise, the key is not included in the `traits` object.

  If a VPN provider does not register subnets under names associated with them, we will likely only flag their IP ranges using the `is_hosting_provider` flag.

  [Learn more about VPNs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#VPN)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_anycast" valueType="boolean" country="true" city="true" insights="true">}}
  This is `true` if the IP address belongs to an [anycast network](https://en.wikipedia.org/wiki/Anycast).
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_hosting_provider" valueType="boolean" insights="true">}}
  **Deprecated.** This field has been moved to the [`anonymizer`](#anonymizer) object. It is still returned here for backwards compatibility.

  This is `true` if the IP address belongs to a hosting or VPN provider (see description of `is_anonymous_vpn` flag). Otherwise, the key is not included in the `traits` object.

  [Learn more about hosting providers used for anonymizing on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#hosting-provider)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_public_proxy" valueType="boolean" insights="true">}}
  **Deprecated.** This field has been moved to the [`anonymizer`](#anonymizer) object. It is still returned here for backwards compatibility.

  This is `true` if the IP address belongs to a public proxy. Otherwise, the key is not included in the `traits` object.

  [Learn more about public proxies on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#public-proxies)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_residential_proxy" valueType="boolean" insights="true">}}
  **Deprecated.** This field has been moved to the [`anonymizer`](#anonymizer) object. It is still returned here for backwards compatibility.

  This is `true` if the IP address is on a suspected anonymizing network and belongs to a residential ISP (does not include peer-to-peer proxy IPs). Otherwise, the key is not included in the `traits` object.

  [Learn more about residential proxies on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#residential-proxies)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="is_tor_exit_node" valueType="boolean" insights="true">}}
  **Deprecated.** This field has been moved to the [`anonymizer`](#anonymizer) object. It is still returned here for backwards compatibility.

  This is `true` if the IP address is a Tor exit node. Otherwise, the key is not included in the `traits` object.

  [Learn more about Tor exit nodes on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#tor-exit-nodes)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="isp" valueType="string" city="true" insights="true">}}
  The name of the ISP associated with the IP address.

  **This field is not present in the GeoLite City web service.**

  [Learn more about ISP data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#isp-org-data)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="mobile_country_code" valueType="string" city="true" insights="true">}}
  The [mobile country code (MCC)](https://en.wikipedia.org/wiki/Mobile_country_code) associated with the IP address and ISP.

  **This field is not present in the GeoLite City web service.**

  [Learn more about mobile country code data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#mobile-codes)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="mobile_network_code" valueType="string" city="true" insights="true">}}
  The [mobile network code (MNC)](https://en.wikipedia.org/wiki/Mobile_country_code) associated with the IP address and ISP.

  **This field is not present in the GeoLite City web service.**

  [Learn more about mobile network code data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#mobile-codes)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="network" valueType="string" country="true" city="true" insights="true">}}
  The network in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation) associated with the record. In particular, this is the largest network where all of the fields besides `ip_address` have the same value.
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="organization" valueType="string" city="true" insights="true">}}
  The name of the organization associated with the IP address.

  **This field is not present in the GeoLite City web service.**

  [Learn more about organization data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#isp-org-data)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="static_ip_score" valueType="decimal" valueTypeNote="min: 0, max: 99.99" insights="true">}}
  An indicator of how static or dynamic an IP address is. The value ranges from 0 to 99.99 with higher values meaning a greater static association. For example, many IP addresses with a `user_type` of `cellular` have a score under one. Broadband IPs that don’t change very often typically have a score above thirty.

  This indicator can be useful for deciding whether an IP address represents the same user over time.

  [Learn more about the static IP score on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-user-context-data#static-ip-scoring)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="user_count" valueType="integer" insights="true">}}
  The estimated number of users sharing the IP/network during the past 24 hours. For IPv4, the count is for the individual IP. For IPv6, the count is for the /64 network.

  [Learn more about the user count on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-user-context-data#user-counts)
  {{</ geoip-schema-row >}}

  {{< geoip-schema-row key="user_type" valueType="string" insights="true">}}
  The user type associated with the IP address. This will be one of the following values:

  * `business`
  * `cafe`
  * `cellular`
  * `college`
  * `consumer_privacy_network`
  * `content_delivery_network`
  * `government`
  * `hosting`
  * `library`
  * `military`
  * `residential`
  * `router`
  * `school`
  * `search_engine_spider`
  * `traveler`

    [Learn more about the user type on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-user-context-data#user-types)
  {{</ geoip-schema-row >}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### MaxMind

{{< anchor-target schema--response--maxmind >}}

`maxmind` is a JSON object that contains information related to your MaxMind
account.

```json
{
  "queries_remaining": 54321
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="maxmind" >}}
  {{< geoip-schema-row key="queries_remaining" valueType="integer" country="true" city="true" insights="true">}}
  The approximate number of remaining queries available for the end point which is being called.

  **This field is not present in the GeoLite City web service.**
  {{</ geoip-schema-row >}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

## Miscellaneous Notes

### Languages

Many of the objects listed above include a `names` key. The value of that key is
in turn an object which maps locale codes to a name in the appropriate language
and script.

Currently, this web service may return the following locale codes:

{{< rawhtml >}}

<div class="table">
  <table>
    <thead>
      <tr>
        <th>Code</th>
        <th>Language</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>de</td>
        <td>German</td>
        <td></td>
      </tr>
      <tr>
        <td>en</td>
        <td>English</td>
        <td>
          English names may still include accented characters if that is the
          accepted spelling in English. In other words, English does not mean
          ASCII.
        </td>
      </tr>
      <tr>
        <td>es</td>
        <td>Spanish</td>
        <td></td>
      </tr>
      <tr>
        <td>fr</td>
        <td>French</td>
        <td></td>
      </tr>
      <tr>
        <td>ja</td>
        <td>Japanese</td>
        <td></td>
      </tr>
      <tr>
        <td>pt-BR</td>
        <td>Brazilian Portuguese</td>
        <td></td>
      </tr>
      <tr>
        <td>ru</td>
        <td>Russian</td>
        <td></td>
      </tr>
      <tr>
        <td>zh-CN</td>
        <td>Chinese (Simplified)</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

If an object has any name data, then `en` will be one of the keys in the `names`
object. No other language is guaranteed. However, it is possible that we might
not have any name data at all for a given object.

### Returned Values as Database, Map, Dict, or Hash Keys

{{< alert warning >}} We strongly discourage you from using a value from any
`names` field as a key in a database or map/dict/hash data structure.
{{</ alert >}}

These names may change between releases. Instead we recommend using one of the
following:

| Data object                                                | Recommended key            |
| ---------------------------------------------------------- | -------------------------- |
| `city`                                                     | `geoname_id`               |
| `continent`                                                | `code` or `geoname_id`     |
| `country`, `registered_country`, and `represented_country` | `iso_code` or `geoname_id` |
| `postal`                                                   | `code`                     |
| `subdivisions`                                             | `iso_code` or `geoname_id` |

## Example Response Bodies

Each service returns data as a JSON document. The document that is returned
always consists of an object (aka map or hash). Below are the schema definitions
that describe each service's response body.

### GeoIP Country Body Example

The following is an example of a full response to a GeoIP Country web service
request.

A GeoLite Country request follows the same structure, but the data returned will
be less accurate. In addition, GeoLite Country requests will not return the
`maxmind` object.

```json
{
  "continent": {
    "code": "NA",
    "geoname_id": 123456,
    "names": {
      "de": "Nordamerika",
      "en": "North America",
      "es": "América del Norte",
      "fr": "Amérique du Nord",
      "ja": "北アメリカ",
      "pt-BR": "América do Norte",
      "ru": "Северная Америка",
      "zh-CN": "北美洲"
    }
  },
  "country": {
    "geoname_id": 6252001,
    "is_in_european_union": false,
    "iso_code": "US",
    "names": {
      "de": "USA",
      "en": "United States",
      "es": "Estados Unidos",
      "fr": "États-Unis",
      "ja": "アメリカ合衆国",
      "pt-BR": "Estados Unidos",
      "ru": "США",
      "zh-CN": "美国"
    }
  },
  "maxmind": {
    "queries_remaining": 54321
  },
  "registered_country": {
    "geoname_id": 6252001,
    "is_in_european_union": true,
    "iso_code": "US",
    "names": {
      "de": "USA",
      "en": "United States",
      "es": "Estados Unidos",
      "fr": "États-Unis",
      "ja": "アメリカ合衆国",
      "pt-BR": "Estados Unidos",
      "ru": "США",
      "zh-CN": "美国"
    }
  },
  "represented_country": {
    "geoname_id": 6252001,
    "is_in_european_union": true,
    "iso_code": "US",
    "names": {
      "de": "USA",
      "en": "United States",
      "es": "Estados Unidos",
      "fr": "États-Unis",
      "ja": "アメリカ合衆国",
      "pt-BR": "Estados Unidos",
      "ru": "США",
      "zh-CN": "美国"
    },
    "type": "military"
  },
  "traits": {
    "ip_address": "1.2.3.4",
    "is_anycast": true,
    "network": "1.2.3.0/24"
  }
}
```

### GeoIP City Body Example

The following is an example of a full response to a GeoIP City Plus web service
request.

A GeoLite City request follows the same structure, but the data returned will be
less accurate. In addition, GeoLite City requests will not return the `domain`,
`isp`, or `organization` values in the `traits` object, and it will not return
the `maxmind` object.

```json
{
  "continent": {
    "code": "NA",
    "geoname_id": 123456,
    "names": {
      "de": "Nordamerika",
      "en": "North America",
      "es": "América del Norte",
      "fr": "Amérique du Nord",
      "ja": "北アメリカ",
      "pt-BR": "América do Norte",
      "ru": "Северная Америка",
      "zh-CN": "北美洲"
    }
  },
  "country": {
    "geoname_id": 6252001,
    "is_in_european_union": false,
    "iso_code": "US",
    "names": {
      "de": "USA",
      "en": "United States",
      "es": "Estados Unidos",
      "fr": "États-Unis",
      "ja": "アメリカ合衆国",
      "pt-BR": "Estados Unidos",
      "ru": "США",
      "zh-CN": "美国"
    }
  },
  "maxmind": {
    "queries_remaining": 54321
  },
  "registered_country": {
    "geoname_id": 6252001,
    "is_in_european_union": true,
    "iso_code": "US",
    "names": {
      "de": "USA",
      "en": "United States",
      "es": "Estados Unidos",
      "fr": "États-Unis",
      "ja": "アメリカ合衆国",
      "pt-BR": "Estados Unidos",
      "ru": "США",
      "zh-CN": "美国"
    }
  },
  "represented_country": {
    "geoname_id": 6252001,
    "is_in_european_union": true,
    "iso_code": "US",
    "names": {
      "de": "USA",
      "en": "United States",
      "es": "Estados Unidos",
      "fr": "États-Unis",
      "ja": "アメリカ合衆国",
      "pt-BR": "Estados Unidos",
      "ru": "США",
      "zh-CN": "美国"
    },
    "type": "military"
  },
  "traits": {
    "ip_address": "1.2.3.4",
    "is_anycast": true,
    "network": "1.2.3.0/24",
    "autonomous_system_number": 1239,
    "autonomous_system_organization": "Linkem IR WiMax Network",
    "connection_type": "Cable/DSL",
    "domain": "example.com",
    "isp": "Linkem spa",
    "mobile_country_code": "310",
    "mobile_network_code": "004",
    "organization": "Linkem IR WiMax Network"
  },
  "city": {
    "geoname_id": 54321,
    "names": {
      "de": "Los Angeles",
      "en": "Los Angeles",
      "es": "Los Ángeles",
      "fr": "Los Angeles",
      "ja": "ロサンゼルス市",
      "pt-BR": "Los Angeles",
      "ru": "Лос-Анджелес",
      "zh-CN": "洛杉矶"
    }
  },
  "location": {
    "accuracy_radius": 20,
    "latitude": 37.6293,
    "longitude": -122.1163,
    "metro_code": 807,
    "time_zone": "America/Los_Angeles"
  },
  "postal": {
    "code": "90001"
  },
  "subdivisions": [
    {
      "geoname_id": 5332921,
      "iso_code": "CA",
      "names": {
        "de": "Kalifornien",
        "en": "California",
        "es": "California",
        "fr": "Californie",
        "ja": "カリフォルニア",
        "ru": "Калифорния",
        "zh-CN": "加州"
      }
    }
  ]
}
```

### GeoIP Insights Body Example

The following is an example of a full response to a GeoIP Insights web service
request.

```json
{
  "continent": {
    "code": "NA",
    "geoname_id": 123456,
    "names": {
      "de": "Nordamerika",
      "en": "North America",
      "es": "América del Norte",
      "fr": "Amérique du Nord",
      "ja": "北アメリカ",
      "pt-BR": "América do Norte",
      "ru": "Северная Америка",
      "zh-CN": "北美洲"
    }
  },
  "country": {
    "geoname_id": 6252001,
    "is_in_european_union": false,
    "iso_code": "US",
    "names": {
      "de": "USA",
      "en": "United States",
      "es": "Estados Unidos",
      "fr": "États-Unis",
      "ja": "アメリカ合衆国",
      "pt-BR": "Estados Unidos",
      "ru": "США",
      "zh-CN": "美国"
    },
    "confidence": 75
  },
  "maxmind": {
    "queries_remaining": 54321
  },
  "registered_country": {
    "geoname_id": 6252001,
    "is_in_european_union": true,
    "iso_code": "US",
    "names": {
      "de": "USA",
      "en": "United States",
      "es": "Estados Unidos",
      "fr": "États-Unis",
      "ja": "アメリカ合衆国",
      "pt-BR": "Estados Unidos",
      "ru": "США",
      "zh-CN": "美国"
    }
  },
  "represented_country": {
    "geoname_id": 6252001,
    "is_in_european_union": true,
    "iso_code": "US",
    "names": {
      "de": "USA",
      "en": "United States",
      "es": "Estados Unidos",
      "fr": "États-Unis",
      "ja": "アメリカ合衆国",
      "pt-BR": "Estados Unidos",
      "ru": "США",
      "zh-CN": "美国"
    },
    "type": "military"
  },
  "anonymizer": {
    "confidence": 99,
    "is_anonymous": true,
    "is_anonymous_vpn": true,
    "is_hosting_provider": true,
    "is_public_proxy": true,
    "is_residential_proxy": true,
    "is_tor_exit_node": true,
    "network_last_seen": "2025-01-15",
    "provider_name": "NordVPN"
  },
  "traits": {
    "ip_address": "1.2.3.4",
    "ip_risk_snapshot": 45.5,
    "is_anycast": true,
    "network": "1.2.3.0/24",
    "autonomous_system_number": 1239,
    "autonomous_system_organization": "Linkem IR WiMax Network",
    "connection_type": "Cable/DSL",
    "domain": "example.com",
    "isp": "Linkem spa",
    "mobile_country_code": "310",
    "mobile_network_code": "004",
    "organization": "Linkem IR WiMax Network",
    "is_anonymous": true,
    "is_anonymous_vpn": true,
    "is_hosting_provider": true,
    "is_public_proxy": true,
    "is_residential_proxy": true,
    "is_tor_exit_node": true,
    "static_ip_score": 1.5,
    "user_count": 1,
    "user_type": "traveler"
  },
  "city": {
    "confidence": 25,
    "geoname_id": 54321,
    "names": {
      "de": "Los Angeles",
      "en": "Los Angeles",
      "es": "Los Ángeles",
      "fr": "Los Angeles",
      "ja": "ロサンゼルス市",
      "pt-BR": "Los Angeles",
      "ru": "Лос-Анджелес",
      "zh-CN": "洛杉矶"
    }
  },
  "location": {
    "accuracy_radius": 20,
    "latitude": 37.6293,
    "longitude": -122.1163,
    "metro_code": 807,
    "time_zone": "America/Los_Angeles",
    "average_income": 128321
  },
  "postal": {
    "code": "90001",
    "confidence": 10
  },
  "subdivisions": [
    {
      "geoname_id": 5332921,
      "iso_code": "CA",
      "names": {
        "de": "Kalifornien",
        "en": "California",
        "es": "California",
        "fr": "Californie",
        "ja": "カリフォルニア",
        "ru": "Калифорния",
        "zh-CN": "加州"
      },
      "confidence": 50
    }
  ]
}
```
