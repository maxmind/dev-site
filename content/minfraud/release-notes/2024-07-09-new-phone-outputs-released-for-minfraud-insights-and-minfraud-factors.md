+++
title = 'New phone outputs released for minFraud® Insights and minFraud Factors'
date = 2024-07-09T16:00:00Z
draft = false
legacy_anchor = 'new-phone-outputs-released-for-minfraud-insights-and-minfraud-factors'
+++

We have released additional outputs for our
[minFraud Insights and minFraud Factors](https://www.maxmind.com/en/solutions/fraud-prevention/overview)
web services. Insights and Factors customers that pass phone numbers can now
make use of the following additional outputs:

- `/shipping_phone/country` – A two-character ISO 3166-1 country code for the
  country associated with the shipping phone number.

- `/shipping_phone/is_voip` – This is true if the shipping phone number is a
  Voice over Internet Protocol (VoIP) number allocated by a regulator. It is
  false if the shipping phone number is not a VoIP number allocated by a
  regulator. The key is only present when a valid shipping phone number has been
  provided and we have data for it.

- `/shipping_phone/network_operator` – The name of the original network operator
  associated with the shipping phone number. This field does not reflect phone
  numbers that have been ported from the original operator to another, nor does
  it identify mobile virtual network operators.

- `/shipping_phone/number_type` – Indicates whether the phone number is mobile
  or fixed.

- `/billing_phone/country` – A two-character ISO 3166-1 country code for the
  country associated with the billing phone number.

- `/billing_phone/is_voip` – This is true if the billing phone number is a Voice
  over Internet Protocol (VoIP) number allocated by a regulator. It is false if
  the billing phone number is not a VoIP number allocated by a regulator. The
  key is only present when a valid billing phone number has been provided and we
  have data for it.

- `/billing_phone/network_operator` – The name of the original network operator
  associated with the billing phone number. This field does not reflect phone
  numbers that have been ported from the original operator to another, nor does
  it identify mobile virtual network operators.

- `/billing_phone/number_type` – Indicates whether the phone number is mobile or
  fixed.

These values are particularly helpful to identify mismatches between data
points, such as a mismatch between the billing country as indicated by the IP
address and the country as indicated by the billing phone number. Another strong
signal for fraud is a phone carrier that does not operate in the country
indicated by the IP address.

Our [client APIs](/minfraud/evaluate-a-transaction#links-to-maxmind-client-apis)
have been updated to support these outputs so you may need to refresh yours if
you are not interfacing directly with our REST API.
