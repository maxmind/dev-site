+++
title = 'IP and email tenure deprecation'
date = 2019-08-29T16:00:00Z
draft = false
legacy_anchor = 'ip-and-email-tenure-deprecation'
[build]
  list = 'never'
+++

Effective August 29th, 2019, we have deprecated the `/subscores/ip_tenure` and
`subscores/email_tenure` risk-factor outputs in the minFraud Factors service
because they provided limited value. The subscores will default to 1 and will be
removed in a future release. The IP tenure is reflected in the overall risk
score. The user tenure on email is reflected in the `/subscores/email_address`
output.
