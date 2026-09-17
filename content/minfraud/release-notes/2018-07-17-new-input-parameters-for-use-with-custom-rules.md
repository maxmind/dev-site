+++
title = 'New input parameters for use with custom rules'
date = 2018-07-17T16:00:00Z
draft = false
legacy_anchor = 'new-input-parameters-for-use-with-custom-rules'
+++

We have released additional input parameters for use with custom rules.
Customers of minFraud Score, minFraud Insights, and minFraud Factors can now use
the following inputs to serve as the basis when creating a custom rule:

- IIN: `/credit_card/issuer_id_number` – The issuer ID number for the credit
  card. This is the first 6 digits of the credit card number. It identifies the
  issuing bank.
- Accept Language: `/device/accept_language` – The HTTP “Accept-Language” header
  of the device used in the transaction.
- IP (CIDR block): `/device/ip_address` – A network CIDR block
