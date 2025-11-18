---
draft: false
title: minFraud Alerts
---

After initial scoring, we continue to monitor transactions with risk scores less
than or equal to 10 for another 24 hours. If we receive new information related
to these transactions that lead to a transaction having a re-calculated risk
score greater than or equal to 75, we send out a minFraud Alert.

You can receive minFraud Alerts via email or webhook.

## Receive minFraud Alerts via email

You can set an email where you would like to receive minFraud Alerts through the
[minFraud Alert configuration screen in your account portal](https://www.maxmind.com/en/accounts/current/minfraud/alerts/settings)
(login required).

## Receive minFraud Alerts via webhook

You can also receive minFraud Alerts by webhook, and integrate your own response
to these alerts on your server. You can configure your minFraud Alert webhook
settings through the
[minFraud Alert configuration screen in your account portal](https://www.maxmind.com/en/accounts/current/minfraud/alerts/settings)
(login required).

### Configuration

The alert webhook URL should be an HTTPS endpoint that accepts `GET` requests.
The User-Agent of the minFraud Alert service is `MaxMind MinFraud Alert Robot`.

#### Sample minFraud Alert webhook request

```html
http://yourdomain/yoururl?i=24.24.24.24&maxmindID=1234ABCD&domain=sample.com&city=Anytown&region=CA&country=US&date=Jan.+1,+1970&txnID=foo123&reason=IP+address+has+been+marked+as+a+high-risk+IP&reason_code=HIGH_RISK_IP&minfraud_id=2afb0d26-e3b4-4624-8e66-fd10e64b95df&shop_id=shop321
```

#### Parameters

The following are the parameters that will be included in the query string of
the request. Additional parameters may be added in the future.

{{< schema-table key="alert" >}}
{{< minfraud-schema-row key="city" type="webhook" valueType="string" valueTypeNote="max length: 255" >}}
The billing city included in the original minFraud request.
{{</minfraud-schema-row>}}

{{< minfraud-schema-row key="country" type="webhook" valueType="string" valueTypeNote="max length: 2" >}}
The billing country included in the original minFraud request.
{{</minfraud-schema-row>}}

{{< minfraud-schema-row key="date" type="webhook" valueType="string" valueTypeNote="max length: 255" >}}
The date of the original minFraud request, e.g., `Nov. 1, 2019`.
{{</minfraud-schema-row>}}

{{< minfraud-schema-row key="domain" type="webhook" valueType="string" valueTypeNote="max length: 255" >}}
The email domain included in the original minFraud request.
{{</minfraud-schema-row>}}

{{< minfraud-schema-row key="i" type="webhook" valueType="string" valueTypeNote="format: IPv4 or IPv6" >}}
The IP address included in the original minFraud request.
{{</minfraud-schema-row>}}

{{< minfraud-schema-row key="maxmindID" type="webhook" valueType="string" valueTypeNote="max length: 8" >}}
The minFraud Legacy `maxmindID` of the original minFraud request.
{{</minfraud-schema-row>}}

{{< minfraud-schema-row key="minfraud_id" type="webhook" valueType="string" valueTypeNote="format: UUID" >}}
The minFraud ID of the original minFraud request. {{</minfraud-schema-row>}}

{{< minfraud-schema-row key="new_risk_score" type="webhook" valueType="decimal" valueTypeNote="min: 0.01, max: 99" >}}
The updated risk score, calculated after your initial query with additional
information. {{</minfraud-schema-row>}}

{{< minfraud-schema-row key="old_risk_score" type="webhook" valueType="decimal" valueTypeNote="min: 0.01, max: 99" >}}
The risk score as originally calculated. {{</minfraud-schema-row>}}

{{< minfraud-schema-row key="postal" type="webhook" valueType="string" valueTypeNote="max length: 255" >}}
The billing postal included in the original minFraud request.
{{</minfraud-schema-row>}}

{{< minfraud-schema-row key="reason" type="webhook" valueType="string" >}} A
human-readable description of why the minFraud alert was sent. See below for the
current list of possible reasons. {{</minfraud-schema-row>}}

{{< minfraud-schema-row key="reason_code" type="webhook" valueType="string" valueTypeNote="format: enum" >}}
A fixed, machine-readable code for the reason why the minFraud alert was sent.
See below for the current list of possible reasons. {{</minfraud-schema-row>}}

{{< minfraud-schema-row key="region" type="webhook" valueType="string" valueTypeNote="max length: 4" >}}
The billing region included in the original minFraud request.
{{</minfraud-schema-row>}}

{{< minfraud-schema-row key="shop_id" type="webhook" valueType="string" valueTypeNote="max length: 255" >}}
The shop ID included in the original minFraud request. This will only be set if
the original request included a shop ID. {{</minfraud-schema-row>}}

{{< minfraud-schema-row key="txnID" type="webhook" valueType="string" valueTypeNote="max length: 255" >}}
The transaction ID included in the original minFraud request.
{{</minfraud-schema-row>}}

{{< minfraud-schema-row key="updated_at" type="webhook" valueType="string" valueTypeNote="max length: 255" >}}
The date and time at which the new risk score was calculated, in RFC3339 format,
e.g., `2019-11-01T12:34:56Z` {{</minfraud-schema-row>}} {{</ schema-table >}}

#### Possible alert reasons

These are the possible `reason_code`s which might be returned with a minFraud
Alert. These codes are subject to change.

| `reason_code`      | `reason`                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `CARDER_EMAIL`     | Email on order was flagged as high-risk email, as it was associated with another high-risk order |
| `HIGH_RISK_DEVICE` | Device ID has been marked as a high-risk device ID                                               |
| `HIGH_RISK_IP`     | IP address has been marked as a high-risk IP                                                     |
| `HOSTING_PROVIDER` | IP is from High Risk Hosting Provider                                                            |
| `MANUAL_REVIEW`    | The transaction was flagged as risky after manual review                                         |
| `POSTAL_VELOCITY`  | IP address had high velocity of orders (e.g. different zip codes on same IP address)             |

### Securing your webhook

You can secure your webhook by verifying that alert requests come from MaxMind:

- Check that requests come from one of the MaxMind IPs we
  [list below](#alert-webhook-request-ips).
- Check that requests are signed using a secret you configure in your minFraud
  Alert configuration screen in your account portal.
  [Learn more about setting up signed requests below.](#signed-requests)

#### Alert webhook request IPs

minFraud alert requests may come from one of the following IP addresses. This
list is subject to change.

- `35.186.179.139`

#### Signed requests

Alert requests can be signed by MaxMind. To enable signed requests, visit your
[minFraud Alert configuration screen in your account portal](https://www.maxmind.com/en/accounts/current/minfraud/alerts/settings)
(login required) and set an Alert Webhook Secret.

Once you set a secret, each alert request will have an HTTP header with a
signature of the request. You can calculate the signature of the request on your
server and check it matches the signature in the header to verify the request is
authentic.

For example, if the secret is `supersecret-0123456789` and the alert request is:

```html
http://yourdomain/yoururl?i=24.24.24.24&maxmindID=1234ABCD&domain=sample.com&city=Anytown&region=CA&country=US&date=Jan.+1,+1970&txnID=foo123&reason=IP+address+has+been+marked+as+a+high-risk+IP&reason_code=HIGH_RISK_IP&minfraud_id=2afb0d26-e3b4-4624-8e66-fd10e64b95df&shop_id=shop321
```

Then the request will include this header:

```
X-MaxMind-Alert-HMAC-SHA256: dd11717fc5559effc9607d03f2ad534ac8f7c7f81acba8d2c14d0ed484974ff0
```

The signature is the hex encoded HMAC-SHA256 of the URL query parameters -
everything after the `?` in the request URL. In this case, the text to be signed
is:

```html
i=24.24.24.24&maxmindID=1234ABCD&domain=sample.com&city=Anytown&region=CA&country=US&date=Jan.+1,+1970&txnID=foo123&reason=IP+address+has+been+marked+as+a+high-risk+IP&reason_code=HIGH_RISK_IP&minfraud_id=2afb0d26-e3b4-4624-8e66-fd10e64b95df&shop_id=shop321
```

Please note that the URL query parameters should be from the raw request string
that our server sends. In particular, note that space characters are encoded as
`+` characters.

You can check the signature using something like the following code:

{{< codeset >}}

```ruby
require 'openssl'
require 'openssl/hmac'
require 'rack/utils'

def verify_signature(secret, header, query)
  expectedMAC = OpenSSL::HMAC.hexdigest('SHA256', secret, query)

  raise 'invalid signature' if !Rack::Utils.secure_compare(header, expectedMAC)
end
```

```go
import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
)

func verifySignature(secret, header, query string) (bool, error) {
  gotMAC, err := hex.DecodeString(header)
  if err != nil {
    return false, err
  }

  mac := hmac.New(sha256.New, []byte(secret))
  mac.Write([]byte(query))
  expectedMAC := mac.Sum(nil)

  return hmac.Equal(gotMAC, expectedMAC), nil
}
```

{{</ codeset >}}

To avoid [timing attacks](https://en.wikipedia.org/wiki/Timing_attack), please
use a secure comparison function rather the equals operator of your language.
