+++
title = 'minFraud Legacy and Proxy Detection web services now return HTTP status codes for errors'
date = 2026-06-30T16:00:00Z
draft = false
legacy_anchor = 'minfraud-legacy-and-proxy-detection-web-services-now-return-http-status-codes-for-errors'
[build]
  list = 'never'
+++

The minFraud Legacy and Proxy Detection web services now return meaningful HTTP
status codes for error conditions, so you can act on them in your monitoring or
an internal proxy, without parsing the response body:

- `400 Bad Request` for a malformed request
- `401 Unauthorized` for a missing or invalid license key
- `402 Payment Required` when your account is out of queries
- `403 Forbidden` when your account does not have permission to use the service
- `5xx` for a server error

The response body and its error-code strings are unchanged, and a valid IP that
isn't in our database still returns a `200 OK` status (with a warning in the
response body). Note that Proxy Detection now returns `400 Bad Request` for a
malformed request, such as a missing or invalid IP address, that previously
returned `200 OK`.

[See the minFraud Legacy](/minfraud/minfraud-legacy/#http-status-codes) and
[Proxy Detection](/minfraud/proxy-detection/#http-status-codes) documentation
for details.
