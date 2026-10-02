+++
title = 'New minFraud Factors risk factors'
date = 2020-08-06T16:00:00Z
draft = false
legacy_anchor = 'new-minfraud-factors-risk-factors'
+++

We have released three additional risk-factor outputs. Customers of
[minFraud Factors](/minfraud) can now access the following risk factors:

- `/subscores/device` – Risk associated with the device.
- `/subscores/email_local_part` – Risk associated with the part of the email
  before the @ symbol.
- `/subscores/shipping_address` – Risk associated with the shipping address.

Our [client APIs](/minfraud/evaluate-a-transaction#links-to-maxmind-client-apis)
have been updated to support these outputs so you may need to refresh yours if
you are not interfacing directly with our rest API.
