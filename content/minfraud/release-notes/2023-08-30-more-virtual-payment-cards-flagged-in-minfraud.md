+++
title = 'More Virtual Payment Cards Flagged in minFraud'
date = 2023-08-30T16:00:00Z
draft = false
legacy_anchor = 'more-virtual-payment-cards-flagged-in-minfraud'
+++

Effective September 1, 2023 we will be flagging more virtual payment cards from
select digital banks in minFraud. In transactions where the IIN is submitted,
the minFraud services will be able to accurately tag more payment cards as
virtual. Virtual cards do not have a physical card associated with the card
number. Customers may use virtual cards for added security, though they are also
popular with resellers who use them to attempt to bypass order limits.

To benefit from increased virtual payment card detection, you must pass the IIN
or BIN (`credit_card/issuer_id_number`) of the payment card:

- [Learn more about the IIN input on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/credit-card-and-payments-inputs-minfraud#iin-bin)
- [See the documentation for this input in the API schema on our Developer Portal.](/minfraud/api-documentation/requests#schema--request--credit-card__issuer_id_number)

Users of the minFraud Insights and Factors services will be able to see whether
a submitted payment card is virtual using the `credit_card/is_virtual` output:

- [Learn more about prepaid and virtual card detection on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/credit-card-risk-data-minfraud#detection-prepaid-virtual)
- [See the documentation for this output in the API schema on our Developer Portal.](/minfraud/api-documentation/responses#schema--response--credit-card__is_virtual)
