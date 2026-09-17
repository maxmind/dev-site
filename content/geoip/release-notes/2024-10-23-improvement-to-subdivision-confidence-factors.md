+++
title = 'Improvement to subdivision confidence factors'
date = 2024-10-23T16:00:00Z
draft = false
legacy_anchor = 'improvement-to-subdivision-confidence-factors'
+++

Beginning on November 5, 2024, we will be releasing an improvement to confidence
factors.

**What's changing?**

- Around 15% of networks will have updated level 1 subdivision confidence
  factors. New values should be more accurate than previous values.
- We will now include level 2 subdivision confidence factors in the GeoIP
  Insights web service and the MMDB format of the GeoIP Enterprise database.

**What should I do?**

- If you are a GeoIP Enterprise database user and you use subdivision confidence
  to make decisions, you may want to test the new confidence factors released in
  the databases on November 5, 2024 and make adjustments to your thresholds
  before putting them into production.
- If you are GeoIP Enterprise database user and you use the MMDB database
  format, you may want to update your integration to look at level 2 subdivision
  confidence data.
- If you are a GeoIP Insights web service user and you use subdivision
  confidence to make decisions, you may want to monitor your application
  starting on November 5, 2024 and make adjustments to thresholds as necessary.
