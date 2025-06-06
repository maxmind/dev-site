---
draft: false
title: Working with Transaction Dispositions
---

With minFraud Interactive, customers can create Custom Rules that are used to
assign a disposition to every transaction received in a minFraud request. Custom
Rules can set a transaction’s disposition to `accept`, `reject`, or
`manual_review`. For more information on Custom Rules and Dispositions, see the
documentation on our
[knowledge base](https://support.maxmind.com/hc/en-us/articles/4408801942811-Use-Custom-Rules-and-Dispositions).

After transactions are received, customers can use the account portal to review
all transactions dispositioned as `manual_review`. Transactions can then either
be `accept`ed or `reject`ed, and/or have a note added.
[Learn how to use the account portal to do manual review on our knowledge base.](https://support.maxmind.com/hc/en-us/articles/4408762136603-Review-a-minFraud-Transaction).
In order for these manual updates made in the account portal to be useful, they
need to find their way back into customers’ systems. The Dispositions API allows
customers to get a list of the manual updates and notes made to their
transactions.

**You only need to implement the Dispositions API if you (1) use the account
portal to make manual changes to dispositions, and (2) require those changes to
propagate to your own system.**

## Making a disposition request

To make a disposition request, you need the request URI and parameters, and
[your MaxMind account ID and license key](https://www.maxmind.com/en/accounts/current/license-key).

### Request URI and parameters

API calls should be made with HTTP GET request to
`https://minfraud.maxmind.com/minfraud/disposition/v1.0/updates`.

We require a URL parameter called `updates_after` with an RFC 3339 timestamp
value. This value is an exclusive lower bound for the updates; only updates made
after this time will be returned.

For example, to get updates after March 15, 2021 at 9 AM UTC, your request would
look like:
`https://minfraud.maxmind.com/minfraud/disposition/v1.0/updates?updates_after=2021-03-15T09:00:00.00000Z`

### Authorization and Security

The HTTP Authorization header is required for authorization. The username is
your
[MaxMind account ID](https://www.maxmind.com/en/accounts/current/license-key).
The password is your
[MaxMind license key](https://www.maxmind.com/en/accounts/current/license-key).
The authorization realm is `minfraud`.

{{< alert warning >}}
  You must be approved for a trial or purchase credit for use with our web
  services in order to receive an account ID and license key.
{{</ alert >}}

We use basic HTTP authentication. The APIs which require authentication are only
available via HTTPS. The credentials are never transmitted unencrypted. If you
attempt to access this service via HTTP, you will receive a `403 Forbidden` HTTP
response.

### Request headers

The `Accept` header for a request is entirely optional. If you do include one,
you must accept one of the following:

- `application/json`
- `application/vnd.maxmind.com-disposition-updates+json`
- `application/vnd.maxmind.com-disposition-updates+json; charset=UTF-8; version=1.0`

If you set the `Accept-Charset` header in your client code, you must accept the
`UTF-8` character set. If you don't you will receive a `406 Not Acceptable`
response.

### Command Line Example Using curl

This example will get updates after March 15, 2021 at 9AM UTC. Please replace
`{account_id}` and `{license_key}` with your
[account ID and license key](https://www.maxmind.com/en/accounts/current/license-key)

```bash
curl -u "{account_id}:{license_key}" \
  https://minfraud.maxmind.com/minfraud/disposition/v1.0/updates\?updates_after\=2021-03-15T09:00:00.00000Z
```

## Response to successful requests

### Headers (successful)

The `Content-Type` header for a successful response is
`application/vnd.maxmind.com-disposition-updates+json; charset=UTF-8; version=1.0`.

A `Content-Length` header will be provided.

### Body (successful)

Data will be returned as a JSON document in UTF-8 encoding. The document will
include two keys: `last_update_timestamp` and `updates`.

The `last_update_timestamp` value provides the relevant timestamp the last
returned transaction was sorted by, in RFC 3339 format (NB: this value is not
necessarily the earlier of the `*_last_updated` keys of the last included
transaction; this is why it’s being provided explicitly).

The `updates` value provides an array of transactions for which the disposition
and/or note have been manually updated, or, the transaction’s manual review
period has expired. The transactions will be sorted from least recently updated
to most recently updated, using the earliest updated timestamp (either the
disposition or note) after the `updates_after` time for each transaction.

At most, 1000 updated transactions will be returned for any single request.
These will be the earliest updated transactions after the provided
`updates_after` timestamp, not the most recent. For each repeated request, the
`updates_after` request value should be replaced with the
`last_update_timestamp` value returned from the previous request.

Each transaction in the updates array will contain the following keys:

| Key                   | Value Type | Description                                                                                                                                                                                                                               |
| --------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `minfraud_id`         | UUID       | The transaction’s unique identifier.                                                                                                                                                                                                      |
| `action`              | String     | The most recent transaction disposition action. In addition to `accept`, `reject`, and `manual_review`, you may also see `expired_review`, which indicates the manual review period (1 week) expired before the transaction was reviewed. |
| `action_last_updated` | Timestamp  | The date and time the disposition action was last updated, in RFC 3339 format with microsecond precision.                                                                                                                                 |
| `note`                | String     | The most recent transaction note. Limited to 500 characters. Will be `null` if not currently set.                                                                                                                                         |
| `note_last_updated`   | Timestamp  | The date and time the note was last updated, in RFC 3339 format with microsecond precision. If a note has never been set, this will be `null`                                                                                             |

As a note to implementers, we are considering adding additional keys to this
object in future versions of this API.

### Example response to a successful request

```json
{
  "last_update_timestamp": "2017-03-15T22:06:56.848123Z",
  "updates": [
    {
      "minfraud_id": "deadbeef-0000-0000-0000-00000000",
      "action": "accept",
      "action_last_updated": "2017-03-14T22:04:01.04425Z",
      "note": null,
      "note_last_updated": null
    },
    {
      "minfraud_id": "deadbeef-0000-0000-0000-00000002",
      "action": "reject",
      "action_last_updated": "2017-03-14T21:39:57.854300Z",
      "note": null,
      "note_last_updated": "2017-03-15T11:37:42.83235Z"
    },
    {
      "minfraud_id": "deadbeef-0000-0000-0000-00000003",
      "action": "manual_review",
      "action_last_updated": "2017-03-04T20:14:42.757200Z",
      "note": null,
      "note_last_updated": "2017-03-05T16:52:31.995250Z"
    },
    {
      "minfraud_id": "deadbeef-0000-0000-0000-00000020",
      "action": "manual_review",
      "action_last_updated": "2017-03-15T22:04:11.044250Z",
      "note": "Panda, can you check this out?",
      "note_last_updated": "2017-03-15T22:04:25.828250Z"
    },
    {
      "minfraud_id": "deadbeef-0000-0000-0000-00000030",
      "action": "accept",
      "action_last_updated": "2017-03-15T22:05:42.954231Z",
      "note": "Customer was traveling abroad.",
      "note_last_updated": "2017-03-15T22:05:58.132423Z"
    },
    {
      "minfraud_id": "deadbeef-0000-0000-0000-00000050",
      "action": "expired_review",
      "action_last_updated": "2017-03-15T22:06:22.492945Z",
      "note": "Customer didn't answer several phone calls.",
      "note_last_updated": "2017-03-15T22:06:56.848123Z"
    }
  ]
}
```

## Response to unsuccessful requests

### Headers (unsuccessful)

The `Content-Type` header for an unsuccessful response is
`application/vnd.maxmind.com-error+json; charset=UTF-8; version=1.0`.

A `Content-Length` header will be provided.

### Body (unsuccessful)

In the event an error occurs (the response indicates a 4xx or 5xx HTTP status),
the response may include a JSON document in the body. An error in content
negotiation will not include a body, nor will many 5xx errors, which typically
happen outside of our web service handling code. Before attempting to decode the
body as JSON, you should verify that the `Content-Type` of the error response is
`application/vnd.maxmind.com-error+json; charset=UTF-8; version=1.0`.

If the JSON document is included in the response body, it will be a single
object with the keys `code` and `error`. The `code` field is a static error code
for machine use. The value of any given `code` will never change, though `code`s
can be added or removed. The `error` field is a human-readable description of
the error and may change at any time.

In addition to the errors documented below, client code should also be prepared
to handle any valid HTTP 4xx or 5xx status code.

| Code                   | HTTP Status                | Error                                                                                                                                                                                    |
| ---------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UPDATES_AFTER_REQUIRED | 400 Bad Request            | You have not supplied the `updates_after` URI parameter.                                                                                                                                 |
| TIMESTAMP_INVALID      | 400 Bad Request            | The `updates_after` field must be in RFC 3339 format.                                                                                                                                    |
| PARAMETER_UNKNOWN      | 400 Bad Request            | You have supplied one or more parameters which are not used by this endpoint.                                                                                                            |
| AUTHORIZATION_INVALID  | 401 Unauthorized           | You have supplied an invalid [MaxMind account ID and/or license key](https://www.maxmind.com/en/accounts/current/license-key) in the [Authorization](#authorization-and-security) header.              |
| LICENSE_KEY_REQUIRED   | 401 Unauthorized           | You have not supplied a [MaxMind license key](https://www.maxmind.com/en/accounts/current/license-key) in the [Authorization](#authorization-and-security) header.                                     |
| ACCOUNT_ID_REQUIRED    | 401 Unauthorized           | You have not supplied a [MaxMind account ID](https://support.maxmind.com/hc/en-us/articles/4412951066779-Find-my-Account-ID) in the [Authorization](#authorization-and-security) header. |
| PERMISSION_REQUIRED    | 403 Forbidden              | You do not have permission to use the service. Please [contact our support team](https://support.maxmind.com/hc/en-us/requests/new) for more information.                                                                                  |
| (none)                 | 406 Not Acceptable         | Your request included an `Accept-Charset` header that is not supported. `UTF-8` is the only acceptable character set.                                                                    |
| (none)                 | 415 Unsupported Media Type | Your request included an `Accept` header that is not supported. The web service cannot return content of that type.                                                                      |
| (none)                 | 503 Service Not Available  | There is a problem with the web service server. You can try this request again later.                                                                                                    |

### Example response to an unsuccessful request

```json
{
  "code": "ACCOUNT_ID_REQUIRED",
  "error": "You have not supplied a MaxMind account ID in the Authorization header"
}
```
