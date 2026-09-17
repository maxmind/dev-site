+++
title = 'Billing fields and is disposable email as input parameters for custom rules'
date = 2020-04-27T16:00:00Z
draft = false
legacy_anchor = 'billing-fields-and-is-disposable-email-as-input-parameters-for-custom-rules'
[build]
  list = 'never'
+++

We have released additional input parameters for use with custom rules.
Customers of
[minFraud Score, minFraud Insights, and minFraud Factors](/minfraud) can now use
the following inputs to serve as the basis when creating a custom rule:

- `/billing/address` – The first line of the user's billing address.
- `/billing/address_2` – The second line of the user's billing address.
- `/email/is_disposable` – This field is true if MaxMind believes that the email
  address is from a disposable email provider. It is false if the address is not
  from a known disposable email provider.
