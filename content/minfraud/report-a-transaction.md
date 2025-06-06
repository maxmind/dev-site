---
draft: false
title: Report a transaction
---

Reporting transactions as chargebacks, suspected fraud, spam/abuse, and/or false
positive (not fraud) to MaxMind helps us detect about 10-50% more fraud and
reduce false positives for you.

You can report a transaction manually through the account portal’s
[web form](https://www.maxmind.com/en/accounts/current/minfraud/report-transactions)
or your
[minFraud Transactions page](https://www.maxmind.com/en/accounts/current/minfraud-interactive/transactions).
This guide will show you how to programmatically report a transaction using our
official client libraries.

## Implementation

MaxMind offers and highly recommends using
[official client libraries](/minfraud/evaluate-a-transaction/#links-to-maxmind-client-apis)
to access the Report Transaction API. If you cannot or do not wish to use our
client libraries, please review our
[minFraud Report Transaction API Documentation](#api-documentation) for details
on our JSON API.

### 1. Install the minFraud client library

We have a collection of officially supported libraries for you to interact with
the minFraud API:

{{< codeset >}}

```csharp
// Install via NuGet
Install-Package MaxMind.MinFraud
```

```java
// Install via Maven, recommended
<dependency>
  <groupId>com.maxmind.minfraud</groupId>
  <artifactId>minfraud</artifactId>
  <version>1.15.0</version>
</dependency>

// Or install via Gradle
repositories {
  mavenCentral()
}
dependencies {
  compile 'com.maxmind.minfraud:minfraud:1.15.0'
}
```

```javascript
// Install via npm
npm install @maxmind/minfraud-api-node

// Or install via yarn
yarn add @maxmind/minfraud-api-node
```

```php
# Install via Composer
composer require maxmind/minfraud:~1.0
```

```python
# Install via pip
pip install minfraud
```

```ruby
# Install as a gem
gem install minfraud

# Or add this to your Gemfile
gem 'minfraud'
```

{{</ codeset >}}

### 2. Create and submit a transaction report object

A transaction report only needs two fields, a transaction identifier, which can
be the `ip_address`, the `maxmind_id`, the `minfraud_id`, or the
`transaction_id`, and a `tag`. A `tag` can be one of the following values:

| Tag             | Description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| Chargeback      | Used to associate a chargeback with a transaction                             |
| Not fraud       | Used to report a transaction that was later identified as a false positive    |
| Spam or Abuse   | Used to report a transaction that was linked to spam or abuse                 |
| Suspected fraud | Used to report a high risk transaction where fraud has not yet been confirmed |

We highly encourage you to include the MaxMind ID or minFraud ID that identifies
the minFraud Standard/Premium request or minFraud Score/Insights/Factors request
respectively. Alternatively, you can send us the transaction ID you originally
passed to the minFraud service.

The transaction report object may optionally contain a chargeback code and notes
about the transaction you would like to share with MaxMind. MaxMind manually
reviews many reported transactions, so any additional details you provide to
help us understand context are extremely helpful.

{{< codeset >}}

```csharp
var client = new WebServiceClient(10, "LICENSEKEY");

var report = new TransactionReport(
    ipAddress: IPAddress.Parse("1.1.1.1"),
    tag: TransactionReportTag.Chargeback,

    // The following key/values are not mandatory but are encouraged
    maxmindId: "abcd1234",
    minfraudId: new Guid("01c25cb0-f067-4e02-8ed0-a094c580f5e4"),
    transactionId: "txn123");
    chargebackCode: "BL",
    notes: "Suspicious account behavior",

await client.ReportAsync(report);
```

```java
WebServiceClient client = new WebServiceClient.Builder(10, "LICENSEKEY").build();

TransactionReport transaction = new TransactionReport.Builder(InetAddress.getByName("1.1.1.1"), Tag.Chargeback)
    // The following key/values are not mandatory but are encouraged
    .maxmindId("abcd1234")
    .minfraudId(UUID.fromString("01c25cb0-f067-4e02-8ed0-a094c580f5e4"))
    .transactionId("txn123")
    .chargebackCode("BL")
    .notes("Suspicious account behavior")
    .build();

client.reportTransaction(transaction);
```

```javascript
import * as minFraud from '@maxmind/minfraud-api-node';

const client = new minFraud.Client('10', 'LICENSEKEY');

const transactionReport = new minFraud.TransactionReport({
    ipAddress: '1.1.1.1',
    tag: minFraud.Constants.Tag.CHARGEBACK,

    // The following key/values are not mandatory but are encouraged
    maxmindId: 'abcd1234',
    minfraudId: '01c25cb0-f067-4e02-8ed0-a094c580f5e4',
    transactionId: 'txn123',
    chargebackCode: 'BL'
    notes: 'Suspicious account behavior',
  });

client.reportTransaction(transactionReport).then(() => ...);
```

```php
require_once 'vendor/autoload.php';
use MaxMind\MinFraud\ReportTransaction;

$rt = new ReportTransaction(10, 'LICENSEKEY');

$rt->report([
    'ip_address'      => '1.1.1.1',
    'tag'             => 'chargeback',
    // The following key/values are not mandatory but are encouraged
    'maxmind_id'      => 'abcd1234',
    'minfraud_id'     => '01c25cb0-f067-4e02-8ed0-a094c580f5e4',
    'transaction_id'  => 'txn123',
    'chargeback_code' => 'BL',
    'notes'           => 'Suspicious account behavior',
]);
```

```python
from minfraud import Client

client = Client(10, 'LICENSEKEY');

transaction_report = {
  'ip_address': '1.1.1.1',
  'tag': 'chargeback',
  # The following key/values are not mandatory but are encouraged
  'maxmind_id': 'abcd1234'
  'minfraud_id': '01c25cb0-f067-4e02-8ed0-a094c580f5e4',
  'transaction_id': 'txn123',
  'chargeback_code': 'BL',
  'notes': 'Suspicious account behavior',
}

client.report(transaction_report)

# If you want to use asynchronous requests
import asyncio
from minfraud import Client

async_client = AsyncClient(10, 'LICENSEKEY');

async def report():
  transaction_report = {
    'ip_address': '1.1.1.1',
    'tag': 'chargeback',
    # The following key/values are not mandatory but are encouraged
    'maxmind_id': 'abcd1234'
    'minfraud_id': '01c25cb0-f067-4e02-8ed0-a094c580f5e4',
    'transaction_id': 'txn123',
    'chargeback_code': 'BL',
    'notes': 'Suspicious account behavior',
  }
  await async_client.report(transaction_report)

asyncio.run(report())
```

```ruby
Minfraud.configure do |c|
  c.account_id = 10
  c.license_key = 'LICENSEKEY'
end

txn = Minfraud::Components::Report::Transaction.new(
  ip_address:      '1.1.1.1',
  tag:             :chargeback,
  # The following key/values are not mandatory but are encouraged
  maxmind_id:      'abcd1234',
  minfraud_id:     '01c25cb0-f067-4e02-8ed0-a094c580f5e4',
  transaction_id:  'txn123'
  chargeback_code: 'BL'
  notes:           'Suspicious account behavior',
)

reporter = Minfraud::Report.new(transaction: txn)
reporter.report_transaction
```

{{</ codeset >}}

## Validation and error handling

By default, our client libraries will throw an exception if any of the
transaction report object's values are invalid. The exception is thrown when the
object is constructed; the python library will raise an error when the minFraud
service method is called.

If the report transaction request fails, our client libraries will throw an
exception, raise an error (python), or reject the promise (node).

For more information on errors and exceptions, including their types and
descriptions,
[go to the specific library's documentation page](/minfraud/evaluate-a-transaction#links-to-maxmind-client-apis).

## API Documentation

The HTTP API requires you to pass a set of parameters as JSON via an HTTP POST.

The URI for this service is
`https://minfraud.maxmind.com/minfraud/v2.0/transactions/report`.

The `minfraud.maxmind.com` hostname automatically picks the data center
geographically closest to you.

### Authorization and Security

The HTTP Authorization header is required for authorization. The username is
your
[MaxMind account ID](https://www.maxmind.com/en/accounts/current/license-key).
The password is your
[MaxMind license key](https://www.maxmind.com/en/accounts/current/license-key).

{{< alert warning >}}
You must be approved for a trial or purchase credit for use with our web
services in order to receive an account ID and license key.
{{</ alert >}}

We use
[basic HTTP authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).
The APIs which require authentication are only available via HTTPS. The
credentials are never transmitted unencrypted. If you attempt to access this
service via HTTP, you will receive a `403 Forbidden` HTTP response.

We require TLS 1.2 or greater for all requests to our servers to keep your data
secure.

### Request Headers

The `Content-Type` header should always be `application/json`.

### Request Body

The minFraud API accepts input as JSON in the body of an HTTP POST. The JSON
document should consist of a single object. That object may contain the
following keys (key names are case-sensitive):

| Name                | Type        | Description                                                                                                                                                                                                                |
| ------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ip_address**      | string      | _Conditionally required.[^1]_ The IP address of the customer placing the order. This should be passed as a string like “44.55.66.77” or “2001:db8::2:1”.                                                                   |
| **tag**             | string      | **Required.** A string indicating the likelihood that a transaction may be fraudulent. Possible values: `not_fraud`, `suspected_fraud`, `spam_or_abuse`, or `chargeback`.                                                  |
| **chargeback_code** | string      | _Optional._ A string which is provided by your payment processor indicating the [reason for the chargeback](https://en.wikipedia.org/wiki/Chargeback#Reason_codes).                                                        |
| **maxmind_id**      | string (8)  | _Conditionally required.[^1]_ A unique eight character string identifying a minFraud Standard or Premium request. These IDs are returned in the `maxmindID` field of a response for a successful minFraud request.         |
| **minfraud_id**     | string (36) | _Conditionally required.[^1]_ A UUID that identifies a minFraud Score, minFraud Insights, or minFraud Factors request. This ID is returned at `/id` in the response.                                                       |
| **notes**           | string      | _Optional._ Your notes on the fraud tag associated with the transaction. We manually review many reported transactions to improve our scoring for you so any additional details to help us understand context are helpful. |
| **transaction_id**  | string      | _Conditionally required.[^1]_ The transaction ID you originally passed to minFraud.                                                                                                                                        |

[^1]:
    You must provide at least one of `ip_address`, `maxmind_id`, `minfraud_id`,
    or `transaction_id`. You are encouraged to provide as many as you have
    available to help ensure your transaction is correctly matched.

### Response

HTTP status codes are used to relay success and error messages. A successful
POST will return a 204 (No Content) status code.

When the server returns an error (4xx or 5xx), the response may include a JSON
document in the body. This document is a single object with the keys `code` and
`error`. The `code` field is a static error code for machine use. The value of
any given code will never change, though codes can be added or removed. The
`error` field is a human-readable description of the error and may change at any
time.

Not all errors include a JSON body. An error in content negotiation will not
include a body, nor will many 5xx errors, which typically happen outside of our
web service request handling code. You should check the `Content-Type` type of
an error response before attempting to decode the body as JSON.

In addition to the errors documented below, client code should also be prepared
to handle any valid HTTP 4xx or 5xx status code.

| Error Code              | HTTP Status                | Description                                                                                                                                                                                                                                                                       |
| ----------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JSON_INVALID            | 400 Bad Request            | Your JSON could not be parsed.                                                                                                                                                                                                                                                    |
| MAXMIND_ID_INVALID      | 400 Bad Request            | You have supplied an invalid `maxmind_id`. This field is case sensitive. Check your `maxmind_id` to ensure that it is 8 characters in length and made up only of digits and upper case letters. This value must come from the successful response to a previous minFraud request. |
| MINFRAUD_ID_INVALID     | 400 Bad Request            | You have supplied an invalid `minfraud_id`. Check your `minfraud_id` to ensure that it is a valid UUID as returned in the minFraud Score, minFraud Insights, or minFraud Factors response.                                                                                        |
| PARAMETER_UNKNOWN       | 400 Bad Request            | You have supplied an unknown parameter. Check the keys in your JSON data to ensure that you have not misspelled any of the field names or passed a field name which is not listed in [the available input fields](#request-body).                                                 |
| TAG_REQUIRED            | 400 Bad Request            | Your request does not include a `tag` field.                                                                                                                                                                                                                                      |
| TAG_INVALID             | 400 Bad Request            | Your request includes an invalid `tag` field.                                                                                                                                                                                                                                     |
| TRANSACTION_ID_REQUIRED | 400 Bad Request            | Your request must include on of the following fields: `ip_address`, `maxmind_id`, `minfraud_id`, or `transaction_id`.                                                                                                                                                             |
| IP_ADDRESS_INVALID      | 400 Bad Request            | You have not supplied a valid IPv4 or IPv6 address.                                                                                                                                                                                                                               |
| IP_ADDRESS_RESERVED     | 400 Bad Request            | You have supplied an IP address which belongs to a reserved or private range.                                                                                                                                                                                                     |
| AUTHORIZATION_INVALID   | 401 Unauthorized           | You have supplied an invalid [MaxMind account ID and/or license key](https://www.maxmind.com/en/accounts/current/license-key) in the [Authorization](#authorization-and-security) header.                                                                                                       |
| LICENSE_KEY_REQUIRED    | 401 Unauthorized           | You have not supplied a [MaxMind license key](https://www.maxmind.com/en/accounts/current/license-key) in the [Authorization](#authorization-and-security) header.                                                                                                                              |
| ACCOUNT_ID_REQUIRED     | 401 Unauthorized           | You have not supplied a [MaxMind account ID](https://support.maxmind.com/hc/en-us/articles/4412951066779-Find-my-Account-ID) in the [Authorization](#authorization-and-security) header.                                                                                          |
| (none)                  | 415 Unsupported Media Type | Your request included a `Content-Type` header that is not supported. For `GET` requests, this means the web service cannot return content of that type. For `PUT` and `POST` queries, this means the web service cannot parse a request body of that type.                        |
| (none)                  | 503 Service Not Available  | There is a problem with the web service server. You can try this request again later.                                                                                                                                                                                             |

### Example using curl

```bash
curl -H "Content-Type: application/json"                \
     --user 1:foo                                       \
     -X POST                                            \
     -v                                                 \
     -d '{"ip_address":"1.2.3.4","tag":"suspected_fraud","transaction_id":"1"}' \
     https://minfraud.maxmind.com/minfraud/v2.0/transactions/report
```
