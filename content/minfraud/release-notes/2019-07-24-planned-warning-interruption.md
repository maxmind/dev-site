+++
title = 'Planned warning interruption'
date = 2019-07-24T16:00:00Z
draft = false
legacy_anchor = 'planned-warning-interruption'
[build]
  list = 'never'
+++

There will be a planned service interruption for all requests to MaxMind
services that use TLS versions 1.0 and 1.1, and for unencrypted HTTP requests to
MaxMind legacy minFraud services (e.g. minFraud Standard, minFraud Premium,
Proxy Detection web service, IIN service). This will take place for up to 2
hours starting at 14:00 UTC on the three dates below:

- Monday, July 29, 2019
- Wednesday, July 31, 2019
- Friday, August 2, 2019

During the interruption, requests using TLS v1.0 and v1.1 and unencrypted HTTP
requests to legacy minFraud endpoints will fail with an error.

To avoid service interruption, you may need to upgrade some part of your
technology stack to a later version, or you may need to make code changes. If
you have any questions, please do not hesitate to
[contact us](https://support.maxmind.com/knowledge-base). Additional info is
available on our
[blog](https://blog.maxmind.com/important-updates-about-tls-v1-0-v1-1-unencrypted-http-requests-and-the-legacy-minfraud-soap-api/).
