+++
title = 'Elevated response times for web service requests experienced by some customers—resolved'
date = 2026-09-11T16:00:00Z
draft = false
legacy_anchor = 'elevated-response-times-for-web-service-requests-experienced-by-some-customersresolved'
[build]
  list = 'never'
+++

Today, on September 11, 2026, between approximately 03:57 and 07:00 UTC, some
requests to our minFraud and GeoIP web services saw elevated response times. The
impact was greatest between about 04:15 and 04:50 UTC, when affected requests
could take several seconds to complete.

This was limited to traffic routed through one network path into our US-East
data center. Requests served from other regions and paths were not affected.
Affected requests completed with correct responses. We saw elevated latency
rather than failures.

Our investigation found packet loss on the network path between our edge network
provider's Ashburn point of presence and our US-East data center. Lost packets
were retransmitted, which added delay. Our servers, databases, and application
code were healthy throughout, and no change on our side triggered the event.

We are working with our network providers to identify the source of the loss and
to prevent a recurrence. We are also improving monitoring of this kind of
network degradation.

If you have questions about specific requests, please send the request times to
our
[support team](https://support.maxmind.com/knowledge-base/submit-a-support-request)
and we will review.
