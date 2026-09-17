+++
title = 'Updates to user count data'
date = 2026-03-04T16:00:00Z
draft = false
legacy_anchor = 'updates-to-user-count-data'
+++

Between Tuesday March 3 and Friday, March 6, 2026 (and possibly longer), we are
making daily updates to the user count data to more often return a value of 0 or
1 for residential proxies.

Previously, approximately 50% of residential proxy IPs on single household IPs
had a user count value of at least 2, and 50% had a value of 0 or 1. This update
will make it easier to flag a high volume of customer profiles on a residential
proxy as anomalous in relation to a lower user count value of 0 or 1.

Please see an explanation of user counts below:

| User count | Description                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------- |
| 0          | IP assigned to a single end-user at a time (household, person, or small business), or not in use. |
| 1          | IP assigned to a single end-user with possibility of multiple end-users.                          |
| 2          | IP shared with multiple end-users.                                                                |
| >5         | IP shared with many end-users.                                                                    |

[Learn more about user counts on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/maxmind-user-context-data#user-counts)
