+++
title = 'New beta versions of minFraud Score and minFraud Insights'
date = 2015-06-29T16:00:00Z
draft = false
legacy_anchor = 'new-beta-versions-of-minfraud-score-and-minfraud-insights'
+++

We've released the beta versions of two new minFraud services, minFraud Score
and minFraud Insights.

To use either service, you must upgrade to version 2.0 of the client API. Please
refer to the
[minFraud Score and minFraud Insights API documentation](/minfraud/api-documentation)
for more details.

Changes in version 2.0 of the minFraud APIs include:

- RESTful HTTP API
- Request data validation
- Model classes for return data
- .NET client API now available
- Python client API now available

minFraud version 2.0 provides the following **new inputs**:

In association with billing address:

- First name
- Last name
- Company
- Address line 1
- Address line 2
- Phone number
- Phone country code

In association with shipping address:

- First name
- Last name
- Company
- Address line 2
- Phone number
- Phone country code
- Delivery speed

User data:

- Customer ID
- Hashed or unhashed email address

Credit card information:

- Last four digits
- Authorization outcome
- Decline reason
- Processor name

Transaction information:

- Transaction type
- Timestamp
- Discount code
- Affiliate ID
- Subaffiliate ID
- Referrer URI

Shopping cart:

- Item category
- Item ID or URL
- Item quantity
- Item price

minFraud Insights provides the following **new outputs** (note that minFraud
Score returns the riskScore only):

All geolocation outputs provided by the
[GeoIP Insights web service](https://www.maxmind.com/en/geoip-api-web-services).

Billing and shipping related outputs:

- Billing is in IP country
- Shipping is in IP country
- Distance between IP and shipping address
- Billing address longitude
- Billing address latitude
- Shipping address longitude
- Shipping address latitude
- Billing address to shipping address distance

Local date/time of user using IP

ProxyScore is now IP risk score. (/ip_address/risk). Whereas the ProxyScore was
expressed on a scale of 0.00-4.00, the IP risk score uses a scale of 0.01 to 99.

The following fields are deprecated in version 2.0:

- Anonymous Proxy (anonymousProxy)
- Corporate Proxy (ip_corporateProxy)
- Free Email (freeMail)
- High Risk Email (carderEmail)
- High risk username and high risk password (highRiskUsername, highRiskPassword)

<!-- cspell:ignore cust -->

- Phone number check against billing postal code (custPhoneInBillingLoc)

Country Match (countryMatch) has been replaced by _billing country is in IP
country_ and _shipping country is in IP country_
