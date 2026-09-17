+++
title = 'Update to minFraud service server locations'
date = 2020-08-10T16:00:00Z
draft = false
legacy_anchor = 'update-to-minfraud-service-server-locations'
[build]
  list = 'never'
+++

Effective August 17, 2020, we will no longer serve minFraud service queries from
our London-area servers. These queries will automatically be re-routed to our
US-East servers. You do not need to take any action as a result of this change.
Customers who have previously had queries routed to these servers may see an
increase of 100 – 150 ms in the response time for your queries.
