+++
title = 'minFraud no longer accepts event times more than one year in the past'
date = 2024-01-22T16:00:00Z
draft = false
legacy_anchor = 'minfraud-no-longer-accepts-event-times-more-than-one-year-in-the-past'
+++

Starting tomorrow, January 23, 2024, minFraud will no longer accept
`/event/time` inputs with values more than one year in the past. Most customers
do not need to send the `/event/time` input and will not be impacted by this
change.
[Learn more about this input and how to use it to score historical transactions on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/event-and-account-inputs-minfraud#storefront-identifier)

If you send the `/event/time` inputs with values more than one year in the past,
minFraud will:

- replace the event time with the current time
- score the transaction and return a score
- return an `INPUT_INVALID` warning with its response
