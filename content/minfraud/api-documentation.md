---
draft: false
title: minFraud API Documentation
---

{{< alert info >}} If you are a [minFraud Legacy](/minfraud/minfraud-legacy/)
customer, please see our
[What's New in minFraud Score, minFraud Insights, and minFraud Factors](/minfraud/whats-new-in-minfraud-score-and-minfraud-insights/)
document for a summary of the changes. {{</ alert >}}

## Overview

To learn more about the minFraud services and to purchase credits, please visit
the
[minFraud Overview page](https://www.maxmind.com/en/solutions/minfraud-services).
To better understand the differences between each minFraud service, review our
[minFraud Service Comparison page](https://www.maxmind.com/en/solutions/minfraud-services/pricing)
and the
[API response body documentation](/minfraud/api-documentation/responses#bodies).

## Client APIs

{{< snippet "snippets/minfraud-client-apis.md" >}}

## Additional Features

### Disposition API

We provide a [Dispositions API](/minfraud/working-with-transaction-dispositions)
for use with Disposition setting from the Transaction Details page. Use this API
to integrate with your order management system, payment processor, or other
internal system so that manual review decisions made from the account portal are
available within your own systems. For more information about setting
dispositions from the account portal, please refer to the
[article on reviewing transactions on our knowledge base](https://support.maxmind.com/knowledge-base/articles/review-a-minfraud-transaction).

### Report Transactions

If you are using our minFraud transaction fraud detection service, we also
encourage you to use our
[report transaction service](/minfraud/report-a-transaction). By reporting
transactions, you can help us significantly increase the amount of fraud we can
detect for you. We build custom machine learning models for each customer based
on reported transactions. We also manually review many reported transactions to
identify customizations and algorithmic improvements for each customer reporting
feedback.

### Device Tracking Add-on

You may optionally include the
[Device Tracking JavaScript](/minfraud/track-devices) on your site that helps us
identify the device your customer is using to determine whether it has been used
in previous fraudulent transactions. The device information is factored into the
scores returned through the minFraud service.

## Timeout Errors

If you get timeout errors, first confirm if we experienced a service disruption
on our [status page](https://status.maxmind.com/) or on
[Pingdom](http://stats.pingdom.com/datuqzybqg5z).

If there has not been a service disruption, we may be able to help you diagnose
your connection issues. Please use our
[`mm-network-analyzer` program](https://github.com/maxmind/mm-network-analyzer),
which is designed to aid in diagnosing networking issues. It creates a zip file
containing various network checks like traceroute, DNS, etc. You can download
the latest version, run it, and send the resulting zip file to our support team
for review.

Please note, `mm-network-analyzer` is not compatible with Windows, but you can
reach out to support with the following information (if available to you) to
help us investigate an issue:

- Your requesting server’s IP address
- Which web service demonstrates the issue
- What integration method you’re using for that web service
- Any full error messages you’re receiving
- Date and time frame (including time zone) that you experienced the issue
- Your traceroute to `minfraud.maxmind.com`

[You can submit your support request on our knowledge base.](https://support.maxmind.com)

## Versioning

The minFraud Score, minFraud Insights, and minFraud Factors web services use two
part versions. Our current release is version 2.0. The major version number will
remain at 2 for the foreseeable future.

The minor version will only change if there are breaking changes in the web
service. A breaking change is one that breaks client code that follows the
documentation on this page. Breaking changes include changing the type of an
existing field, deleting a field entirely, or changing URIs.

All changes to the web services will be documented in the
[minFraud release notes](/minfraud/release-notes), whether or not the version
number is changed.

The following changes are not considered to be breaking changes and will not be
accompanied by a version number change:

- Increased validation of inputs that causes a warning to be returned when there
  previously was not one.
- Adding a new request or response field, either at the top level of the
  structure or in one particular object such as the billing or `credit_card`.
  Client code should be written to allow for new fields to appear.
- Adding new values to enum fields such as processor.
- Adding or removing warning or error codes, and/or changing the body type for
  an error. Client code should always check the `Content-Type` header for any
  error response. Client code should also be prepared to handle any valid HTTP
  4xx or 5xx status code.
- Adding a new service with a new path.

## License

These services incorporate [GeoNames](https://www.geonames.org/) geographical
data, which is made available under the
[Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/).
