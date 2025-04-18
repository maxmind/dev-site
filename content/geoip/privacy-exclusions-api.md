---
draft: false
title: Privacy Exclusions API
---

MaxMind maintains a list of Do Not Sell My Personal Information requests. This
API provides a simple way to retrieve
[privacy exclusion requests](https://www.maxmind.com/en/accounts/current/do-not-sell-requests)
in an automated fashion.

## Request

### Request URI

API calls should be made with HTTP GET request to:
`https://api.maxmind.com/privacy/exclusions`

### Authorization/Security

We use
[basic HTTP authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).
The HTTP `Authorization` header is required for authorization. The username is
your
[MaxMind account ID](https://www.maxmind.com/en/accounts/current/license-key).
The password is your
[MaxMind license key](https://www.maxmind.com/en/accounts/current/license-key).
The authorization realm is `privacy-exclusion`.

The API is only available via HTTPS. The credentials are never transmitted
unencrypted. If you attempt to access this service via HTTP, you will receive a
`403 Forbidden` HTTP response.

We require TLS 1.2 or greater for all requests to our servers to keep your data
secure.

### Request Parameters

The query string may include the following parameter:

| Key             | Value Type         | Description                                                                                                                                                                         |
| --------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `updates_after` | RFC 3339 timestamp | If set, only updates made after this time will be returned. The value should be a valid [RFC 3339 timestamp](https://tools.ietf.org/html/rfc3339), e.g., `2020-04-12T23:20:50.52Z`. |

#### Example Request URL

`https://api.maxmind.com/privacy/exclusions?updates_after=2020-04-12T23:20:50.52Z`

## Response

### Response Headers

The `Content-Type` header will vary based on whether the request was successful
or not, and is detailed further in each of the two Response Body sections below.

The response will always include a `Content-Length` header.

### Response Body (for successful requests)

#### Example

```json
{
    "exclusions": [
        {
            "exclusion_type": "ccpa_do_not_sell",
            "data_type": "network",
            "value": "10.0.26.166/32",
            "last_updated":"2020-01-08T18:58:38Z"
        },
        ...
    ]
}
```

#### Description

The `Content-Type` header for a successful response will be
`application/vnd.maxmind.com-privacy-exclusions+json; charset=UTF-8; version=1.0`

Data will be returned as a JSON document in UTF-8 encoding. The document will be
a JSON object including the `exclusions` key. Additional keys may be added in
the future.

The value for the `exclusions` key is an array of objects, each representing one
exclusion request.

Each exclusion object in the `exclusions` array includes the following keys:

| Key              | Value Type         | Description                                                                                                   |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `exclusion_type` | enum               | The governing law or rule that the exclusion was made under. Currently, the only valid type is `ccpa_do_not_sell` for the California Consumer Privacy Act’s “Do Not Sell My Personal Information” provision.                                                                                                                                                                                      |
| `data_type`      | enum               | The data type of the value being excluded. Currently, the only valid data type is `network`, which is an IP network in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation); all IP addresses in the specified network should be excluded. You should always check this before using the associated `value`. In the future, additional types may be added. |
| `value`          | string             | The value being excluded.                                                                                                                                                                                                                                                                                                                                                                         |
| `last_updated`   | RFC 3339 timestamp | The time of the last update to the exclusion as an [RFC 3339 timestamp](https://tools.ietf.org/html/rfc3339).                                                                                                                                                                                                                                                                                     |

Please note that additional keys may be added in the future.

### Response Body (for unsuccessful requests)

In the event an error occurs (the response indicates a 4xx or 5xx HTTP status),
the response may include a JSON document in the body. An error in content
negotiation will not include a body nor will many 5xx errors. Before attempting
to decode the body as JSON, you should verify that the `Content-Type` of the
error response is
`application/vnd.maxmind.com-error+json; charset=UTF-8; version=1.0`.

If the JSON document _is_ included in the response body, it will be an object
with the keys `code` and `error`. The `code` field is a static error code for
machine use. The value of any given `code` will never change, but `code`s can be
added or removed. The error field is a human-readable description of the error
and may change at any time.

In addition to the errors documented below, client code should also be prepared
to handle any valid HTTP 4xx or 5xx status code.

| Code Error            | HTTP Status               | Error Mode                                                                                                                                               |
| --------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TIMESTAMP_INVALID     | 400 Bad Request           | The `updates_after` field must be in [RFC 3339 format](https://tools.ietf.org/html/rfc3339).                                                             |
| AUTHORIZATION_INVALID | 401 Unauthorized          | Your [account ID or license key](https://www.maxmind.com/en/accounts/current/license-key) could not be authenticated.                                    |
| ACCOUNT_ID_REQUIRED   | 401 Unauthorized          | An [account ID and license key](https://www.maxmind.com/en/accounts/current/license-key) are required to use this service.                               |
| LICENSE_KEY_REQUIRED  | 401 Unauthorized          | An [account ID and license key](https://www.maxmind.com/en/accounts/current/license-key) are required to use this service.                               |
| PERMISSION_REQUIRED   | 403 Forbidden             | You do not have permission to use the service. Please [contact our support team](https://support.maxmind.com/hc/en-us/requests/new) for more information.                                                  |
| _(none)_              | 503 Service Not Available | There is a problem with the web service server. You can [check the status of our services](https://status.maxmind.com), or try this request again later. |

#### Example Response (for an unsuccessful request)

```json
{
    "code": "ACCOUNT_ID_REQUIRED",
    "error": "You have not supplied a MaxMind account ID in the Authorization header"
}
```
