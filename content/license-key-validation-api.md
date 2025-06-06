---
draft: false
title: License Key Validation API
---

MaxMind provides a License Key Validation API, a tool for developers and
organizations seeking to verify the validity of MaxMind license keys within
their systems. This API endpoint is designed to check the existence and the
format of a license key. It does not provide information about the license key's
access to MaxMind products or the account to which it is associated. Using other
endpoints to check for the validity of a license key would fail as accounts have
access to particular services only.

You can use this API for building tools to scan your code for secrets to ensure
that secrets are not published in improper locations. One example of such a tool
is [trufflehog](https://github.com/trufflesecurity/trufflehog). Using such a
tool, you can prevent license keys accidentally ending up in unexpected places
and enhance the security of your applications.

## Request

### Request URI

API calls should be made with an HTTP POST request to:

`https://secret-scanning.maxmind.com/secrets/validate-license-key`

### Authorization/Security

There is no authorization needed for this endpoint. The request is made using
the license key itself.

### Request Body

The Content Type of the request must be `application/x-www-form-urlencoded`. No
other content types are accepted at the moment.

The request body may include the following field:

| Key           | Value Type | Description                                                                       |
| ------------- | ---------- | --------------------------------------------------------------------------------- |
| `license_key` | string     | The `license_key` field should contain the license key that you want to validate. |

Here is an example of how to make the request using curl:

```bash
curl https://secret-scanning.maxmind.com/secrets/validate-license-key \
    -d "license_key=your_license_key_here"
```

Please replace "your_license_key_here" with the actual license key you want to
validate.

## Response

HTTP status codes are used to relay success and error messages. A successful
POST will return a 204 (No Content) status code.

When the server returns an error (4xx or 5xx), the response may include a JSON
document in the body. This document is a single object with the keys `code` and
`error`. The `code` field is a static error code for machine use. The value of
any given code will never change, though codes can be added or removed. The
`error` field is a human-readable description of the error and may change at any
time.

### Response Body (for successful requests)

When the license key is successfully validated, the server will return a status
of `204 No Content`.

### Response Body (for unauthorized license keys)

When the license key is in the correct format but could not be validated in our
database, the server will return a JSON object with the following structure:

```json
{
  "code": "AUTHORIZATION_INVALID",
  "error": "Your account ID or license key could not be authenticated."
}
```

The HTTP status will be `401 Unauthorized`.

### Response Body (for unsuccessful requests)

In the event of an error occurring such as a bad request that has a license key
with a bad format, the server will return a JSON object with the following
structure:

```json
{
  "code": "LICENSE_KEY_INVALID",
  "error": "'foo-bad-license-key' is not a valid license_key when calling /secrets/validate-license-key"
}
```

The HTTP status will be a `400 Bad Request`.
