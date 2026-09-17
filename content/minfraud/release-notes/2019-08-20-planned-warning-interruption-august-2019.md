+++
title = 'Planned warning interruption (August 2019)'
date = 2019-08-20T16:00:00Z
draft = false
legacy_anchor = 'planned-warning-interruption-august-2019'
+++

**8-hour interruption of old TLS and unencrypted minFraud requests on August 28,
2019**

There will be a planned service interruption for all requests to MaxMind
services that use TLS versions 1.0 and 1.1, and for unencrypted HTTP requests to
MaxMind legacy minFraud services (e.g. minFraud Standard, minFraud Premium,
Proxy Detection web service, IIN service). **This will take place for up to 8
hours from 14:00-22:00 UTC on August 28, 2019.**

During the interruption, requests using TLS v1.0 and v1.1 and unencrypted HTTP
requests to legacy minFraud endpoints will fail with an error.

To avoid service interruption, you may need to upgrade some part of your
technology stack to a later version, or you may need to make code changes. If
you have any questions, please do not hesitate to
[contact us](https://support.maxmind.com/knowledge-base). Additional info is
available on our
[blog](https://blog.maxmind.com/important-updates-about-tls-v1-0-v1-1-unencrypted-http-requests-and-the-legacy-minfraud-soap-api/).
