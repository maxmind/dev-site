+++
title = 'Upcoming improvements to user count data'
date = 2024-10-09T16:00:00Z
draft = false
legacy_anchor = 'upcoming-improvements-to-user-count-data'
[build]
  list = 'never'
+++

On Tuesday, October 22, 2024, we will release an improvement to our user count
data to better detect IPs with multiple end users.

Many IP addresses with multiple end users that previously had a user count value
of 0 or 1 will now have a value of 2.

If you have applications of the data that rely on user count values with a
threshold of 0, 1, or 2, you may want to increase the thresholds by 1. For
example, if you currently consider user count values of greater than 1 to be
high volume, you may wish to consider user count values of greater than 2 to be
high volume when this update goes live.

The following services will be impacted:

- minFraud Insights web service
- minFraud Factors web service

[Learn more about user count data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/ip-trait-risk-data-minfraud#user-counts)

[Submit a support ticket request](https://support.maxmind.com/knowledge-base) if
you have questions or concerns.
