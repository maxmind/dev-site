---
draft: false
title: minFraud API Responses
type: 'has-toc'
---

## Headers

The `Content-Type` for a successful response varies based on the service as
outlined below:

{{< rawhtml >}}

<div class="table">
  <table>
    <thead>
      <tr>
        <th>Service</th>
        <th>Content-Type</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Score</td>
        <td>
          `application/vnd.maxmind.com-minfraud-score+json; charset=UTF-8;
          version=2.0`
        </td>
      </tr>
      <tr>
        <td>Insights</td>
        <td>
          `application/vnd.maxmind.com-minfraud-insights+json; charset=UTF-8;
          version=2.0`
        </td>
      </tr>
      <tr>
        <td>Factors</td>
        <td>
          `application/vnd.maxmind.com-minfraud-factors+json; charset=UTF-8;
          version=2.0`
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

Errors may be returned with the `Content-Type` set to
`application/vnd.maxmind.com-error+json; charset=UTF-8; version=2.0`. If this is
the case, then the body of the response contains a JSON document with two keys,
code and error. See the [Errors](/minfraud/api-documentation/responses/#errors)
section for more details.

A `Content-Length` header will be provided.

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
        <td><code>JSON_INVALID</code></td>
        <td>400 Bad Request</td>
        <td>We cannot decode the body as a JSON object.</td>
      </tr>
      <tr>
        <td><code>REQUEST_INVALID</code></td>
        <td>400 Bad Request</td>
        <td>
          The request body is valid JSON but contains no valid input values.
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
            href="/minfraud/api-documentation/requests#authorization-and-security"
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
            href="/minfraud/api-documentation/requests#authorization-and-security"
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
            href="https://support.maxmind.com/hc/en-us/articles/4412951066779-Find-my-Account-ID"
            >MaxMind account ID</a
          >
          in the
          <a
            href="/minfraud/api-documentation/requests#authorization-and-security"
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
          <a
            href="https://www.maxmind.com/en/solutions/minfraud-services#buy-now"
            >purchase more service credits</a
          >.
        </td>
      </tr>
      <tr>
        <td><code>PERMISSION_REQUIRED</code></td>
        <td>403 Forbidden</td>
        <td>
          You do not have permission to use the service. Please
          <a href="https://support.maxmind.com/hc/en-us/requests/new"
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
        <td>(none)</td>
        <td>415 Unsupported Media Type</td>
        <td>
          Your request included a <code>Content-Type</code> header that is not
          supported. For <code>GET</code> requests, this means the web service
          cannot return content of that type. For <code>PUT</code> and
          <code>POST</code> queries, this means the web service cannot parse a
          request body of that type.
        </td>
      </tr>
      <tr>
        <td>(none)</td>
        <td>503 Service Not Available</td>
        <td>
          There is a problem with the web service server. You can try this
          request again later.
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## Response Body

All services return data as a JSON document. The document that is returned
always consists of an object (aka map or hash).

Keys with undefined or empty values will not be included in the returned
document.

The data returned in the document will be in UTF-8 encoding.

Note that a given key and value may be omitted from the response entirely if
there is no relevant information to include. For example, if you do not pass any
information about the credit card in your request, then the response will not
contain a `credit_card` key or value.

For full examples of response bodies, select one of the following:

- [minFraud Score Body Example](#minfraud-score-body-example)
- [minFraud Insights Body Example](#minfraud-insights-body-example)
- [minFraud Factors Body Example](#minfraud-factors-body-example)
- [Error Body Example](#error-body-example)

### Top-Level Fields

{{< anchor-target schema--response >}}

```json
{
  "id": "5bc5d6c2-b2c8-40af-87f4-6d61af86b6ae",
  "risk_score": 0.01,
  "funds_remaining": 25,
  "queries_remaining": 5000,
  "ip_address": {...},
  "credit_card": {...},
  "device": {...},
  "email": {...},
  "shipping_address": {...},
  "shipping_phone": {...},
  "billing_address": {...},
  "billing_phone": {...},
  "disposition": {...},
  "risk_score_reasons": [...],
  "warnings": [...]
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="" >}}
- key: id
  type: response
  valueType: string
  valueTypeNote: "format: UUID"
  score: true
  insights: true
  factors: true
  description: |
    This is the minFraud ID, a [UUID](https://en.wikipedia.org/wiki/Universally%5Funique%5Fidentifier) that identifies the minFraud response. Use this ID to [search your minFraud logs](https://www.maxmind.com/en/minfraud-log) or when making support requests to MaxMind.
- key: risk_score
  type: response
  valueType: decimal
  valueTypeNote: "min: 0.01, max: 99"
  score: true
  insights: true
  factors: true
  description: |
    This field contains the overall risk score, from 0.01 to 99\. A higher score indicates a higher risk of fraud. For example, a score of 20 indicates a 20% chance that a transaction is fraudulent. We never return a risk score of 0, since all transactions have the possibility of being fraudulent. Likewise we never return a risk score of 100.

    [Learn more about the overall risk score on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408382414235)
- key: funds_remaining
  type: response
  valueType: decimal
  valueTypeNote: "min: 0"
  score: true
  insights: true
  factors: true
  description: |
    The approximate US dollar value of the funds remaining on your MaxMind account.
- key: queries_remaining
  type: response
  valueType: integer
  valueTypeNote: "min: 0"
  score: true
  insights: true
  factors: true
  description: |
    The approximate number of queries remaining for the service before your account runs out of funds.
- key: ip_address
  fragmentOverride: ip-address
  type: response
  valueType: object
  score: true
  insights: true
  factors: true
  description: |
    This object contains IP intelligence data.
    [See more](#ip-address).
- key: credit_card
  fragmentOverride: credit-card
  type: response
  valueType: object
  insights: true
  factors: true
  description: |
    This object contains information related to the credit card.
    [See more](#credit-card).
- key: device
  fragmentOverride: device
  type: response
  valueType: object
  insights: true
  factors: true
  description: |
    This object contains information about the device that MaxMind believes is associated with the IP address passed in the request.
    [See more](#device).
- key: email
  fragmentOverride: email
  type: response
  valueType: object
  insights: true
  factors: true
  description: |
    This object contains email intelligence data.
    [See more](#email).
- key: shipping_address
  fragmentOverride: shipping-address
  type: response
  valueType: object
  insights: true
  factors: true
  description: |
    This object contains information related to the shipping address
    [See more](#shipping-address).
- key: shipping_phone
  fragmentOverride: shipping-phone
  type: response
  valueType: object
  insights: true
  factors: true
  description: |
    This object contains information related to the shipping phone number
    [See more](#shipping-phone).
- key: billing_address
  fragmentOverride: billing-address
  type: response
  valueType: object
  insights: true
  factors: true
  description: |
    This object contains information related to the billing address
    [See more](#billing-address).
- key: billing_phone
  fragmentOverride: billing-phone
  type: response
  valueType: object
  insights: true
  factors: true
  description: |
    This object contains information related to the billing phone number
    [See more](#billing-phone).
- key: disposition
  fragmentOverride: disposition
  type: response
  valueType: object
  score: true
  insights: true
  factors: true
  description: |
    This object contains information about how a request was handled by the custom rules that you have defined.
    [See more](#disposition).
- key: risk_score_reasons
  fragmentOverride: risk-score-reasons
  type: response
  valueType: array
  factors: true
  description: |
    This array contains risk score reason objects.
    [See more](#risk-score-reasons).
- key: warnings
  fragmentOverride: warnings
  type: response
  valueType: array
  score: true
  insights: true
  factors: true
  description: |
    This array contains warning objects detailing issues with the request that was sent, such as invalid or unknown inputs.
    [See more](#warnings).
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### IP Address

{{< anchor-target schema--response--ip-address >}}

For minFraud Score, this object only contains the `risk` for the IP address. For
minFraud Insights and Factors, the object is the
[GeoIP Insights response body](/geoip/docs/web-services/responses/#geoip2-insights-body-example)
with four modifications:

1. `risk` has been added directly to the `ip_address` object
2. `local_time` has been added to the `location` sub-object
3. The `maxmind` object is not present. See below for descriptions.
4. minFraud Insights and Factors return the following anonymous IP outputs:
   - `is_anonymous`
   - `is_anonymous_vpn`
   - `is_hosting_provider`
   - `is_public_proxy`
   - `is_residential_proxy`
   - `is_tor_exit_node`

See the
[GeoIP Insights response body](/geoip/docs/web-services/responses/#geoip2-insights-body-example)
for more information.

```json
{
  "risk": 0.01,
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
    "confidence": 75,
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
  "location": {
    "accuracy_radius": 20,
    "average_income": 50321,
    "latitude": 37.6293,
    "local_time": "2015-04-26T01:37:17-08:00",
    "longitude": -122.1163,
    "metro_code": 807,
    "population_density": 7122,
    "time_zone": "America/Los_Angeles"
  },
  "postal": {
    "code": "90001",
    "confidence": 10
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
  "risk_reasons": [
    {
      "code": "ANONYMOUS_IP",
      "reason": "The IP address belongs to an anonymous network. See /ip_address/traits for more details."
    },
    {
      "code": "MINFRAUD_NETWORK_ACTIVITY",
      "reason": "Suspicious activity has been seen on this IP address across minFraud customers."
    }
  ],
  "subdivisions": [
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
  ],
  "traits": {
    "autonomous_system_number": 1239,
    "autonomous_system_organization": "Linkem IR WiMax Network",
    "connection_type": "Cable/DSL",
    "domain": "example.com",
    "ip_address": "1.2.3.4",
    "is_anonymous": true,
    "is_anonymous_proxy": true,
    "is_anonymous_vpn": true,
    "is_anycast": true,
    "is_hosting_provider": true,
    "is_public_proxy": true,
    "is_residential_proxy": true,
    "is_satellite_provider": true,
    "is_tor_exit_node": true,
    "isp": "Linkem spa",
    "mobile_country_code": "310",
    "mobile_network_code": "004",
    "network": "1.2.3.0/24",
    "organization": "Linkem IR WiMax Network",
    "static_ip_score": 1.5,
    "user_count": 1,
    "user_type": "traveler"
  }
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="ip_address" >}}
- key: risk
  type: response
  valueType: decimal
  valueTypeNote: "min: 0.01, max: 99"
  score: true
  insights: true
  factors: true
  description: |
    This field contains the risk associated with the IP address. The value ranges from 0.01 to 99\. A higher score indicates a higher risk.

    [Learn more about the IP risk score on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408382525851-Device-Risk-Scores#h%5F01FN6HE00G80Y22P4WSXJ81C6Y)
- key: country
  type: response
  valueType: object
  insights: true
  factors: true
  description: |
    This object contains country-level geolocation data associated with the IP address associated with the event.
- key: location
  type: response
  valueType: object
  insights: true
  factors: true
  description: |
    This object contains city-level geolocation data associated with the IP address associated with the event.
- key: risk_reasons
  type: response
  valueType: array
  insights: true
  factors: true
  description: |
    This array contains IP Address Risk Reason objects identifying the reasons why the IP address received the associated risk.

    [Learn how to use IP risk reasons for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408418812827-IP-Risk-Reasons)
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### IP Address > Country

{{< anchor-target schema--response--ip-address--country >}}

This object contains country-level geolocation data associated with the IP
address associated with the event

[See the GeoIP Insights response body](/geoip/docs/web-services/responses/#country)
for more information.

```json
{
  "confidence": 75,
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

### IP Address > Location

{{< anchor-target schema--response--ip-address--location >}}

This object contains city-level geolocation data associated with the IP address
associated with the event.

[See the GeoIP Insights response body](/geoip/docs/web-services/responses/#location)
for more information.

```json
{
  "accuracy_radius": 20,
  "average_income": 50321,
  "latitude": 37.6293,
  "local_time": "2015-04-26T01:37:17-08:00",
  "longitude": -122.1163,
  "metro_code": 807,
  "population_density": 7122,
  "time_zone": "America/Los_Angeles"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="ip_address--location" >}}
- key: local_time
  type: response
  valueType: string
  valueTypeNote: "max length: 255"
  insights: true
  factors: true
  description: |
    The date and time of the transaction in the time zone associated with the IP address. The value is formatted according to [RFC 3339](https://tools.ietf.org/html/rfc3339). For instance, the local time in Boston might be returned as`2015-04-27T19:17:24-04:00`.
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### IP Address > Risk Reasons

{{< anchor-target schema--response--ip-address--risk-reasons >}}

This array contains IP Address Risk Reason objects identifying the reasons why
the IP address received the associated risk.

```json
[
  {
    "code": "ANONYMOUS_IP",
    "reason": "The IP address belongs to an anonymous network. See /ip_address/traits for more details."
  },
  {
    "code": "MINFRAUD_NETWORK_ACTIVITY",
    "reason": "Suspicious activity has been seen on this IP address across minFraud customers."
  }
]
```

<!-- prettier-ignore-start -->

{{< schema-table key="ip_address--risk_reasons" >}}
- key: code
  type: response
  valueType: string
  valueTypeNote: "format: enum, max length: 255"
  insights: true
  factors: true
  description: |
    This value is a machine-readable code identifying the reason. Although more codes may be added in the future, the current codes are:

    | Code                         | Explanation                                                                                            |
    | ---------------------------- | ------------------------------------------------------------------------------------------------------ |
    | `ANONYMOUS_IP`                | The IP address belongs to an anonymous network. See the object at/ip\_address/traits for more details. |
    | `BILLING_POSTAL_VELOCITY`    | Many different billing postal codes have been seen on this IP address.                                 |
    | `EMAIL_VELOCITY`              | Many different email addresses have been seen on this IP address.                                      |
    | `HIGH_RISK_DEVICE`           | A high risk device was seen on this IP address.                                                        |
    | `HIGH_RISK_EMAIL`            | A high risk email address was seen on this IP address in your past transactions.                       |
    | `ISSUER_ID_NUMBER_VELOCITY` | Many different issuer ID numbers have been seen on this IP address.                                    |
    | `MINFRAUD_NETWORK_ACTIVITY`  | Suspicious activity has been seen on this IP address across minFraud customers.                        |

    [Learn how to use IP risk reasons for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408418812827-IP-Risk-Reasons)
- key: reason
  type: response
  valueType: string
  insights: true
  factors: true
  description: |
    This field provides an explanation of the reason, as seen in the table above. The explanation text may change at any time and should not be matched against.

    [Learn how to use IP risk reasons for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408418812827-IP-Risk-Reasons)
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Credit Card

{{< anchor-target schema--response--credit-card >}}

This object contains minFraud information related to the credit card. If an
issuer ID number (IIN) was not provided in the request, this object will not be
present in the response.

```json
{
  "brand": "Visa",
  "country": "US",
  "is_business": true,
  "is_issued_in_billing_address_country": true,
  "is_prepaid": true,
  "is_virtual": true,
  "issuer": {
    "matches_provided_name": true,
    "matches_provided_phone_number": true,
    "name": "Bank of America",
    "phone_number": "800-732-9194"
  },
  "type": "credit"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="credit_card" >}}
- key: issuer
  type: response
  valueType: object
  insights: true
  factors: true
  description: |
    This field contains a JSON object with information relating to the credit card issuer.
- key: brand
  type: response
  valueType: string
  valueTypeNote: "max length: 255"
  insights: true
  factors: true
  description: |
    The card brand, such as "Visa", "Discover", "American Express", etc.

    [Learn how to use the credit card brand data for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408734452123-Credit-Card-Risk-Data#h%5F01FN6TY3X4AHK80QZ85KXX6BZZ)
- key: country
  type: response
  valueType: string
  valueTypeNote: "max length: 2"
  insights: true
  factors: true
  description: |
    The two letter [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO%5F3166-1%5Falpha-2) associated with the location of the majority of customers using this credit card as determined by their billing address. In cases where the location of customers is highly mixed, this defaults to the country of the bank issuing the card.

    [Learn how to use the credit card country data for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408734452123-Credit-Card-Risk-Data#h%5F01FN6TYNBCSRH25VWPQ1CGNN27)
- key: is_business
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if the issuer ID number is for a business card. It is`false` if the issuer ID number is for for a non-business card. The key is only present when a valid issuer ID number has been provided.
- key: is_issued_in_billing_address_country
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if the country of the billing address matches the country of the majority of customers using that IIN. It is `false` if both countries are available but do not match. If one or both of the countries are missing, the key will not be present. In cases where the location of customers is highly mixed, the match is to the country of the bank issuing the card.

    [Learn how to use the billing address to credit card country matching for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408737039515-Billing-and-Shipping-Address-Risk-Data#h%5F01FN6TVQNAXWEBB1T2JW4DNZAX)
- key: is_prepaid
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if the issuer ID number is for a prepaid card. It is`false` if the issuer ID number is for for a non-prepaid card. The key is only present when a valid issuer ID number has been provided.

    [Learn how to use prepaid card detection for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408734452123-Credit-Card-Risk-Data#h%5F01FN6TXRB1E35Q7Z7BGENRV7MC)
- key: is_virtual
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if the issuer ID number is for a virtual card. It is`false` if the issuer ID number is for a non-virtual card. The key is only present when a valid issuer ID number has been provided.

    [Learn how to use virtual card detection for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408734452123-Credit-Card-Risk-Data#h%5F01FN6TXRB1E35Q7Z7BGENRV7MC)
- key: type
  type: response
  valueType: string
  valueTypeNote: "format: enum"
  insights: true
  factors: true
  description: |
    The card's type. The valid values are:

    * `charge` – See [Wikipedia](https://en.wikipedia.org/wiki/Charge%5Fcard) for an explanation of the difference between charge and credit cards.
    * `credit`
    * `debit`
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Credit Card > Issuer

{{< anchor-target schema--response--credit-card--issuer >}}

This is a sub-object of `credit_card` that contains information related to the
issuer of the card.

```json
{
  "matches_provided_name": true,
  "matches_provided_phone_number": true,
  "name": "Bank of America",
  "phone_number": "800-732-9194"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="credit_card--issuer" >}}
- key: name
  type: response
  valueType: string
  valueTypeNote: "max length: 255"
  insights: true
  factors: true
  description: |
    This field contains a JSON object with information relating to the credit card issuer.

    [Learn how to use the credit card issuer name for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408734452123-Credit-Card-Risk-Data#h%5F01FN6TY3X4AHK80QZ85KXX6BZZ)
- key: matches_provided_name
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if the name matches the name provided in the request for the card issuer. It is `false` if the name does not match. The field is not included if either no name or issuer ID number (IIN) is provided in the request or if MaxMind does not have a name associated with the IIN.
- key: phone_number
  type: response
  valueType: string
  valueTypeNote: "max length: 255"
  insights: true
  factors: true
  description: |
    The phone number of the bank which issued the credit card. In some cases the phone number we return may be out of date.
- key: matches_provided_phone_number
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if the phone number matches the number provided in the request for the card issuer. It is `false` if the number does not match. The field is not included if either no phone number or issuer ID number (IIN) is provided in the request or if MaxMind does not have a phone number associated with the IIN.
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Device

{{< anchor-target schema--response--device >}}

This object contains information about the device that MaxMind believes is
associated with the IP address passed in the request.

```json
{
  "confidence": 99,
  "id": "7835b099-d385-4e5b-969e-7df26181d73b",
  "last_seen": "2016-06-08T14:16:38Z",
  "local_time": "2018-01-02T10:40:11-08:00"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="device" >}}
- key: confidence
  type: response
  valueType: decimal
  valueTypeNote: "min: 0.01, max: 99"
  insights: true
  factors: true
  description: |
    A number from 0.01 to 99 representing the confidence that the `/device/id`refers to a unique device as opposed to a cluster of similar devices. A confidence of 0.01 indicates very low confidence that the device is unique, whereas 99 indicates very high confidence.

    [Learn how to use device confidence for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408634894107-Device-Risk-Data#h%5F01FN6V1ANY9XA76Z69HG2DZ5TJ)
- key: id
  type: response
  valueType: string
  valueTypeNote: "format: UUID"
  insights: true
  factors: true
  description: |
    A UUID that MaxMind uses for the device associated with this IP address. This is only available if you are using the [Device Tracking Add-on](/minfraud/api-documentation#device-tracking-add-on).
- key: last_seen
  type: response
  valueType: string
  valueTypeNote: "max length: 255"
  insights: true
  factors: true
  description: |
    The date and time of the last sighting of the device. The value is formatted according to [RFC 3339](https://tools.ietf.org/html/rfc3339).

    [Learn how to use the last sighting data for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408634894107-Device-Risk-Data#h%5F01FN6V29YM8FA1A48G0N2G7VRW)
- key: local_time
  type: response
  valueType: string
  valueTypeNote: "max length: 255"
  insights: true
  factors: true
  description: |
    The local date and time of the transaction in the time zone of the device. This is determined by using the UTC offset associated with the device. The value is formatted according to [RFC 3339](https://tools.ietf.org/html/rfc3339).

    [Learn how to use local time data for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408634894107-Device-Risk-Data#h%5F01FN6V22JSGD7JP7Y3C9YBERHE)
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Email

{{< anchor-target schema--response--email >}}

```json
{
  "domain": {
    "first_seen": "2015-01-20"
  },
  "first_seen": "2016-02-03",
  "is_disposable": false,
  "is_free": false,
  "is_high_risk": true
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="email" >}}
- key: domain
  type: response
  valueType: object
  insights: true
  factors: true
  description: |
    This field contains a JSON object with information relating to the domain.
- key: first_seen
  type: response
  valueType: string
  valueTypeNote: "format: YYYY-MM-DD, max length: 10"
  insights: true
  factors: true
  description: |
    A date string (e.g. 2017-04-24) to identify the date an email address was first seen by MaxMind. This is expressed using the ISO 8601 date format YYYY-MM-DD. The earliest date that may be returned is January 1, 2008.

    [Learn how to use email first seen data for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408562891803-Email-Risk-Data#h%5F01FN6V59SHH0J0MRH041K46NE0)
- key: is_disposable
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if MaxMind believes that the email address is from a disposable email provider. It is `false` if the address is not from a known disposable email provider. The key will only be present if a valid email address or email domain is provided.

    [Learn how to use disposable email detection for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408562891803-Email-Risk-Data#h%5F01FN6V5QYMX2DYRB4YSFM93F8D)
- key: is_free
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if MaxMind believes that this email domain is for a free email provider such as Gmail or Yahoo! Mail. It is `false` if the domain is not for a known free email provider. The key will only be present if a valid email address or email domain is provided.

    [Learn how to use free email detection for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408562891803-Email-Risk-Data#h%5F01FN6V5QYMX2DYRB4YSFM93F8D)
- key: is_high_risk
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if MaxMind believes that this email address is likely to be used for fraud. It is `false` if MaxMind does not believe the address is used for fraud. The key will only be present if a valid email address or email address hash is provided. Note that this is also factored into the overall `risk_score` in the response as well.

    [Learn how to use our high risk email flag for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408562891803-Email-Risk-Data#h%5F01FN6V50N3JM0YV92SJMJSRR37)
{{</ schema-table >}}

### Email > Domain
{{< anchor-target schema--response--email--domain >}}

This is a sub-object of `email` that contains information related to the domain.
```json
{
  "first_seen": "2015-01-20"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="email--domain" >}}
- key: first_seen
  type: response
  valueType: string
  valueTypeNote: "format: YYYY-MM-DD, max length: 10"
  insights: true
  factors: true
  description: |
    A date string (e.g. 2019-01-01) to identify the date an email address domain was first seen by MaxMind. This is expressed using the ISO 8601 date format `YYYY-MM-DD`. The earliest date that may be returned is January 1, 2019.

    [Learn how to use email first seen data for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408562891803-Email-Risk-Data#h%5F01FN6V59SHH0J0MRH041K46NE0)
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Shipping Address

{{< anchor-target schema--response--shipping-address >}}

```json
{
  "distance_to_billing_address": 22,
  "distance_to_ip_location": 15,
  "is_high_risk": true,
  "is_in_ip_country": true,
  "is_postal_in_city": true,
  "latitude": 37.632,
  "longitude": -122.313
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="shipping_address" >}}
- key: is_high_risk
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if the shipping address is an address associated with fraudulent transactions. The field is `false` when the address is not associated with increased risk. The key will only be present when a shipping address is provided.

    [Learn more about the flag for high risk shipping addresses on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408737039515-Billing-and-Shipping-Address-Risk-Data#h%5F01FN6TQP51E294G9ANGEHPC9ZY)
- key: is_postal_in_city
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if the postal code provided with the address is in the city for the address. The field is `false` when the postal code is not in the city. The key will only be present when a billing postal code, city, and country have been provided.

    We use [GeoNames data](https://www.geonames.org/postal-codes/postal-codes-us.html) for the postal-city match, which uses the [preferred place name](https://en.wikipedia.org/wiki/ZIP%5FCode#Preferred%5Fplace%5Fnames:%5FZIP%5FCodes%5Fand%5Fprevious%5Fzoning%5Flines) for a US ZIP code. [Alternative place names](https://en.wikipedia.org/wiki/ZIP%5FCode#Preferred%5Fplace%5Fnames:%5FZIP%5FCodes%5Fand%5Fprevious%5Fzoning%5Flines) for US ZIP codes may not trigger a match for this field.

    [Learn how to use the postal to city check for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408737039515-Billing-and-Shipping-Address-Risk-Data#h%5F01FN6TV1Z2BRWCHVBK1ZE8276E)
- key: latitude
  type: response
  valueType: decimal
  insights: true
  factors: true
  description: |
    The approximate [WGS84](https://en.wikipedia.org/wiki/World%5FGeodetic%5FSystem) latitude associated with the address.

    **Latitude and longitude are not precise and should not be used to identify a particular street address or household.**
- key: longitude
  type: response
  valueType: decimal
  insights: true
  factors: true
  description: |
    The approximate [WGS84](https://en.wikipedia.org/wiki/World%5FGeodetic%5FSystem) longitude associated with the address.

    **Latitude and longitude are not precise and should not be used to identify a particular street address or household.**
- key: distance_to_ip_location
  type: response
  valueType: integer
  insights: true
  factors: true
  description: |
    The distance in kilometers from the address to the IP location. We fall back to country or subdivision information if we do not have postal or city information for an IP address, which may lead to inaccurate distance calculations.

    [Learn how to use the IP geolocation to address distance for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408737039515-Billing-and-Shipping-Address-Risk-Data#h%5F01FN6TVDXWSBQR55FJ0K2KWGJQ)
- key: distance_to_billing_address
  type: response
  valueType: integer
  insights: true
  factors: true
  description: |
    The distance in kilometers from the shipping address to billing address. We fall back to country or subdivision information if we do not have postal or city information for an IP address, which may lead to inaccurate distance calculations.

    [Learn how to use the shipping to billing address distance for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408737039515-Billing-and-Shipping-Address-Risk-Data#h%5F01FN6TREMWDMHSB6EW41XX1A0Y)
- key: is_in_ip_country
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if the address is in the IP country. The field is`false` when the address is not in the IP country. If the IP address could not be geolocated or no billing address was provided, the field will not be included in the response.

    [Learn how to use the IP location to country check for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408737039515-Billing-and-Shipping-Address-Risk-Data#h%5F01FN6TVDXWSBQR55FJ0K2KWGJQ)
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Shipping Phone

{{< anchor-target schema--response--shipping-phone >}}

```json
{
  "country": "CA",
  "is_voip": true,
  "matches_postal": true,
  "network_operator": "Telus Mobility-SVR/2",
  "number_type": "mobile"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="shipping_phone" >}}
- key: country
  type: response
  valueType: string
  insights: true
  factors: true
  description: |
    A two-character [ISO 3166-1](https://en.wikipedia.org/wiki/ISO%5F3166-1) country code for the country associated with the shipping phone number.
- key: network_operator
  type: response
  valueType: string
  insights: true
  factors: true
  description: |
    The name of the original network operator associated with the shipping phone number. This field does not reflect phone numbers that have been ported from the original operator to another, nor does it identify [mobile virtual network operators](https://en.wikipedia.org/wiki/Mobile%5Fvirtual%5Fnetwork%5Foperator).
- key: number_type
  type: response
  valueType: string
  insights: true
  factors: true
  description: |
    One of the following values: `fixed` or `mobile`. Additional values may be added in the future.
- key: is_voip
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This is `true` if the shipping phone number is a Voice over Internet Protocol (VoIP) number allocated by a regulator. It is `false` if the shipping phone number is not a VoIP number allocated by a regulator. The key is only present when a valid shipping phone number has been provided and we have data for it.
- key: matches_postal
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if the phone number's prefix is commonly associated with the shipping postal code. It is `false` if the prefix is not associated with the postal code. This key is only present when the phone number is in the US, the number prefix is in our database, and the postal code and country are provided in the request.
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Billing Address

{{< anchor-target schema--response--billing-address >}}

```json
{
  "distance_to_ip_location": 100,
  "is_in_ip_country": true,
  "is_postal_in_city": true,
  "latitude": 37.545,
  "longitude": -122.421
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="billing_address" >}}
- key: is_postal_in_city
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if the postal code provided with the address is in the city for the address. The field is `false` when the postal code is not in the city. The key will only be present when a billing postal code, city, and country have been provided.

    We use [GeoNames data](https://www.geonames.org/postal-codes/postal-codes-us.html) for the postal-city match, which uses the [preferred place name](https://en.wikipedia.org/wiki/ZIP%5FCode#Preferred%5Fplace%5Fnames:%5FZIP%5FCodes%5Fand%5Fprevious%5Fzoning%5Flines) for a US ZIP code. [Alternative place names](https://en.wikipedia.org/wiki/ZIP%5FCode#Preferred%5Fplace%5Fnames:%5FZIP%5FCodes%5Fand%5Fprevious%5Fzoning%5Flines) for US ZIP codes may not trigger a match for this field.

    [Learn how to use the postal to city check for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408737039515-Billing-and-Shipping-Address-Risk-Data#h%5F01FN6TV1Z2BRWCHVBK1ZE8276E)
- key: latitude
  type: response
  valueType: decimal
  insights: true
  factors: true
  description: |
    The approximate [WGS84](https://en.wikipedia.org/wiki/World%5FGeodetic%5FSystem) latitude associated with the address.

    **Latitude and longitude are not precise and should not be used to identify a particular street address or household.**
- key: longitude
  type: response
  valueType: decimal
  insights: true
  factors: true
  description: |
    The approximate [WGS84](https://en.wikipedia.org/wiki/World%5FGeodetic%5FSystem) longitude associated with the address.

    **Latitude and longitude are not precise and should not be used to identify a particular street address or household.**
- key: distance_to_ip_location
  type: response
  valueType: integer
  insights: true
  factors: true
  description: |
    The distance in kilometers from the address to the IP location. We fall back to country or subdivision information if we do not have postal or city information for an IP address, which may lead to inaccurate distance calculations.

    [Learn how to use the IP geolocation to address distance for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408737039515-Billing-and-Shipping-Address-Risk-Data#h%5F01FN6TVDXWSBQR55FJ0K2KWGJQ)
- key: is_in_ip_country
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if the address is in the IP country. The field is`false` when the address is not in the IP country. If the IP address could not be geolocated or no billing address was provided, the field will not be included in the response.

    [Learn how to use the IP location to country check for risk analysis on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408737039515-Billing-and-Shipping-Address-Risk-Data#h%5F01FN6TVDXWSBQR55FJ0K2KWGJQ)
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Billing Phone

{{< anchor-target schema--response--billing-phone >}}

```json
{
  "country": "US",
  "is_voip": true,
  "matches_postal": true,
  "network_operator": "Verizon/1",
  "number_type": "fixed"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="billing_phone" >}}
- key: country
  type: response
  valueType: string
  insights: true
  factors: true
  description: |
    A two-character [ISO 3166-1](https://en.wikipedia.org/wiki/ISO%5F3166-1) country code for the country associated with the billing phone number.
- key: network_operator
  type: response
  valueType: string
  insights: true
  factors: true
  description: |
    The name of the original network operator associated with the billing phone number. This field does not reflect phone numbers that have been ported from the original operator to another, nor does it identify [mobile virtual network operators](https://en.wikipedia.org/wiki/Mobile%5Fvirtual%5Fnetwork%5Foperator).
- key: number_type
  type: response
  valueType: string
  insights: true
  factors: true
  description: |
    One of the following values: `fixed` or `mobile`. Additional values may be added in the future.
- key: is_voip
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This is `true` if the billing phone number is a Voice over Internet Protocol (VoIP) number allocated by a regulator. It is `false` if the billing phone number is not a VoIP number allocated by a regulator. The key is only present when a valid billing phone number has been provided and we have data for it.
- key: matches_postal
  type: response
  valueType: boolean
  insights: true
  factors: true
  description: |
    This field is `true` if the phone number's prefix is commonly associated with the billing postal code. It is `false` if the prefix is not associated with the postal code. This key is only present when the phone number is in the US, the number prefix is in our database, and the postal code and country are provided in the request.
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Disposition

{{< anchor-target schema--response--disposition >}}

This object contains information about how a request was handled by the custom
rules you have defined. If your account does not have any custom rules defined,
then this object will not be present in the response.

[Learn about custom rules and dispositions on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408801942811-Use-Custom-Rules-and-Dispositions)

```json
{
  "action": "accept",
  "reason": "default",
  "rule_label": "my_custom_rule"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="disposition" >}}
- key: action
  type: response
  valueType: string
  valueTypeNote: "format: enum"
  score: true
  insights: true
  factors: true
  description: |
    This describes how the request was handled. The valid values are:

    | Action         | Explanation                                                                            |
    | -------------- | -------------------------------------------------------------------------------------- |
    | `accept`         | This is the default value that is used if none of your custom rules match the request. |
    | `reject`         |                                                                                        |
    | `manual_review` |                                                                                        |
    | `test`           | This value can be used to test custom rules.                                           |
- key: reason
  type: response
  valueType: string
  valueTypeNote: "format: enum"
  score: true
  insights: true
  factors: true
  description: |
    This describes why the `action` was set to a particular value. The valid values are:

    | Reason       | Explanation                                   |
    | ------------ | --------------------------------------------- |
    | `default`      | No custom rules matched the request.          |
    | `custom_rule` | A custom rule was applied and set the action. |
- key: rule_label
  type: response
  valueType: string
  score: true
  insights: true
  factors: true
  description: |
    The custom rule that was triggered. If you do not have custom rules set up, the triggered custom rule does not have a label, or no custom rule was triggered, the field will not be included in the response.
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Risk Score Reasons

{{< anchor-target schema--response--risk-score-reasons >}}

This array contains risk score reason objects. Risk score reasons are usually
only returned for medium to high risk transactions. If there were no significant
changes to the risk score due to these reasons, then this array will not be
present in the response.

```json
[
  {
    "multiplier": 45,
    "reasons": [
      {
        "code": "ANONYMOUS_IP",
        "reason": "The Anonymous IP address raised the overall risk score"
      },
      {
        "code": "IP_ISSUER_ID_NUMBER_VELOCITY",
        "reason": "The number of distinct Issuer ID Numbers found in the velocity check on IP address raised the overall risk score"
      }
    ]
  },
  {
    "multiplier": 1.8,
    "reasons": [
      {
        "code": "TIME_OF_DAY",
        "reason": "The local time of day of the request raised the overall risk score"
      }
    ]
  },
  {
    "multiplier": 1.6,
    "reasons": [
      {
        "code": "EMAIL_DOMAIN_NEW",
        "reason": "The email domain being recently seen for the first time in the minFraud network raised the overall risk score"
      }
    ]
  },
  {
    "multiplier": 0.34,
    "reasons": [
      {
        "code": "PHONE_ACTIVITY",
        "reason": "minFraud network activity of the phone number lowered the overall risk score"
      }
    ]
  }
]
```

<!-- prettier-ignore-start -->

{{< schema-table key="risk_score_reason" >}}
- key: multiplier
  type: response
  valueType: decimal
  valueTypeNote: "min: 0.01, max: 100"
  factors: true
  description: |
    The factor by which the risk score is increased (if the value is greater than 1) or decreased (if the value is less than 1) for given risk reason(s). Multipliers greater than 1.5 and less than 0.66 are considered significant and lead to risk reason(s) being present.
- key: reasons
  type: response
  valueType: array
  factors: true
  description: |
    This array contains objects that describe one of the reasons for the multiplier.
- key: code
  type: response
  valueType: string
  valueTypeNote: "format: enum, max length: 255"
  factors: true
  description: |
    A machine-readable code identifying the risk reason. Examples listed below. Although more codes may be added in the future, a list of current codes may be provided on request.
    | Code            |
    | --------------- |
    | ANONYMOUS\_IP           |
    |  COUNTRY                |
    | ORG\_DISTANCE\_RISK     |
- key: reason
  type: response
  valueType: string
  factors: true
  description: |
    The human-readable description of the risk reason and its effect on the overall risk score.
    | Code                                       | Reason                                                                                                           |
    | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
    | ANONYMOUS\_IP                              | The Anonymous IP address raised the overall risk score                                                                    |
    | COUNTRY                                    | The country associated with the request lowered the overall risk score                                                            |
    | ORG\_DISTANCE\_RISK                        | The risk of the ISP combined with the distance between the billing address and IP address location raised the overall risk score                                                |
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Warnings

{{< anchor-target schema--response--warnings >}}

This array contains warning objects detailing issues with the request that was
sent such as invalid or unknown inputs. It is highly recommended that you check
this array for issues when integrating the web service.

```json
[
  {
    "code": "INPUT_INVALID",
    "input_pointer": "/shipping/city",
    "warning": "Encountered value at /shipping/city that does not meet the required constraints"
  }
]
```

<!-- prettier-ignore-start -->

{{< schema-table key="warnings" >}}
- key: code
  type: response
  valueType: string
  valueTypeNote: "max length: 255"
  score: true
  insights: true
  factors: true
  description: |
    This value is a machine-readable code identifying the warning. Although more codes may be added in the future, the current codes are:

    | Code                          | Description                                                                                                                                                                                                                                               |
    | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `BILLING_CITY_NOT_FOUND`     | The billing city could not be found in our database. This may impact our ability to provide accurate distance calculations.                                                                                                                               |
    | `BILLING_COUNTRY_MISSING`     | Billing address information was provided without providing a billing country. This may impact our ability to provide accurate distance calculations.                                                                                                      |
    | `BILLING_COUNTRY_NOT_FOUND`  | The billing country could not be found in our database. This may impact our ability to provide accurate distance calculations.                                                                                                                            |
    | `BILLING_POSTAL_NOT_FOUND`   | The billing postal could not be found in our database. This may impact our ability to provide accurate distance calculations.                                                                                                                             |
    | `BILLING_REGION_NOT_FOUND`   | The billing region could not be found in our database. This may impact our ability to provide accurate distance calculations.                                                                                                                             |
    | `EMAIL_ADDRESS_UNUSABLE`      | The email address entered is likely incorrect due to an integration issue. To avoid false positives, it has not been used in scoring. Check how you are passing your [email address inputs](/minfraud/api-documentation/requests#schema--request--email). |
    | `INPUT_INVALID`                | The value associated with the key does not meet the required constraints, e.g., "United States" in a field that requires a two-letter country code.                                                                                                       |
    | `INPUT_UNKNOWN`                | An unknown key was encountered in the request body.                                                                                                                                                                                                       |
    | `IP_ADDRESS_INVALID`          | The IP address supplied is not a valid IPv4 or IPv6 address.                                                                                                                                                                                              |
    | `IP_ADDRESS_NOT_FOUND`       | The IP address could not be geolocated.                                                                                                                                                                                                                   |
    | `IP_ADDRESS_RESERVED`         | The IP address supplied is in a reserved network.                                                                                                                                                                                                         |
    | `SHIPPING_CITY_NOT_FOUND`    | The shipping city could not be found in our database. This may impact our ability to provide accurate distance calculations.                                                                                                                              |
    | `SHIPPING_COUNTRY_MISSING`    | Shipping address information was provided without providing a shipping country. This may impact our ability to provide accurate distance calculations.                                                                                                    |
    | `SHIPPING_COUNTRY_NOT_FOUND` | The shipping country could not be found in our database. This may impact our ability to provide accurate distance calculations.                                                                                                                           |
    | `SHIPPING_POSTAL_NOT_FOUND`  | The shipping postal could not be found in our database. This may impact our ability to provide accurate distance calculations.                                                                                                                            |
    | `SHIPPING_REGION_NOT_FOUND`  | The shipping region could not be found in our database. This may impact our ability to provide accurate distance calculations.                                                                                                                            |
- key: warning
  type: response
  valueType: string
  valueTypeNote: "max length: 255"
  score: true
  insights: true
  factors: true
  description: |
    This field provides a human-readable explanation of the warning. The description may change at any time and should not be matched against.
- key: input_pointer
  type: response
  valueType: string
  valueTypeNote: "format: json pointer"
  score: true
  insights: true
  factors: true
  description: |
    A [JSON Pointer](https://tools.ietf.org/html/rfc6901) to the input field that the warning is associated with. For instance, if the warning was about the billing city, this would be `/billing/city`. If it was for the price in the second shopping cart item, it would be `/shopping_cart/1/price`
{{</ schema-table >}}

<!-- prettier-ignore-end -->

## Example Response Bodies

Each service returns data as a JSON document. The document that is returned
always consists of an object (aka map or hash). Below are full examples of the
JSON body document for the minFraud Score, minFraud Insights, and minFraud
Factors services, and a full example of the JSON body document for an error.

### minFraud Score Body Example

```json
{
  "disposition": {
    "action": "accept",
    "reason": "default",
    "rule_label": "my_custom_rule"
  },
  "funds_remaining": 25,
  "id": "5bc5d6c2-b2c8-40af-87f4-6d61af86b6ae",
  "ip_address": {
    "risk": 0.01
  },
  "queries_remaining": 5000,
  "risk_score": 0.01,
  "warnings": [
    {
      "code": "INPUT_INVALID",
      "input_pointer": "/shipping/city",
      "warning": "Encountered value at /shipping/city that does not meet the required constraints"
    }
  ]
}
```

### minFraud Insights Body Example

```json
{
  "disposition": {
    "action": "accept",
    "reason": "default",
    "rule_label": "my_custom_rule"
  },
  "funds_remaining": 25,
  "id": "5bc5d6c2-b2c8-40af-87f4-6d61af86b6ae",
  "ip_address": {
    "risk": 0.01,
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
      "confidence": 75,
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
    "location": {
      "accuracy_radius": 20,
      "average_income": 50321,
      "latitude": 37.6293,
      "local_time": "2015-04-26T01:37:17-08:00",
      "longitude": -122.1163,
      "metro_code": 807,
      "population_density": 7122,
      "time_zone": "America/Los_Angeles"
    },
    "postal": {
      "code": "90001",
      "confidence": 10
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
    "risk_reasons": [
      {
        "code": "ANONYMOUS_IP",
        "reason": "The IP address belongs to an anonymous network. See /ip_address/traits for more details."
      },
      {
        "code": "MINFRAUD_NETWORK_ACTIVITY",
        "reason": "Suspicious activity has been seen on this IP address across minFraud customers."
      }
    ],
    "subdivisions": [
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
    ],
    "traits": {
      "autonomous_system_number": 1239,
      "autonomous_system_organization": "Linkem IR WiMax Network",
      "connection_type": "Cable/DSL",
      "domain": "example.com",
      "ip_address": "1.2.3.4",
      "is_anonymous": true,
      "is_anonymous_proxy": true,
      "is_anonymous_vpn": true,
      "is_anycast": true,
      "is_hosting_provider": true,
      "is_public_proxy": true,
      "is_residential_proxy": true,
      "is_satellite_provider": true,
      "is_tor_exit_node": true,
      "isp": "Linkem spa",
      "mobile_country_code": "310",
      "mobile_network_code": "004",
      "network": "1.2.3.0/24",
      "organization": "Linkem IR WiMax Network",
      "static_ip_score": 1.5,
      "user_count": 1,
      "user_type": "traveler"
    }
  },
  "queries_remaining": 5000,
  "risk_score": 0.01,
  "warnings": [
    {
      "code": "INPUT_INVALID",
      "input_pointer": "/shipping/city",
      "warning": "Encountered value at /shipping/city that does not meet the required constraints"
    }
  ],
  "billing_address": {
    "distance_to_ip_location": 100,
    "is_in_ip_country": true,
    "is_postal_in_city": true,
    "latitude": 37.545,
    "longitude": -122.421
  },
  "billing_phone": {
    "country": "US",
    "is_voip": true,
    "matches_postal": true,
    "network_operator": "Verizon/1",
    "number_type": "fixed"
  },
  "credit_card": {
    "brand": "Visa",
    "country": "US",
    "is_business": true,
    "is_issued_in_billing_address_country": true,
    "is_prepaid": true,
    "is_virtual": true,
    "issuer": {
      "matches_provided_name": true,
      "matches_provided_phone_number": true,
      "name": "Bank of America",
      "phone_number": "800-732-9194"
    },
    "type": "credit"
  },
  "device": {
    "confidence": 99,
    "id": "7835b099-d385-4e5b-969e-7df26181d73b",
    "last_seen": "2016-06-08T14:16:38Z",
    "local_time": "2018-01-02T10:40:11-08:00"
  },
  "email": {
    "domain": {
      "first_seen": "2015-01-20"
    },
    "first_seen": "2016-02-03",
    "is_disposable": false,
    "is_free": false,
    "is_high_risk": true
  },
  "shipping_address": {
    "distance_to_billing_address": 22,
    "distance_to_ip_location": 15,
    "is_high_risk": true,
    "is_in_ip_country": true,
    "is_postal_in_city": true,
    "latitude": 37.632,
    "longitude": -122.313
  },
  "shipping_phone": {
    "country": "CA",
    "is_voip": true,
    "matches_postal": true,
    "network_operator": "Telus Mobility-SVR/2",
    "number_type": "mobile"
  }
}
```

### minFraud Factors Body Example

```json
{
  "disposition": {
    "action": "accept",
    "reason": "default",
    "rule_label": "my_custom_rule"
  },
  "funds_remaining": 25,
  "id": "5bc5d6c2-b2c8-40af-87f4-6d61af86b6ae",
  "ip_address": {
    "risk": 0.01,
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
      "confidence": 75,
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
    "location": {
      "accuracy_radius": 20,
      "average_income": 50321,
      "latitude": 37.6293,
      "local_time": "2015-04-26T01:37:17-08:00",
      "longitude": -122.1163,
      "metro_code": 807,
      "population_density": 7122,
      "time_zone": "America/Los_Angeles"
    },
    "postal": {
      "code": "90001",
      "confidence": 10
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
    "risk_reasons": [
      {
        "multiplier": 45,
        "reasons": [
          {
            "code": "ANONYMOUS_IP",
            "reason": "The Anonymous IP address raised the overall risk score"
          },
          {
            "code": "IP_ISSUER_ID_NUMBER_VELOCITY",
            "reason": "The number of distinct Issuer ID Numbers found in the velocity check on IP address raised the overall risk score"
          }
        ]
      },
      {
        "multiplier": 1.8,
        "reasons": [
          {
            "code": "TIME_OF_DAY",
            "reason": "The local time of day of the request raised the overall risk score"
          }
        ]
      },
      {
        "multiplier": 1.6,
        "reasons": [
          {
            "code": "EMAIL_DOMAIN_NEW",
            "reason": "The email domain being recently seen for the first time in the minFraud network raised the overall risk score"
          }
        ]
      },
      {
        "multiplier": 0.34,
        "reasons": [
          {
            "code": "PHONE_ACTIVITY",
            "reason": "minFraud network activity of the phone number lowered the overall risk score"
          }
        ]
      }
    ],
    "subdivisions": [
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
    ],
    "traits": {
      "autonomous_system_number": 1239,
      "autonomous_system_organization": "Linkem IR WiMax Network",
      "connection_type": "Cable/DSL",
      "domain": "example.com",
      "ip_address": "1.2.3.4",
      "is_anonymous": true,
      "is_anonymous_proxy": true,
      "is_anonymous_vpn": true,
      "is_anycast": true,
      "is_hosting_provider": true,
      "is_public_proxy": true,
      "is_residential_proxy": true,
      "is_satellite_provider": true,
      "is_tor_exit_node": true,
      "isp": "Linkem spa",
      "mobile_country_code": "310",
      "mobile_network_code": "004",
      "network": "1.2.3.0/24",
      "organization": "Linkem IR WiMax Network",
      "static_ip_score": 1.5,
      "user_count": 1,
      "user_type": "traveler"
    }
  },
  "queries_remaining": 5000,
  "risk_score": 0.01,
  "warnings": [
    {
      "code": "INPUT_INVALID",
      "input_pointer": "/shipping/city",
      "warning": "Encountered value at /shipping/city that does not meet the required constraints"
    }
  ],
  "billing_address": {
    "distance_to_ip_location": 100,
    "is_in_ip_country": true,
    "is_postal_in_city": true,
    "latitude": 37.545,
    "longitude": -122.421
  },
  "billing_phone": {
    "country": "US",
    "is_voip": true,
    "matches_postal": true,
    "network_operator": "Verizon/1",
    "number_type": "fixed"
  },
  "credit_card": {
    "brand": "Visa",
    "country": "US",
    "is_business": true,
    "is_issued_in_billing_address_country": true,
    "is_prepaid": true,
    "is_virtual": true,
    "issuer": {
      "matches_provided_name": true,
      "matches_provided_phone_number": true,
      "name": "Bank of America",
      "phone_number": "800-732-9194"
    },
    "type": "credit"
  },
  "device": {
    "confidence": 99,
    "id": "7835b099-d385-4e5b-969e-7df26181d73b",
    "last_seen": "2016-06-08T14:16:38Z",
    "local_time": "2018-01-02T10:40:11-08:00"
  },
  "email": {
    "domain": {
      "first_seen": "2015-01-20"
    },
    "first_seen": "2016-02-03",
    "is_disposable": false,
    "is_free": false,
    "is_high_risk": true
  },
  "shipping_address": {
    "distance_to_billing_address": 22,
    "distance_to_ip_location": 15,
    "is_high_risk": true,
    "is_in_ip_country": true,
    "is_postal_in_city": true,
    "latitude": 37.632,
    "longitude": -122.313
  },
  "shipping_phone": {
    "country": "CA",
    "is_voip": true,
    "matches_postal": true,
    "network_operator": "Telus Mobility-SVR/2",
    "number_type": "mobile"
  },
  "risk_score_reasons": [
    {
      "multiplier": 45,
      "reasons": [
        {
          "code": "ANONYMOUS_IP",
          "reason": "Risk due to IP being an Anonymous IP"
        }
      ]
    },
    {
      "multiplier": 1.8,
      "reasons": [
        {
          "code": "TIME_OF_DAY",
          "reason": "Risk due to local time of day"
        }
      ]
    },
    {
      "multiplier": 1.6,
      "reasons": [
        {
          "reason": "Riskiness of newly-sighted email domain",
          "code": "EMAIL_DOMAIN_NEW"
        }
      ]
    },
    {
      "multiplier": 0.34,
      "reasons": [
        {
          "code": "EMAIL_ADDRESS_NEW",
          "reason": "Riskiness of newly-sighted email address"
        }
      ]
    }
  ]
}
```

### Error Body Example

```json
{
  "code": "INSUFFICIENT_FUNDS",
  "error": "You do not have sufficient funds to use this service."
}
```
