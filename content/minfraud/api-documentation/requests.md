---
draft: false
title: minFraud API Requests
type: 'has-toc'
---

## Authorization and Security

The HTTP `Authorization` header is required for authorization. The username is
your
[MaxMind account ID](https://www.maxmind.com/en/accounts/current/license-key).
The password is your
[MaxMind license key](https://www.maxmind.com/en/accounts/current/license-key).

{{< alert warning >}} You must be approved for a trial or purchase credit for
use with our web services in order to receive an account ID and license key.
{{</ alert >}}

We use
[basic HTTP authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).
The APIs which require authentication are only available via HTTPS. The
credentials are never transmitted unencrypted. If you attempt to access this
service via HTTP, you will receive a `403 Forbidden` HTTP response.

We require TLS 1.2 or greater for all requests to our servers to keep your data
secure.

## Service Endpoints

The endpoint for each service is as specified below.

| Service  | HTTP Method | Endpoint                                              |
| -------- | ----------- | ----------------------------------------------------- |
| Score    | `POST`      | `https://minfraud.maxmind.com/minfraud/v2.0/score`    |
| Insights | `POST`      | `https://minfraud.maxmind.com/minfraud/v2.0/insights` |
| Factors  | `POST`      | `https://minfraud.maxmind.com/minfraud/v2.0/factors`  |

The **minfraud.maxmind.com** hostname automatically picks the data center
geographically closest to you.

## Headers

The `Authorization` header is always required. See
[Authorization and Security](#authorization-and-security) for more details.

The `Accept` header for a request is entirely optional. If you do include one,
you must accept one of the following, substituting the `[SERVICE-TYPE]` with
either `score`, `insights`, or `factors` as appropriate:

- `application/json`
- `application/vnd.maxmind.com-minfraud-[SERVICE-TYPE]+json`
- `application/vnd.maxmind.com-minfraud-[SERVICE-TYPE]+json; charset=UTF-8; version=2.0`

A request for any other MIME type will result in a `415 Unsupported Media Type`
error.

If you set the `Accept-Charset` header in your client code, you must accept the
`UTF-8` character set. If you don't, you will receive a `406 Not Acceptable`
response.

## Request Body

Currently minFraud Score, minFraud Insights, and minFraud Factors use the same
request document format. The request consists of a JSON object with one or more
of the fields shown below. Each key in the top-level object maps to an object or
array as described below. New fields that apply to one or more services may be added in
the future.

String fields are limited to no more than 255 valid Unicode characters unless a
shorter length is specified; the null and newline characters are forbidden. Of
course, many fields also have additional constraints that limit the length. For
example, the `ip_address` field cannot be longer than the longest valid
representation of an IPv6 address. Unless it must match a specific format, it is
valid for a string field to be empty.

Boolean fields must be provided as JSON `true` or `false`.

Unless otherwise specified, if the value meets the requirements for the field,
then it will not be modified. Beyond field-specific exceptions, an exception to
this is if the value is provided as a type different from what we require. In
such cases we convert it to the required type if possible. For example, if you
provide a string field as a number, then it will be converted to a string, and
vice versa. This conversion happens only between numbers and strings.

The entire request body is limited to 20,000 bytes. Requests larger than this
size will be rejected.

```json
{
  "account": {
    "user_id": "3132",
    "username_md5": "570a90bfbf8c7eab5dc5d4e26832d5b1"
  },
  "billing": {
    "address": "400 Blake St.",
    "address_2": "Suite 5",
    "city": "New Haven",
    "company": "Big Corp.",
    "country": "US",
    "first_name": "John",
    "last_name": "Doe",
    "phone_country_code": "1",
    "phone_number": "203-000-0000",
    "postal": "06511",
    "region": "CT"
  },
  "credit_card": {
    "avs_result": "Y",
    "bank_name": "Bank of America",
    "bank_phone_country_code": "1",
    "bank_phone_number": "800-342-1232",
    "country": "US",
    "cvv_result": "N",
    "issuer_id_number": "323132",
    "last_digits": "7643",
    "token": "OQRST14PLQ98323",
    "was_3d_secure_successful": true
  },
  "custom_inputs": {
    "a_custom_input_key": "NSC0083121",
    "another_custom_input_key": false
  },
  "device": {
    "accept_language": "en-US,en;q=0.8",
    "ip_address": "2001:db8::ff00:42:8329",
    "session_age": 3600.5,
    "session_id": "c2ffa1b7-f5c5-4702-beb2-4254794fe391",
    "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36"
  },
  "email": {
    "address": "977577b140bfb7c516e4746204fbdb01",
    "domain": "maxmind.com"
  },
  "event": {
    "party": "customer",
    "shop_id": "s2123",
    "time": "2012-04-12T23:20:50.52Z",
    "transaction_id": "txn3134133",
    "type": "purchase"
  },
  "order": {
    "affiliate_id": "af12",
    "amount": 323.21,
    "currency": "USD",
    "discount_code": "FIRST",
    "has_gift_message": false,
    "is_gift": true,
    "referrer_uri": "http://www.google.com/",
    "subaffiliate_id": "saf42"
  },
  "payment": {
    "decline_code": "card_declined",
    "method": "card",
    "processor": "stripe",
    "was_authorized": false
  },
  "shipping": {
    "address": "82 Wall St.",
    "address_2": "#1",
    "city": "New Haven",
    "company": "Smaller, Inc.",
    "country": "US",
    "delivery_speed": "same_day",
    "first_name": "Jane",
    "last_name": "Doe",
    "phone_country_code": "1",
    "phone_number": "203-000-0000",
    "postal": "06515",
    "region": "CT"
  },
  "shopping_cart": [
    {
      "category": "pets",
      "item_id": "ad23232",
      "price": 20.43,
      "quantity": 2
    },
    {
      "category": "beauty",
      "item_id": "bst112",
      "price": 100,
      "quantity": 1
    }
  ]
}
```

### Device

{{< anchor-target schema--request--device >}}

`device` is a JSON object that contains information about the device used in the
transaction.

```json
{
  "accept_language": "en-US,en;q=0.8",
  "ip_address": "2001:db8::ff00:42:8329",
  "session_age": 3600.5,
  "session_id": "c2ffa1b7-f5c5-4702-beb2-4254794fe391",
  "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="device" >}}
  {{< minfraud-schema-row key="ip_address" type="request" valueType="string" valueTypeNote="format: IPv4 or IPv6" >}}
  The IP address associated with the device used by the customer in the transaction. The IP address must be in IPv4 or IPv6 presentation format, i.e., dotted-quad notation or the IPv6 hexadecimal-colon notation.

  [Get tips for how to pass the /device/ip\_address input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/device-inputs-minfraud#ip-address)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="user_agent" type="request" valueType="string" valueTypeNote="max length: 512" >}}
  The HTTP `User-Agent` header of the browser used in the transaction.

  [Learn more about the /device/user\_agent input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/device-inputs-minfraud#browser-information)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="accept_language" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The HTTP `Accept-Language` header of the device used in the transaction.

  [Learn more about the /device/accept\_language input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/device-inputs-minfraud#browser-information)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="session_age" type="request" valueType="decimal" valueTypeNote="min: 0, max: 1e13-1" >}}
  The number of seconds between the creation of the user's session and the time of the transaction. Note that `session_age` is not the duration of the current visit, but the time since the start of the first visit.

  [Learn more about the /device/session\_age input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/device-inputs-minfraud#session-information)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="session_id" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  An ID that uniquely identifies a visitor's session on the site.

  [Learn more about the /device/session\_id input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/device-inputs-minfraud#session-information)
  {{</minfraud-schema-row>}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Event

{{< anchor-target schema--request--event >}}

`event` is a JSON object that contains general information related to the event being scored.

```json
{
  "party": "customer",
  "shop_id": "s2123",
  "time": "2012-04-12T23:20:50.52Z",
  "transaction_id": "txn3134133",
  "type": "purchase"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="event" >}}
  {{< minfraud-schema-row key="transaction_id" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  Your internal ID for the transaction. We can use this to locate a specific transaction in our logs, and it will also show up in email alerts and notifications from us to you. No specific format is required.

  [Learn more about the /event/transaction\_id input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/event-and-account-inputs-minfraud#transactor-identifier)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="shop_id" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  Your internal ID for the shop, affiliate, or merchant this order is coming from. Required for minFraud users who are resellers, payment providers, gateways, and affiliate networks. No specific format is required. However, if you are testing the minFraud service, please add a `test` prefix to your shop ID (e.g. `testfoo23` or `test:foo23`) or set your shop ID to `test` if you don’t have a shop ID.

  [Learn more about the /event/shop\_id input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/event-and-account-inputs-minfraud#storefront-identifier)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="time" type="request" valueType="string"  >}}
  The date and time the event occurred. The string must be in the [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) date-time format. The time must be within the past year. If this field is not in the request, the current time will be used.

  **It is not recommended to use this input when scoring live transactions as they occur.** However, it can be useful if you store transactions to be submitted to the service for scoring later.

  Please note that you cannot submit times more than one year in the past. If you submit an event time more than one year in the past, the current time will be used to score the transaction, and a warning will be returned.

  [Learn more about the /event/time input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/event-and-account-inputs-minfraud#transaction-time)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="type" type="request" valueType="string" valueTypeNote="format: enum" >}}

  The type of event being scored. The valid types are:

  | Transaction type | Description |
  | ---------------------------- | ------------------------------------------------------------------- |
  | `account_creation`         | The transactor is attempting to create an account in your system.    |
  | `account_login`    | The transactor is attempting to log in to an account in your system.  |
  | `credit_application`              | The transactor is attempting to submit an application for credit. |
  | `email_change`        | The transactor is attempting to change the email address associated with their account in your system. |
  | `fund_transfer`            | The transactor is attempting to transfer funds from one account to another. |
  | `password_reset` | The transactor is attempting to reset their password in your system.   |
  | `payout_change`  | The transactor is attempting to change how they will be paid in your system. The transactor may be sending you referral traffic or completing surveys, but this transaction type can be used in any circumstance in which you pay your users, and they are attempting to change how they are paid. |
  | `purchase`  | The transactor is attempting to make a purchase.  |
  | `recurring_purchase`  | The transactor is attempting to set up a recurring purchase or subscription. |
  | `referral`  | The transactor is sending you referral traffic, for example referring someone to an e-commerce site with an ad. |
  | `sim_swap`  | For mobile network operators. A new SIM card or eSIM is being issued to activate service on a customer's existing phone number. |
  | `survey`  | The transactor is attempting to begin or complete a survey. |


  [Learn more about the /event/type input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/event-and-account-inputs-minfraud#transaction-identifier)

  {{</minfraud-schema-row>}}
  {{< minfraud-schema-row key="party" type="request" valueType="string" valueTypeNote="format: enum" >}}
  The party submitting this transaction. The valid values are:

  * `agent`
  * `customer`
  {{</minfraud-schema-row>}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Account

{{< anchor-target schema--request--account >}}

`account` is a JSON object that contains account information for the end-user on
the site where the event took place.

```json
{
  "user_id": "3132",
  "username_md5": "570a90bfbf8c7eab5dc5d4e26832d5b1"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="account" >}}
  {{< minfraud-schema-row key="user_id" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  A unique user ID associated with the end-user in your system. If your system allows the login name for the account to be changed, this should not be the login name for the account, but rather should be an internal ID that does not change. This is not your MaxMind account ID. No specific format is required.

  [Learn more about the /account/user\_id input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/event-and-account-inputs-minfraud#transactor-identifier)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="username_md5" type="request" valueType="string" valueTypeNote="max length: 32" >}}
  An MD5 hash as a hexadecimal string of the username or login name associated with the account.
  {{</minfraud-schema-row>}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Email

`email` is a JSON object that contains information about the email address of
the end-user who initiated the event.

```json
{
  "address": "977577b140bfb7c516e4746204fbdb01",
  "domain": "maxmind.com"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="email" >}}
  {{< minfraud-schema-row key="address" type="request" valueType="string" valueTypeNote="max length: 255, type: Email or MD5 of Email" >}}
  This field must be either a valid email address or an MD5 of the email used in the transaction.

  [Learn more about the /email/address input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/passing-email-inputs-minfraud)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="domain" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The domain of the email address used in the transaction. Do not include the `@` in this field.

  You do not need to pass the email domain input unless you are passing the email address as an MD5 hash. [Learn more about hashed email inputs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/passing-email-inputs-minfraud#email-hashing)
  {{</minfraud-schema-row>}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Billing

{{< anchor-target schema--request--billing >}}

`billing` is a JSON object that contains the billing address and contact
information provided by the end-user who initiated the event.

[Learn more about the billing address inputs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/billing-and-shipping-inputs-minfraud#billing-address)

```json
{
  "address": "400 Blake St.",
  "address_2": "Suite 5",
  "city": "New Haven",
  "company": "Big Corp.",
  "country": "US",
  "first_name": "John",
  "last_name": "Doe",
  "phone_country_code": "1",
  "phone_number": "203-000-0000",
  "postal": "06511",
  "region": "CT"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="billing" >}}
  {{< minfraud-schema-row key="first_name" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The first name of the end user as provided in their billing information.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="last_name" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The last name of the end user as provided in their billing information.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="company" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The company of the end user as provided in their billing information.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="address" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The first line of the user's billing address.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="address_2" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The second line of the user's billing address.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="city" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The city of the user's billing address.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="region" type="request" valueType="string" valueTypeNote="max length: 4" >}}
  The [ISO 3166-2 subdivision code](https://en.wikipedia.org/wiki/ISO%5F3166-2) for the user's billing address.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="country" type="request" valueType="string" valueTypeNote="max length: 2" >}}
  The two-character [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO%5F3166-1%5Falpha-2) of the user's billing address.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="postal" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The postal code of the user's billing address.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="phone_number" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The phone number without the country code for the user's billing address. Punctuation characters will be stripped. After stripping punctuation characters, the number must contain only digits.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="phone_country_code" type="request" valueType="string" valueTypeNote="max length: 4" >}}
  The country code for the phone number associated with the user's billing address. If you provide this information then you must provide at least one digit.
  {{</minfraud-schema-row>}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Shipping

{{< anchor-target schema--request--shipping >}}

`shipping` is a JSON object that contains the shipping address and contact
information provided by the end-user who initiated the event.

[Learn more about the shipping address inputs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/billing-and-shipping-inputs-minfraud#shipping-address)

```json
{
  "address": "82 Wall St.",
  "address_2": "#1",
  "city": "New Haven",
  "company": "Smaller, Inc.",
  "country": "US",
  "delivery_speed": "same_day",
  "first_name": "Jane",
  "last_name": "Doe",
  "phone_country_code": "1",
  "phone_number": "203-000-0000",
  "postal": "06515",
  "region": "CT"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="shipping" >}}
  {{< minfraud-schema-row key="first_name" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The first name of the end user as provided in their shipping information.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="last_name" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The last name of the end user as provided in their shipping information.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="company" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The company of the end user as provided in their shipping information.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="address" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The first line of the user's shipping address.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="address_2" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The second line of the user's shipping address.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="city" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The city of the user's shipping address.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="region" type="request" valueType="string" valueTypeNote="max length: 4" >}}
  The [ISO 3166-2 subdivision code](https://en.wikipedia.org/wiki/ISO%5F3166-2) for the user's shipping address.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="country" type="request" valueType="string" valueTypeNote="max length: 2" >}}
  The two-character [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO%5F3166-1%5Falpha-2) of the user's shipping address.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="postal" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The postal code of the user's shipping address.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="phone_number" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The phone number without the country code for the user's shipping address. Punctuation characters will be stripped. After stripping punctuation characters, the number must contain only digits.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="phone_country_code" type="request" valueType="string" valueTypeNote="max length: 4" >}}
  The country code for the phone number associated with the user's shipping address. If you provide this information then you must provide at least one digit.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="delivery_speed" type="request" valueType="string" valueTypeNote="format: enum" >}}
  The shipping delivery speed for the order. The valid values are:

  * `same_day`
  * `overnight`
  * `expedited`
  * `standard`
  {{</minfraud-schema-row>}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Payment

{{< anchor-target schema--request--payment >}}

`payment` is a JSON object that contains information from and about the payment
process that was used for the event.

```json
{
  "decline_code": "card_declined",
  "method": "card",
  "processor": "stripe",
  "was_authorized": false
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="payment" >}}
  {{< minfraud-schema-row key="method" type="request" valueType="string" valueTypeNote="format: enum" >}}

  The payment method associated with the transaction. The valid values are:

  | Payment method | Description |
  | ---------------------------- | ------------------------------------------------------------------ |
  | `bank_debit`                | A direct debit of the customer's bank account.    |
  | `bank_redirect`    | The customer authorizes payment after authentication via their bank.  |
  | `bank_transfer`              | The customer pushes funds directly from their bank account.  |
  | `buy_now_pay_later`        | Payment via a buy now, pay later provider (e.g. Affirm, Afterpay, Klarna, etc.). |
  | `card`            | Payment by card, such as a credit, debit, or charge card.  |
  | `crypto` | Payment via a cryptocurrency.   |
  | `digital_wallet`  | Payment from a digital wallet linked to a card or bank account (e.g. Apple Pay, Google Pay, PayPal, etc.). |
  | `gift_card`  | Payment via a merchant-sponsored gift card.   |
  | `real_time_payment`  | The customer pushes funds directly from their bank account or other funding source using an intermediary to authenticate, such as a phone number or other account (e.g. Pix, PayNow, Swish, etc.).  |
  | `rewards`  | Payment via rewards or loyalty program incentives. |


  [Learn more about payment method inputs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/event-and-account-inputs-minfraud#payment-method-information)

  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="processor" type="request" valueType="string" valueTypeNote="format: enum" >}}
  The payment processor used for the transaction. The valid values are:

  <!-- cspell: disable -->

  * `adyen`
  * `affirm`
  * `afterpay`
  * `altapay`
  * `amazon_payments`
  * `american_express_payment_gateway`
  * `apple_pay`
  * `aps_payments`
  * `authorizenet`
  * `balanced`
  * `banquest`
  * `beanstream`
  * `bluepay`
  * `bluesnap`
  * `boacompra`
  * `boku`
  * `bpoint`
  * `braintree`
  * `cardknox`
  * `cardpay`
  * `cashfree`
  * `ccavenue`
  * `ccnow`
  * `cetelem`
  * `chase_paymentech`
  * `checkout_com`
  * `cielo`
  * `collector`
  * `commdoo`
  * `compropago`
  * `concept_payments`
  * `conekta`
  * `coregateway`
  * `creditguard`
  * `credorax`
  * `cryptomus`
  * `ct_payments`
  * `cuentadigital`
  * `curopayments`
  * `cybersource`
  * `dalenys`
  * `dalpay`
  * `datacap`
  * `datacash`
  * `dibs`
  * `digital_river`
  * `dlocal`
  * `dotpay`
  * `ebs`
  * `ecomm365`
  * `ecommpay`
  * `elavon`
  * `emerchantpay`
  * `epay`
  * `epayco`
  * `eprocessing_network`
  * `epx`
  * `eway`
  * `exact`
  * `first_atlantic_commerce`
  * `first_data`
  * `fiserv`
  * `g2a_pay`
  * `global_payments`
  * `gocardless`
  * `google_pay`
  * `heartland`
  * `hipay`
  * `ingenico`
  * `interac`
  * `internetsecure`
  * `intuit_quickbooks_payments`
  * `iugu`
  * `klarna`
  * `komoju`
  * `lemon_way`
  * `mastercard_payment_gateway`
  * `mercadopago`
  * `mercanet`
  * `merchant_esolutions`
  * `mirjeh`
  * `mollie`
  * `moneris_solutions`
  * `neopay`
  * `neosurf`
  * `nmi`
  * `oceanpayment`
  * `oney`
  * `onpay`
  * `openbucks`
  * `openpaymx`
  * `optimal_payments`
  * `orangepay`
  * `other`
  * `pacnet_services`
  * `payconex`
  * `payeezy`
  * `payfast`
  * `paygate`
  * `paylike`
  * `payment_express`
  * `paymentwall`
  * `payone`
  * `paypal`
  * `payplus`
  * `paysafecard`
  * `paysera`
  * `paystation`
  * `paytm`
  * `paytrace`
  * `paytrail`
  * `payture`
  * `payulatam`
  * `payvision`
  * `payu`
  * `payway`
  * `payza`
  * `pinpayments`
  * `placetopay`
  * `posconnect`
  * `princeton_payment_solutions`
  * `psigate`
  * `pxp_financial`
  * `qiwi`
  * `quickpay`
  * `raberil`
  * `razorpay`
  * `rede`
  * `redpagos`
  * `rewardspay`
  * `safecharge`
  * `sagepay`
  * `securepay`
  * `securetrading`
  * `shopify_payments`
  * `simplify_commerce`
  * `skrill`
  * `smartcoin`
  * `smartdebit`
  * `solidtrust_pay`
  * `sps_decidir`
  * `stripe`
  * `summit_payments`
  * `synapsefi`
  * `systempay`
  * `telerecargas`
  * `towah`
  * `transact_pro`
  * `trustly`
  * `trustpay`
  * `tsys`
  * `usa_epay`
  * `vantiv`
  * `verepay`
  * `vericheck`
  * `vindicia`
  * `virtual_card_services`
  * `vme`
  * `vpos`
  * `windcave`
  * `wirecard`
  * `worldpay`
  * `yaadpay`

  <!-- cspell: enable -->

  If your payment processor is missing from this list, please [contact our support team](https://support.maxmind.com/knowledge-base).
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="was_authorized" type="request" valueType="boolean"  >}}
  The authorization outcome from the payment processor. If the transaction has not yet been approved or denied, do not include this field.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="decline_code" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The decline code as provided by your payment processor. If the transaction was not declined, do not include this field.
  {{</minfraud-schema-row>}}
{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Credit Card

{{< anchor-target schema--request--credit-card >}}

`credit_card` is a JSON object that contains information provided by the
end-user and the payment processor about the credit card used for the event.

```json
{
  "avs_result": "Y",
  "bank_name": "Bank of America",
  "bank_phone_country_code": "1",
  "bank_phone_number": "800-342-1232",
  "country": "US",
  "cvv_result": "N",
  "issuer_id_number": "323132",
  "last_digits": "7643",
  "token": "OQRST14PLQ98323",
  "was_3d_secure_successful": true
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="credit_card" >}}

  {{< minfraud-schema-row key="issuer_id_number" type="request" valueType="string" valueTypeNote="max length: 8" >}}
  The issuer ID number for the credit card. This is the first six or eight digits of the credit card number. It identifies the issuing bank. If you do not know whether the IIN is six or eight digits long, send us six digits.

  [Learn more about the /credit\_card/issuer\_id\_number input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/credit-card-and-payments-inputs-minfraud#iin-bin)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="last_digits" type="request" valueType="string" valueTypeNote="max length: 4" >}}
  The last digits of the credit card number. In most cases, you should send the last four digits for `last_digits`. If you send an [issuer\_id\_number](#schema--request--credit-card%5F%5Fissuer%5Fid%5Fnumber) that contains an eight-digit IIN, and if the credit card brand is not one of the following, you should send the last two digits for `last_digits`: `Discover`, `JCB`, `Mastercard`, `UnionPay`, `Visa`.

  [Learn more about the /credit\_card/last\_digits input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/credit-card-and-payments-inputs-minfraud#partial-cc-numbers)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="token" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  A token uniquely identifying the card. The token should consist of non-space printable ASCII characters. If the token is all digits, it must be more than 19 characters long. The token must not be a primary account number (PAN) or a simple transformation of it. If you have a valid token that looks like a PAN but is not one, you may prefix that token with a fixed string, e.g., `token-`.

  [Learn more about the /credit\_card/token input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/credit-card-and-payments-inputs-minfraud#unique-tokens)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="bank_name" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The name of the issuing bank as provided by the end user.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="bank_phone_country_code" type="request" valueType="string" valueTypeNote="max length: 4" >}}
  The phone country code for the issuing bank as provided by the end user. If you provide this information then you must provide at least one digit.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="bank_phone_number" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The phone number, without the country code, for the issuing bank as provided by the end user. Punctuation characters will be stripped. After stripping punctuation characters, the number must contain only digits.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="country" type="request" valueType="string" valueTypeNote="max length: 2" >}}
  The two-character [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO%5F3166-1%5Falpha-2) where the issuer of the card is located. This may be passed instead of the [issuer\_id\_number](#schema--request--credit-card%5F%5Fissuer%5Fid%5Fnumber) if you do not wish to pass partial account numbers, or if your payment processor does not provide them.

  [Learn more about the /credit\_card/country input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/credit-card-and-payments-inputs-minfraud#card-issuer-country)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="avs_result" type="request" valueType="string" valueTypeNote="max length: 1" >}}
  The address verification system (AVS) check result, as returned to you by the credit card processor. The minFraud service supports the standard AVS codes.

  [Learn more about the /credit\_card/avs\_result input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/credit-card-and-payments-inputs-minfraud#payment-processor-information)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="cvv_result" type="request" valueType="string" valueTypeNote="max length: 1" >}}
  The card verification value (CVV) code as provided by the payment processor.

  [Learn more about the /credit\_card/cvv\_result input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/credit-card-and-payments-inputs-minfraud#payment-processor-information)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="was_3d_secure_successful" type="request" valueType="boolean"  >}}
  Whether the outcome of 3-D Secure verification (e.g. SafeKey, SecureCode, Verified by Visa) was successful. `true` if customer verification was successful, or `false` if the customer failed verification. If 3-D Secure verification was not used, was unavailable, or resulted in another outcome other than success or failure, do not include this field.

  [Learn more about the /credit\_card/was\_3d\_secure\_successful input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/credit-card-and-payments-inputs-minfraud#payment-processor-information)
  {{</minfraud-schema-row>}}

{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Order

{{< anchor-target schema--request--order >}}

`order` is a JSON object that contains information about the order associated
with the event.

```json
{
  "affiliate_id": "af12",
  "amount": 323.21,
  "currency": "USD",
  "discount_code": "FIRST",
  "has_gift_message": false,
  "is_gift": true,
  "referrer_uri": "http://www.google.com/",
  "subaffiliate_id": "saf42"
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="order" >}}

  {{< minfraud-schema-row key="amount" type="request" valueType="decimal" valueTypeNote="min: 0, max: 1e13-1" >}}
  The total order amount for the transaction before taxes and discounts.

  [Learn more about the /order/amount input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/order-and-shopping-cart-inputs-minfraud#order-amount)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="currency" type="request" valueType="string" valueTypeNote="max length: 3" >}}
  The [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO%5F4217) for the currency used in the transaction.

  [Learn more about the /order/currency input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/order-and-shopping-cart-inputs-minfraud#order-amount)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="discount_code" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The discount code applied to the transaction. If multiple discount codes were used, please separate them with a comma.

  [Learn more about the /order/discount\_code input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/order-and-shopping-cart-inputs-minfraud#discount-codes)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="affiliate_id" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The ID of the affiliate where the order is coming from. No specific format is required.

  [Learn more about the /order/affiliate\_id input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/order-and-shopping-cart-inputs-minfraud#affiliates-referrers)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="subaffiliate_id" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The ID of the sub-affiliate where the order is coming from. No specific format is required.

  [Learn more about the /order/subaffiliate\_id input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/order-and-shopping-cart-inputs-minfraud#affiliates-referrers)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="referrer_uri" type="request" valueType="string" valueTypeNote="max length: 1024" >}}
  The URI of the referring site for this order. Needs to be absolute and have a URI scheme such as `https://`.

  [Learn more about the /order/referrer\_uri input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/order-and-shopping-cart-inputs-minfraud#affiliates-referrers)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="is_gift" type="request" valueType="boolean"  >}}
  Whether the order was marked as a gift by the purchaser.

  [Learn more about the /order/is\_gift input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/order-and-shopping-cart-inputs-minfraud#gift-information)
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="has_gift_message" type="request" valueType="boolean"  >}}
  Whether the purchaser included a gift message.

  [Learn more about the /order/has\_gift\_message input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/order-and-shopping-cart-inputs-minfraud#gift-information)
  {{</minfraud-schema-row>}}

{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Shopping Cart

{{< anchor-target schema--request--shopping-cart >}}

`shopping_cart` is an array of shopping cart item objects.

Passing hashed values for shopping cart items can increase the privacy of your
customers' information while continuing to fulfill the needs for fraud
detection. A suitable hashed value can be produced by using a cryptographic hash
function and a fixed salt. Using a random salt is not recommended as that will
result in different hashed values for the same plain value, which would make
them ineffective for our fraud detection service. For more information, see:

- [OWASP Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)
- [NIST FIPS Secure Hash Standard (SHS)](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf)

[Learn more about the shopping cart inputs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/order-and-shopping-cart-inputs-minfraud#shopping-cart-contents)

```json
[
  {
    "category": "pets",
    "item_id": "ad23232",
    "price": 20.43,
    "quantity": 2
  },
  {
    "category": "beauty",
    "item_id": "bst112",
    "price": 100,
    "quantity": 1
  }
]
```

<!-- prettier-ignore-start -->

{{< schema-table key="shopping_cart" >}}
  {{< minfraud-schema-row key="category" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  The category of the item. This can also be a hashed value; see above.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="item_id" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  Your internal ID for the item. No specific format is required. This can also be a hashed value; see above.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="quantity" type="request" valueType="integer" valueTypeNote="min: 0, max: 1e13-1" >}}
  The quantity of the item in the shopping cart. The value must be a whole number.
  {{</minfraud-schema-row>}}

  {{< minfraud-schema-row key="price" type="request" valueType="decimal" valueTypeNote="min: 0, max: 1e13-1" >}}
  The per-unit price of this item in the shopping cart. This should use the same currency as the order currency.
  {{</minfraud-schema-row>}}

{{</ schema-table >}}

<!-- prettier-ignore-end -->

### Custom Inputs

{{< anchor-target schema--request--custom-inputs >}}

`custom_inputs` are optional inputs to the minFraud service that must first be
defined for your account. Select Custom Inputs from the Account Portal in order
to do so. See our
[Custom Inputs documentation](https://support.maxmind.com/knowledge-base/articles/use-custom-inputs-minfraud)
for more information.

**You should never send a full credit card number as an input.** If you attempt
to send a full credit card number as an input, the minFraud service will reject
the input and issue a warning.

[Learn more about valid payment number inputs above.](#schema--request--credit-card)

```json
{
  "a_custom_input_key": "NSC0083121",
  "another_custom_input_key": false
}
```

<!-- prettier-ignore-start -->

{{< schema-table key="custom_inputs" >}}

  {{< minfraud-schema-row key="your_custom_BOOLEAN_key" type="request" valueType="boolean"  >}}
  A custom key of your choice with a boolean value.
  {{</minfraud-schema-row>}}


  {{< minfraud-schema-row key="your_custom_FLOAT_NUMBER_key" type="request" valueType="float" valueTypeNote="min: -1e13+1, max: 1e13-1" >}}
  A custom key of your choice with a floating-point number value.
  {{</minfraud-schema-row>}}


  {{< minfraud-schema-row key="your_custom_PHONE_NUMBER_key" type="request" valueType="string" valueTypeNote="format: Phone number, max length: 255" >}}
  A custom key of your choice with a string value, formatted as a phone number. Numbers, spaces and punctuation accepted, although spaces and punctuation will be stripped. The following ASCII characters constitute the accepted punctuation: \` \~ ! @ # $ % ^ & \* ( ) - \_ = + ' " ; : , < . > / ? \\ | \[ \] { and }.
  {{</minfraud-schema-row>}}


  {{< minfraud-schema-row key="your_custom_STRING_key" type="request" valueType="string" valueTypeNote="max length: 255" >}}
  A custom key of your choice with a string value. The null character is not allowed.
  {{</minfraud-schema-row>}}

{{</ schema-table >}}

<!-- prettier-ignore-end -->
