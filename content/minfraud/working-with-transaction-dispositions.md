+++
draft = false
title = 'Working with Transaction Dispositions'
+++

With minFraud Interactive, customers can create Custom Rules that are used to
assign a disposition to every transaction received in a minFraud request. Custom
Rules can set a transaction’s disposition to `accept`, `reject`, or
`manual_review`. For more information on Custom Rules and Dispositions, see the
documentation on our
[knowledge base](https://support.maxmind.com/knowledge-base/articles/use-custom-rules-and-dispositions-minfraud-maxmind).

After transactions are received, customers can use the account portal to review
all transactions dispositioned as `manual_review`. Transactions can then either
be `accept`ed or `reject`ed, and/or have a note added.
[Learn how to use the account portal to do manual review on our knowledge base.](https://support.maxmind.com/knowledge-base/articles/review-a-minfraud-transaction).
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

For a machine-readable description of the Dispositions API's request parameters
and responses, see the
[minFraud OpenAPI specification](https://github.com/maxmind/openapi/blob/main/bundled/minfraud.yaml)
([raw file](https://raw.githubusercontent.com/maxmind/openapi/main/bundled/minfraud.yaml)).

### Request URI and parameters

API calls should be made with an HTTP GET request to
`https://minfraud.maxmind.com/minfraud/disposition/v1.0/updates`.

Each request needs one of these URL parameters:

- `updates_after`: an RFC 3339 timestamp. It is an exclusive lower bound for the
  updates. MaxMind returns only updates made after this time. Send it on your
  first request.
- `cursor`: the `next_cursor` value from the previous response. MaxMind returns
  the updates after the position that `next_cursor` marks. Send it on every
  later request.

Send `updates_after` or `cursor`, not both.

URL-encode the `updates_after` value. If it has a `+` offset, send it as `%2B`,
or the service reads the `+` as a space and rejects the timestamp.

For example, to get updates after March 15, 2021 at 9 AM UTC, your request would
look like:
`https://minfraud.maxmind.com/minfraud/disposition/v1.0/updates?updates_after=2021-03-15T09:00:00.00000Z`

To get the next page, send the `next_cursor` value from the previous response:
`https://minfraud.maxmind.com/minfraud/disposition/v1.0/updates?cursor=00054acc27a57911deadbeef000000000000000000000050`

### Authorization and Security

The HTTP Authorization header is required for authorization. The username is
your
[MaxMind account ID](https://www.maxmind.com/en/accounts/current/license-key).
The password is your
[MaxMind license key](https://www.maxmind.com/en/accounts/current/license-key).
The authorization realm is `minfraud-disposition`.

{{< alert warning >}} You must be approved for a trial or purchase credit for
use with our web services in order to receive an account ID and license key.
{{</ alert >}}

We use basic HTTP authentication. The APIs which require authentication are only
available via HTTPS. Always use HTTPS, so that your credentials are never
transmitted unencrypted. If you attempt to access this service via HTTP, you
will receive a `403 Forbidden` HTTP response.

### Request headers

The `Accept` and `Accept-Charset` headers are optional. The service ignores them
and always returns JSON encoded as UTF-8.

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
include three keys: `last_update_timestamp`, `next_cursor`, and `updates`.

The `last_update_timestamp` value provides the relevant timestamp the last
returned transaction was sorted by, in RFC 3339 format (NB: this value is not
necessarily the earlier of the `*_last_updated` keys of the last included
transaction; this is why it’s being provided explicitly). If `updates` is empty,
this is the time of your `updates_after` value, or the `last_update_timestamp`
of the response that gave you the `cursor`.

The `next_cursor` value is an opaque string that marks the position of the last
transaction in `updates`. If `updates` is empty, it is the position of your
request. Send it as `cursor` in your next request. Do not parse or build this
value.

The `updates` value provides an array of transactions for which the disposition
and/or note have been manually updated, or, the transaction’s manual review
period has expired. The transactions will be sorted from least recently updated
to most recently updated, using the earliest updated timestamp (either the
disposition or note) after the request's position (the `updates_after` time, or
the point that `cursor` marks) for each transaction.

A response holds the earliest updated transactions after the request's position,
not the most recent. To get all of the updates:

1. Send `updates_after` with the time from which you want updates.
2. Send the `next_cursor` value from each response as `cursor` in your next
   request.
3. When `updates` is empty, you have received all of the updates available now.
   An update becomes available one minute or more after it happens. Send the
   response's `next_cursor` value later to check for more.

A response to a `cursor` request holds at most 1000 updated transactions.
MaxMind can change this number. A response to an `updates_after` request can
hold more, because it holds every update that shares its last timestamp.

If you page by sending `last_update_timestamp` as `updates_after`, your requests
keep working. To change to `cursor`, send your stored `last_update_timestamp` as
`updates_after` once, then follow the steps above.

Once you use `cursor`, store `next_cursor` as your position, not
`last_update_timestamp`. Several updates can have the same timestamp, and a
`cursor` response can hold only some of them. For example, if three updates
share the response's `last_update_timestamp` and the response holds one, a
request with that value as `updates_after` never returns the other two.

A transaction can appear in more than one response. For example, if its note
changes after its disposition, it appears once for the disposition update and
again for the note update. Process updates so that handling one again has no
further effect.

Each transaction in the updates array will contain the following keys:

| Key                   | Value Type | Description                                                                                                                                                                                                                                                                                                       |
| --------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `minfraud_id`         | UUID       | The transaction’s unique identifier.                                                                                                                                                                                                                                                                              |
| `action`              | String     | The most recent transaction disposition action. In addition to `accept`, `reject`, and `manual_review`, you may also see `expired_review`, which indicates the manual review period (1 week) expired before the transaction was reviewed. Will be `null` if the transaction has a note update but no disposition. |
| `action_last_updated` | Timestamp  | The date and time the disposition action was last updated, in RFC 3339 format with microsecond precision. Will be `null` if the transaction has no disposition.                                                                                                                                                   |
| `note`                | String     | The most recent transaction note. Limited to 500 characters. Will be `null` if not currently set.                                                                                                                                                                                                                 |
| `note_last_updated`   | Timestamp  | The date and time the note was last updated, in RFC 3339 format with microsecond precision. If a note has never been set, this will be `null`.                                                                                                                                                                    |

As a note to implementers, we are considering adding additional keys to this
object in future versions of this API.

### Example response to a successful request

```json
{
  "last_update_timestamp": "2017-03-15T22:06:22.492945Z",
  "next_cursor": "00054acc27a57911deadbeef000000000000000000000050",
  "updates": [
    {
      "minfraud_id": "deadbeef-0000-0000-0000-000000000003",
      "action": "manual_review",
      "action_last_updated": "2017-03-04T20:14:42.757200Z",
      "note": null,
      "note_last_updated": "2017-03-05T16:52:31.995250Z"
    },
    {
      "minfraud_id": "deadbeef-0000-0000-0000-000000000002",
      "action": "reject",
      "action_last_updated": "2017-03-14T21:39:57.854300Z",
      "note": null,
      "note_last_updated": "2017-03-15T11:37:42.83235Z"
    },
    {
      "minfraud_id": "deadbeef-0000-0000-0000-000000000000",
      "action": "accept",
      "action_last_updated": "2017-03-14T22:04:01.04425Z",
      "note": null,
      "note_last_updated": null
    },
    {
      "minfraud_id": "deadbeef-0000-0000-0000-000000000020",
      "action": "manual_review",
      "action_last_updated": "2017-03-15T22:04:11.044250Z",
      "note": "Panda, can you check this out?",
      "note_last_updated": "2017-03-15T22:04:25.828250Z"
    },
    {
      "minfraud_id": "deadbeef-0000-0000-0000-000000000030",
      "action": "accept",
      "action_last_updated": "2017-03-15T22:05:42.954231Z",
      "note": "Customer was traveling abroad.",
      "note_last_updated": "2017-03-15T22:05:58.132423Z"
    },
    {
      "minfraud_id": "deadbeef-0000-0000-0000-000000000050",
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
the response may include a JSON document in the body. Many 5xx errors, which
typically happen outside of our web service handling code, do not include one.
Before attempting to decode the body as JSON, you should verify that the
`Content-Type` of the error response is
`application/vnd.maxmind.com-error+json; charset=UTF-8; version=1.0`.

If the JSON document is included in the response body, it will be a single
object with the keys `code` and `error`. The `code` field is a static error code
for machine use. The value of any given `code` will never change, though `code`s
can be added or removed. The `error` field is a human-readable description of
the error and may change at any time.

In addition to the errors documented below, client code should also be prepared
to handle any valid HTTP 4xx or 5xx status code.

| Code                              | HTTP Status               | Error                                                                                                                                                                                      |
| --------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| UPDATES_AFTER_REQUIRED            | 400 Bad Request           | You have not supplied the `updates_after` or `cursor` URI parameter.                                                                                                                       |
| TIMESTAMP_INVALID                 | 400 Bad Request           | The `updates_after` field must be in RFC 3339 format.                                                                                                                                      |
| CURSOR_INVALID                    | 400 Bad Request           | The `cursor` value is not valid. Send a `next_cursor` value from a previous response.                                                                                                      |
| CURSOR_AND_UPDATES_AFTER_PROVIDED | 400 Bad Request           | You have supplied both the `updates_after` and `cursor` URI parameters. Send only one.                                                                                                     |
| AUTHORIZATION_INVALID             | 401 Unauthorized          | You have supplied an invalid [MaxMind account ID and/or license key](https://www.maxmind.com/en/accounts/current/license-key) in the [Authorization](#authorization-and-security) header.  |
| LICENSE_KEY_REQUIRED              | 401 Unauthorized          | You have not supplied a [MaxMind license key](https://www.maxmind.com/en/accounts/current/license-key) in the [Authorization](#authorization-and-security) header.                         |
| ACCOUNT_ID_REQUIRED               | 401 Unauthorized          | You have not supplied a [MaxMind account ID](https://support.maxmind.com/knowledge-base/articles/find-your-maxmind-account-id) in the [Authorization](#authorization-and-security) header. |
| PERMISSION_REQUIRED               | 403 Forbidden             | You do not have permission to use the service. Please [contact our support team](https://support.maxmind.com/knowledge-base) for more information.                                         |
| (none)                            | 429 Too Many Requests     | MaxMind rate-limited the request, usually because of excessive earlier error responses. The response may not include a JSON body.                                                          |
| SERVER_ERROR                      | 500 Internal Server Error | There was an error when processing this request.                                                                                                                                           |
| (none)                            | 503 Service Unavailable   | There is a problem with the web service server. You can try this request again later.                                                                                                      |

### Example response to an unsuccessful request

```json
{
  "code": "ACCOUNT_ID_REQUIRED",
  "error": "An account ID and license key are required to use this service."
}
```
