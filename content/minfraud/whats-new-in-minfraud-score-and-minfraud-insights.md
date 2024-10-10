---
draft: false
title: What’s New in minFraud Score, minFraud Insights, and minFraud Factors
---

MaxMind minFraud Score, minFraud Insights, and minFraud Factors provide a modern
RESTful way to access the minFraud data services. This document outlines the
major changes for developers when using these services.

For more information about ongoing enhancements to the minFraud services, see
our [release notes](/minfraud/release-notes).

## General Changes

The minFraud web services now follow REST principles.

Authentication is done using
[basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
over an TLS connection rather than passing the license key as a query parameter.

All requests are made by a POST of a structured JSON document to the web
service.

When an error occurs, we now return an appropriate HTTP error code instead of
simply returning a 200 with an error in the document. We also return a JSON
document with details about the error in most cases.

Successful responses also return a JSON document. All documents, both successful
and error, are in the form of a JSON object.

## Data Changes

### Inputs

[Download this PDF](https://get.maxmind.com/hubfs/Marketing/minFraud/minFraud%20services%20input_output%20comparison%20table.pdf)
to get an overview and comparison of all minFraud products' inputs.
You can also view our [Request API documentation](/minfraud/api-documentation/requests) for a complete
description of each input.

### minFraud Score Outputs

minFraud Score does not provide any new data outputs. Rather it provides a
[simple JSON document](/minfraud/api-documentation/responses) containing the
transaction’s `risk_score`, `id`, `credits_remaining`, and any warnings related
to the input provided.

### minFraud Insights Outputs

minFraud Insights response data builds on our previous web service outputs,
improving organization and consistency while adding several new data points.

Beyond the new outputs listed below, the service provides
[GeoIP2 Insights data](/geoip/docs/web-services/responses/#geoip2-insights-body-example)
for the IP address in the `ip_address` object.

`proxyScore` has been replaced with the IP address risk, `/ip_address/risk`.
Whereas proxyScore ranged from 0-4, the IP address ranges from 0.01 to 99,
similar to `risk_score`.

`countryMatch` has been replaced with `/billing_address/is_in_ip_country` and
`/shipping_address/is_in_ip_country`.

### New Outputs
[Download this PDF](https://get.maxmind.com/hubfs/Marketing/minFraud/minFraud%20services%20input_output%20comparison%20table.pdf)
to get an overview and comparison of all minFraud products' outputs.
You can also view our [Request API documentation](/minfraud/api-documentation/responses) for a complete
description of each input.


### Deprecated Outputs

The following outputs have been removed without a direct replacement.

- `ip_corporateProxy`
- `highRiskCountry`
- `highRiskUsername`
- `highRiskPassword`
- `custPhoneInBillingLoc`

## More Information

For more information on these web services, see the full
[API documentation](/minfraud/api-documentation).
