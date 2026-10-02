+++
title = 'Credit card is_virtual and device local_time outputs, and payout_change event type now available!'
date = 2018-04-10T16:00:00Z
draft = false
legacy_anchor = 'credit-card-is_virtual-and-device-local_time-outputs-and-payout_change-event-type-now-available'
+++

We've added two new output fields to the minFraud Insights and Factors services.
The outputs are:

- Credit card is_virtual: `/credit_card/is_virtual` – A flag that is true if the
  credit card is a virtual card.
- Device local_time: `/device/local_time` – A date-time indicating the local
  date and time of the transaction in the time zone of the device.

We've also added a new event type to the `/event/type` field for all minFraud
requests: `payout_change`.
