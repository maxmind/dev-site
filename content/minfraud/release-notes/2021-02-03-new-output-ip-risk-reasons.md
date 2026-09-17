+++
title = 'New output IP risk reasons'
date = 2021-02-03T16:00:00Z
draft = false
legacy_anchor = 'new-output-ip-risk-reasons'
[build]
  list = 'never'
+++

The `ip_address/risk_reasons` output is now available.
[minFraud Insights](https://www.maxmind.com/en/solutions/fraud-prevention/overview)
and
[minFraud Factors](https://www.maxmind.com/en/solutions/fraud-prevention/overview)
customers can now see reason codes associated with the IP risk score for high
risk IP addresses. When the IP risk score is high, the field may be populated
with one or more of the following reason codes:

- `ANONYMOUS_IP` – The IP address belongs to an anonymous network. See
  `/ip_address/traits` for more information.
- `HIGH_RISK_DEVICE` – A high risk device was seen on this IP address in your
  past transactions.
- `HIGH_RISK_EMAIL` – A high risk email address was seen on this IP address in
  your past transactions.
- `BILLING_POSTAL_VELOCITY` – Many different billing postal codes have been seen
  on this IP address in your past transactions.
- `EMAIL_VELOCITY` – Many different email addresses have been seen on this IP
  address in your past transactions.
- `ISSUER_ID_NUMBER_VELOCITY` – Many different issuer ID numbers have been seen
  on this IP address in your past transactions.
- `MINFRAUD_NETWORK_ACTIVITY` – Suspicious activity has been seen on this IP
  address across minFraud customers.

If the IP risk score is low, the `risk_reasons` field will be blank. Our
[client APIs](/minfraud/evaluate-a-transaction#links-to-maxmind-client-apis)
have been updated to support this output so you may need to refresh yours in
order to see the new output if you are not interfacing directly with our REST
API.
