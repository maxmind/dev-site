+++
title = 'New minFraud Insights Outputs'
date = 2016-01-29T16:00:00Z
draft = false
legacy_anchor = 'new-minfraud-insights-outputs'
+++

The following outputs have been added to minFraud Insights:

- `/credit_card/brand` – The card brand, such as “Visa”, “Discover”, “American
  Express”, etc.
- `/credit_card/type` – A string representing the card's type. The possible
  values are `charge`, `credit`, or `debit`.
- `/device/id` – A UUID that MaxMind uses for the device associated with this IP
  address. This is only available if you are using the
  [Device Tracking Add-On](/minfraud/track-devices).
- `/email/is_free` – This field is `true` if MaxMind believes that this email is
  hosted by a free email provider such as Gmail or Yahoo! Mail.
- `/email/is_high_risk` – This field is `true` if MaxMind believes that this
  email is likely to be used for fraud.

Also, for both minFraud Score and minFraud Insights, the `input` property in the
warning objects has been removed and replaced with an `input_pointer` property.
This new property is a JSON pointer to the value in the input object causing the
warning.

All of our client APIs have been updated to reflect these changes.

For more information on these outputs, please see
[our minFraud Score and minFraud Insights API documentation](/minfraud/api-documentation).
