+++
title = 'Retirement of legacy IIN (BIN) API service'
date = 2019-08-05T16:00:00Z
draft = false
legacy_anchor = 'retirement-of-legacy-iin-bin-api-service'
+++

We are discontinuing the legacy IIN (BIN) API on **January 31, 2020** in order
to focus development and maintenance efforts on our core services. This means
that the service will no longer function if you are querying the URL below:
[https://minfraud.maxmind.com/app/bin_http](https://minfraud.maxmind.com/app/bin_http)

Please note that we continue to support the
[IIN (BIN) look-up form on our website](https://www.maxmind.com/en/accounts/current/minfraud/iin/lookup)
\[login required\], so that remains an option for your use. If you require an
API because of volume considerations, we recommend either using our
[minFraud Insights API](https://www.maxmind.com/en/accounts/current/minfraud/iin/lookup)
(IP address is a required input field) or integrating an alternative
commercially available solution.
