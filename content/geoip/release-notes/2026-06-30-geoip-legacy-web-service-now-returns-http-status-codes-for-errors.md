+++
title = 'GeoIP Legacy web service now returns HTTP status codes for errors'
date = 2026-06-30T16:00:00Z
draft = false
legacy_anchor = 'geoip-legacy-web-service-now-returns-http-status-codes-for-errors'
+++

The GeoIP Legacy web service now returns meaningful HTTP status codes for error
conditions, so you can act on them in your monitoring or an internal proxy,
without parsing the response body:

- `400 Bad Request` for a malformed request
- `401 Unauthorized` for a missing or invalid license key
- `402 Payment Required` when your account is out of queries
- `403 Forbidden` when your account does not have permission to use the service
- `5xx` for a server error

The response body and its error-code strings are unchanged. The `IP_NOT_FOUND`
case continues to return a `200 OK` status to avoid breaking existing
integrations.

[See the GeoIP Legacy documentation for details.](/geoip/docs/web-services/legacy/#http-status-codes)
