+++
title = 'Velocity Checking on User ID'
date = 2023-03-21T16:00:00Z
draft = false
legacy_anchor = 'velocity-checking-on-user-id'
+++

We have enabled velocity tracking on the `account/user_id` input for all
minFraud customers.

If you send a user ID associated with your transactions, minFraud will now
factor the velocity of the user's transactions into the risk score.

The `account/user_id` input allows you to pass a unique identifier for each of
your users so that the minFraud service can group transactions by user in order
to identify fraud signals attached to specific users.

[Learn more about the `account/user_id` input on our Developer Portal.](/minfraud/api-documentation/requests#schema--request--account__user_id)

[Learn more about velocity tracking on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/minfraud-services-velocity-checks)
