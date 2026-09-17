+++
title = 'minFraud services now handle 8 digit IINs'
date = 2022-01-31T16:00:00Z
draft = false
legacy_anchor = 'minfraud-services-now-handle-8-digit-iins'
+++

We have updated the minFraud service to handle 8 digit credit card issuer ID
numbers (IINs). These are non-breaking changes.

- The `credit_card/issuer_id_number` input can now receive 6 or 8 digits.
- The `credit_card/last_4_digits` input has been renamed
  `credit_card/last_digits`, and receives 2 or 4 of the last digits of the
  credit card.
  - The `credit_card/last_4_digits` input will continue to work as an alias for
    the new `credit_card/last_digits` input.
- In some cases with longer IINs we will truncate the `credit_card/last_digits`
  input so that we process only the data required for risk scoring. If we
  truncate the last digits, the minFraud service will return a warning message.
- If you send 8 digits for the `credit_card/issuer_id_number`, but we do not
  recognize an 8 digit IIN, we will truncate the input to 6 digits. If we
  truncate the IIN, the minFraud service will return a warning message.

Learn more about how to pass the correct number of digits for credit card inputs
in our developer portal:

- [`credit_card/issuer_id_number`](/minfraud/api-documentation/requests#schema--request--credit-card__issuer_id_number)
- [`credit_card/last_digits`](/minfraud/api-documentation/requests#schema--request--credit-card__last_digits)

You can read more about these changes in
[the announcement on our blog](https://blog.maxmind.com/minfraud-now-supports-8-digit-iins/).

If you would like to learn more about how to properly handle credit card
numbers, you can read more at
[pcisecuritystandards.org](https://www.pcisecuritystandards.org/).
