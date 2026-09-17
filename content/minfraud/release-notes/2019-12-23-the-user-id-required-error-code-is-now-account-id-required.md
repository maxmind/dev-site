+++
title = 'The USER_ID_REQUIRED error code is now ACCOUNT_ID_REQUIRED'
date = 2019-12-23T16:00:00Z
draft = false
legacy_anchor = 'the-user_id_required-error-code-is-now-account_id_required'
[build]
  list = 'never'
+++

Our web services, including
[GeoIP web services](https://www.maxmind.com/en/geoip-api-web-services) and
[minFraud services](https://www.maxmind.com/en/solutions/fraud-prevention/overview),
now return the error code `ACCOUNT_ID_REQUIRED` instead of `USER_ID_REQUIRED`
when the account ID parameter is missing.
