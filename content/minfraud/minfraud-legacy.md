---
draft: false
title: minFraud Legacy Web Service API
---

{{< alert danger >}}
We have made a number of data changes to the minFraud Legacy Standard and
Premium, and GeoIP Legacy City and Insights (formerly Omni) web services. Please
see our [blog
post](https://blog.maxmind.com/2020/06/data-changes-to-geoip-legacy-and-minfraud-legacy-web-services-in-may-2022/)
for more information, and how to prepare.
{{</ alert >}}

{{< alert >}}
**New minFraud APIs are available:** Please see
[What’s New in minFraud Score, minFraud Insights, and minFraud Factors](/minfraud/whats-new-in-minfraud-score-and-minfraud-insights)
and our [minFraud Insights, minFraud Score, and minFraud Factors API documentation](/minfraud).
To learn more about the minFraud Insights, minFraud Score, and minFraud Factors
services and to purchase credits, please
[visit the minFraud Overview page](https://www.maxmind.com/en/solutions/minfraud-services).
{{</ alert >}}

The minFraud web service is available using a simple URI-based API. To use this
service, you must have a valid
[MaxMind license key](https://www.maxmind.com/en/accounts/current/license-key).

## Report Transactions

If you are using our minFraud transaction fraud detection service, we also
encourage you to use our
[report transaction service](/minfraud/report-a-transaction/). By reporting
false positives and instances of fraud to us, you can help us refine our
algorithms, so we can reduce false positives and catch more fraud.

## Device Tracking Add-on

You may optionally include [some JavaScript](/minfraud/track-devices/) on your
site that helps us identify the device your customer is using to determine
whether it has been used in previous fraudulent transactions. The device
information is factored into the scores returned through the minFraud service.

## HTTP API

If an API for your language is not available, you can use the “raw” API detailed
below.

The HTTP API requires you to pass a set of parameters as an HTTP GET or POST.
Results are returned in a simple text format documented below.

The URI for this service is `https://minfraud.maxmind.com/minfraud/v1.0/legacy`.

You may be using the original URI, `https://minfraud.maxmind.com/app/ccv2r`.

The `minfraud.maxmind.com` hostname automatically picks the data center
geographically closest to you.

### Security

The API is only available via HTTPS. If you attempt to access this service via
HTTP, you will receive a `403 Forbidden` HTTP response.

We require TLS 1.2 or greater for all requests to our servers to keep your data
secure.

### Input

The minFraud API accepts input in a query string or as a form post
(application/x-www-form-urlencoded). It accepts the following fields. The name
of each field should be used as the query string or form field name. Field names
_are_ case-sensitive.

The length of the data passed to us does not matter for most fields. We will
truncate inputs as needed. However, for a few fields the length is important,
and this is noted in the table below.

String fields are limited to no more than 255 Unicode characters unless a
shorter length is specified. Of course, many fields also have additional
constraints that limit the length. For example, the `ip_address` field cannot be
longer than the longest valid representation of an IPv6 address.

{{< rawhtml >}}
<div class="table">
   <table>
      <thead>
         <tr>
            <th>Name</th>
            <th>Type (length)</th>
            <th>Description</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td colspan="3">
               <strong>Required Fields</strong>
               The following fields are required.
            </td>
         </tr>
         <tr>
            <td><strong>i</strong></td>
            <td>string</td>
            <td>The IP address of the customer placing the order. This should be passed as a string like “44.55.66.77” or “2001:db8::2:1”.</td>
         </tr>
         <tr>
            <td><strong>license_key</strong></td>
            <td>string</td>
            <td>Your <a href="https://www.maxmind.com/en/accounts/current/license-key">MaxMind license key.</a></td>
         </tr>
         <tr>
            <td colspan="3">
               <strong>Billing Address</strong>
               You should always pass these fields if possible.
            </td>
         </tr>
         <tr>
            <td>city</td>
            <td>string (255)</td>
            <td>The billing city for the customer.</td>
         </tr>
         <tr>
            <td>region</td>
            <td>string (255)</td>
            <td>The billing region/state for the customer.</td>
         </tr>
         <tr>
            <td>postal</td>
            <td>string (255)</td>
            <td>The billing postal (zip) code for the customer.</td>
         </tr>
         <tr>
            <td>country</td>
            <td>string (255)</td>
            <td>The billing country for the customer. This can be passed as the full country name or as an <a href="https://en.wikipedia.org/wiki/ISO_3166">ISO 3166</a> code.</td>
         </tr>
         <tr>
            <td colspan="3">
                <strong>Shipping Address</strong>
                These fields are used to check against our database of known high risk shipping addresses.
                You should only pass these fields when shipping physical goods.
            </td>
         </tr>
         <tr>
            <td>shipAddr</td>
            <td>string (255)</td>
            <td>The shipping street address.</td>
         </tr>
         <tr>
            <td>shipCity</td>
            <td>string (255)</td>
            <td>The shipping address city.</td>
         </tr>
         <tr>
            <td>shipRegion</td>
            <td>string (255)</td>
            <td>The shipping address region/state.</td>
         </tr>
         <tr>
            <td>shipPostal</td>
            <td>string (255)</td>
            <td>The shipping address postal (zip) code.</td>
         </tr>
         <tr>
            <td>shipCountry</td>
            <td>string (255)</td>
            <td>The shipping address country.</td>
         </tr>
         <tr>
            <td colspan="3">
               <strong>User Data</strong>
               Some of these fields are MD5 hash fields. Such fields should be passed as an MD5 hash in hex form. Always lower-case the input before hashing. Do not use any salt when hashing these inputs.
            </td>
         </tr>
         <tr>
            <td>domain</td>
            <td>string (255)</td>
            <td>The domain for the user’s email address. This field should not be hashed.</td>
         </tr>
         <tr>
            <!-- cspell:ignore cust -->
            <td>custPhone</td>
            <td>string (255)</td>
            <td>The customer’s phone number. Most formats are acceptable. We strip out all non-numeric characters from the input.</td>
         </tr>
         <tr>
            <td>emailMD5</td>
            <td>string (32)</td>
            <td>The customer’s email address. This field must be a valid email address or the MD5 of the lowercased email address. <strong><em>Important:</em></strong> if using the MD5 hash, please be sure to <a href="/minfraud/normalizing-email-addresses-for-minfraud">normalize it</a> before calculating its MD5 hash.</td>
         </tr>
         <tr>
            <td>usernameMD5</td>
            <td>string&nbsp;(32)</td>
            <td>An MD5 hash of the user’s username in ASCII encoding.</td>
         </tr>
         <tr>
            <td colspan="3">
               <strong>BIN-related</strong>
               These fields are used to verify that the customer is in possession of the credit card.
            </td>
         </tr>
         <tr>
            <td>bin</td>
            <td>string (255)</td>
            <td>The credit card BIN number. This is the first 6 or 8 digits of the credit card number. It identifies the issuing bank.</td>
         </tr>
         <tr>
            <td>binName</td>
            <td>string (255)</td>
            <td>The name of the bank which issued the credit card as provided by the end-user who initiated the event. This is used to verify that cardholder is in possession of credit card. You must set the <strong>bin</strong> field if you set this one.</td>
         </tr>
         <tr>
            <td>binPhone</td>
            <td>string (255)</td>
            <td>The customer service phone number listed on the back of the credit card as provided by the end-user who initiated the event. This is used to verify that cardholder is in possession of credit card. You must set the <strong>bin</strong> field if you set this one.</td>
         </tr>
         <tr>
            <td colspan="3">
               <strong>Transaction Linking</strong>
               These fields are used to link together fraudulent orders from the same browser across multiple proxies or credit card numbers.
            </td>
         </tr>
         <tr>
            <td>user_agent</td>
            <td>string (255)</td>
            <td>The User-Agent HTTP header.</td>
         </tr>
         <tr>
            <td>accept_language</td>
            <td>string (255)</td>
            <td>The Accept-Language HTTP header.</td>
         </tr>
         <tr>
            <td colspan="3">
               <strong>Transaction Information</strong>
               These fields provide additional information about the transaction.
            </td>
         </tr>
         <tr>
            <td>txnID</td>
            <td>string (255)</td>
            <td>Your internal transaction ID for the order. We can use this to locate a specific transaction in our logs, and it will also show up in email alerts and notifications from us to you.</td>
         </tr>
         <tr>
            <td>order_amount</td>
            <td>decimal&nbsp;(17,&nbsp;3)</td>
            <td>The customer’s order amount.</td>
         </tr>
         <tr>
            <td>order_currency</td>
            <td>string&nbsp;(3)</td>
            <td>The currency used for the customer’s order as an <a href="https://en.wikipedia.org/wiki/ISO_4217">ISO 4217</a> code.</td>
         </tr>
         <tr>
            <td>shopID</td>
            <td>string (255)</td>
            <td>Your internal ID for the shop, affiliate, or merchant this order is coming from. Required for minFraud users who are resellers, payment providers, gateways and affiliate networks.</td>
         </tr>
         <tr>
            <td>txn_type</td>
            <td>enum</td>
            <td>
               The transaction type. This can be set to one of the following strings:
               <ul>
                  <li>creditcard</li>
                  <li>debitcard</li>
                  <li>paypal</li>
                  <li>google – Google checkout</li>
                  <li>other</li>
                  <li>lead – lead generation</li>
                  <li>survey – online survey</li>
                  <li>sitereg – site registration</li>
               </ul>
               The <em>lead</em>, <em>survey</em>, and <em>sitereg</em> types are used for non-purchase transactions.
            </td>
         </tr>
         <tr>
            <td colspan="3">
               <strong>Credit Card Check</strong>
               To provide these fields you must run the AVS and/or CVV checks before calling minFraud.
            </td>
         </tr>
         <tr>
            <td>avs_result</td>
            <td>enum</td>
            <td>
               The AVS check result, as returned to you by the credit card processor. The minFraud service supports the standard <a href="https://en.wikipedia.org/wiki/Address_Verification_System#Address_Verification_Service_.28AVS.29_codes">AVS codes</a>.
            </td>
         </tr>
         <tr>
            <td>cvv_result</td>
            <td>enum</td>
            <td>The card verification value (CVV) code as provided by the payment processor. This should be a single letter. <strong>Do not pass the CVV code itself.</strong></td>
         </tr>
         <tr>
            <td colspan="3">
               <strong>Miscellaneous</strong>
            </td>
         </tr>
         <tr>
            <td>requested_type</td>
            <td>enum</td>
            <td>
               This can be set to either “standard” or “premium”. By default, we use the highest level of service available for your account.
               If you have both the premium and standard minFraud service, you can choose to use the <strong>standard</strong> service to save on costs.
            </td>
         </tr>
      </tbody>
   </table>
</div>
{{</ rawhtml >}}

### Output

The minFraud service returns its output as a set of fields separated by
semicolons (;). Each field consists of a name and value separated by an equals
sign (=). The field values are not escaped, but will never contain a semicolon
or equals sign.

All strings are returned in the
[ISO-8859-1 encoding](https://en.wikipedia.org/wiki/ISO/IEC_8859-1). This
encoding is also referred to as latin1.

Here is an example of the output with just a few fields:

`riskScore=13.2;distance=6;countryMatch=Yes;countryCode=US;freeMail=Yes`

The API version column specifies the earliest API version in which a field is
available. You can explicitly
[ask for responses in older API formats](https://www.maxmind.com/en/minfraud_version).
By default, all new users will receive responses for the version that was
current when they signed up for the service. The latest version is 1.3.

{{< rawhtml >}}
<div class="table">
   <table>
      <thead>
         <tr>
            <th>Name</th>
            <th>Type&nbsp;(length)</th>
            <th>Description</th>
            <th>API version</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td colspan="3">
               <strong>Risk Score</strong>
            </td>
         </tr>
         <tr>
            <td>riskScore</td>
            <td>decimal</td>
            <td>This field contains the risk score, from 0.01 to 100. A higher score indicates a higher risk of fraud. For example, a score of 20 indicates a 20% chance that a transaction is fraudulent. We never return a risk score of 0, since all transactions have the possibility of being fraudulent.</td>
            <td>1.1</td>
         </tr>
         <tr>
            <td>score</td>
            <td>decimal</td>
            <td><strong>This field has been deprecated, is not supported, and is no longer present in API version 1.3.</strong></td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>explanation</td>
            <td>string</td>
            <td><strong>This field has been deprecated, is not supported, and is no longer present in API version 1.3.</strong> This is a brief explanation of the <em>score</em> (not the <em>riskScore</em>).</td>
            <td>1.1</td>
         </tr>
         <tr>
            <td colspan="4">
               <strong>GeoIP Location Checks</strong>
               These fields are based on the correspondence between the user’s IP address and the location information they provided.
            </td>
         </tr>
         <tr>
            <td>countryMatch</td>
            <td>enum</td>
            <td>This field can be either <strong>Yes</strong> or <strong>No</strong>. It indicates whether the country of the IP address matched the billing address country. A mismatch indicates a higher risk of fraud. If no <em>country</em> input was provided, this field will be left blank.</td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>highRiskCountry</td>
            <td>enum</td>
            <td><strong>This field has been deprecated.</strong></td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>distance</td>
            <td>integer</td>
            <td>The distance from the IP address location to the billing location, in kilometers. A higher distance indicates a higher risk of fraud.</td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>ip_accuracyRadius</td>
            <td>integer</td>
            <td>The radius in kilometers around the specified location where the IP address is likely to be. </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>ip_city</td>
            <td>string</td>
            <td>The city or town name as defined by <a href="https://www.geonames.org/">GeoNames</a> associated with the IP address. </td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>ip_region</td>
            <td>string</td>
            <td>
               The <a href="https://en.wikipedia.org/wiki/ISO_3166-2">ISO-3166-2</a> code for the state/region associated with the IP address.
               We previously returned a <a href="https://en.wikipedia.org/wiki/FIPS_10-4">FIPS 10-4</a> code for all countries other than the United States and Canada. See our <a href="https://blog.maxmind.com/2020/06/data-changes-to-geoip-legacy-and-minfraud-legacy-web-services-in-may-2022/">blog post</a> for more information.
            </td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>ip_regionName</td>
            <td>string</td>
            <td>The region name as defined by <a href="https://www.geonames.org/">GeoNames</a> associated with the IP address. </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>ip_postalCode</td>
            <td>string</td>
            <td>The postal code associated with the IP address. These are available for some IP addresses in Australia, Canada, France, Germany, Italy, Spain, Switzerland, United Kingdom, and the US. We return the first 3 characters for Canadian postal codes. We return the first 2-4 characters (outward code) for postal codes in the United Kingdom. </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>ip_metroCode</td>
            <td>integer</td>
            <td>The metro code associated with the IP address. These are only available for IP addresses in the US. </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>ip_areaCode</td>
            <td>string</td>
            <td>
               <strong>Deprecated. This field is empty. See our <a href="https://blog.maxmind.com/2020/06/data-changes-to-geoip-legacy-and-minfraud-legacy-web-services-in-may-2022/">blog post</a> for more information.</strong>
            </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>countryCode</td>
            <td>string</td>
            <td>
               A <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a> country code for the country associated with the IP address. In addition to the standard codes, we may also return one of the following:
               <ul>
                  <li><strong>A1</strong> – an anonymous proxy.</li>
                  <li><strong>A2</strong> – a satellite provider.</li>
                  <li><strong>EU</strong> – an IP in a block used by multiple European countries.</li>
                  <li><strong>AP</strong> – an IP in a block used by multiple Asia/Pacific region countries.</li>
               </ul>
               The <strong>US</strong> country code is returned for IP addresses associated with overseas US military bases.
            </td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>ip_countryName</td>
            <td>string</td>
            <td>The country name as defined by <a href="https://www.geonames.org/">GeoNames</a> associated with the IP address.</td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>ip_continentCode</td>
            <td>string (2)</td>
            <td>
               A two-character code for the continent associated with the IP address. The possible codes are:
               <ul>
                  <li><strong>AF</strong> – Africa</li>
                  <li><strong>AN</strong> – Antarctica</li>
                  <li><strong>AS</strong> – Asia</li>
                  <li><strong>EU</strong> – Europe</li>
                  <li><strong>NA</strong> – North America</li>
                  <li><strong>OC</strong> – Oceania</li>
                  <li><strong>SA</strong> – South America</li>
               </ul>
            </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>ip_latitude</td>
            <td>decimal</td>
            <td>The approximate latitude of the location associated with the IP address. This value is not precise and should not be used to identify a particular address or household. The latitude and longitude are near the center of the most granular location value returned: postal code, city, region, or country.</td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>ip_longitude</td>
            <td>decimal</td>
            <td>The approximate longitude of the location associated with the IP address. This value is not precise and should not be used to identify a particular address or household.</td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>ip_timeZone</td>
            <td>string</td>
            <td>The time zone associated with the IP address. Time zone names are taken from the <a href="https://www.iana.org/time-zones/">IANA time zone database</a>. </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>ip_asnum</td>
            <td>string</td>
            <td>The <a href="https://en.wikipedia.org/wiki/Autonomous_system_(Internet)">autonomous system number</a> associated with the IP address. </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>ip_userType</td>
            <td>enum</td>
            <td>
               The user type associated with the IP address. This will be one of the following values.
               <ul>
                  <li><strong>business</strong></li>
                  <li><strong>cafe</strong></li>
                  <li><strong>cellular</strong></li>
                  <li><strong>college</strong></li>
                  <li><strong>contentDeliveryNetwork</strong></li>
                  <li><strong>government</strong></li>
                  <li><strong>hosting</strong></li>
                  <li><strong>library</strong></li>
                  <li><strong>military</strong></li>
                  <li><strong>residential</strong></li>
                  <li><strong>router</strong></li>
                  <li><strong>school</strong></li>
                  <li><strong>searchEngineSpider</strong></li>
                  <li><strong>traveler</strong></li>
               </ul>
            </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>ip_netSpeedCell</td>
            <td>enum</td>
            <td>
               The connection type associated with the IP address. This can be one of the following values:
               <ul>
                  <li><strong>Dialup</strong></li>
                  <li><strong>Cable/DSL</strong></li>
                  <li><strong>Corporate</strong></li>
                  <li><strong>Cellular</strong></li>
               </ul>
            </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>ip_domain</td>
            <td>string</td>
            <td>The second level domain associated with the IP address. This will be something like “example.com” or “example.co.uk”, not “foo.example.com”. </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>ip_isp</td>
            <td>string</td>
            <td>The name of the ISP associated with the IP address. </td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>ip_org</td>
            <td>string</td>
            <td>The name of the organization associated with the IP address. </td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>ip_cityConf</td>
            <td>decimal</td>
            <td>A value from 0-100 representing our confidence that the city is correct. </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>ip_regionConf</td>
            <td>decimal</td>
            <td>A value from 0-100 representing our confidence that the region is correct. </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>ip_postalConf</td>
            <td>decimal</td>
            <td>A value from 0-100 representing our confidence that the postal code is correct. </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td>ip_countryConf</td>
            <td>decimal</td>
            <td>A value from 0-100 representing our confidence that the country is correct. </td>
            <td>1.2</td>
         </tr>
         <tr>
            <td colspan="4">
               <strong>Proxy Detection</strong>
               These fields provide information about whether or not the user’s IP address is a proxy, and if so, what type of proxy.
            </td>
         </tr>
         <tr>
            <td>anonymousProxy</td>
            <td>enum</td>
            <td>This field can be either <strong>Yes</strong> or <strong>No</strong>. It indicates whether the user’s IP address is an anonymous proxy. An anonymous proxy indicates a high risk of fraud.</td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>proxyScore</td>
            <td>decimal</td>
            <td>
               A score from 0.00-4.00 indicating the likelihood that the user’s IP address is high risk.
               <table>
                  <thead>
                     <tr>
                        <th>proxyScore</th>
                        <th>Likelihood of fraud</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>0.5</td>
                        <td>15%</td>
                     </tr>
                     <tr>
                        <td>1.0</td>
                        <td>30%</td>
                     </tr>
                     <tr>
                        <td>2.0</td>
                        <td>60%</td>
                     </tr>
                     <tr>
                        <td>3.0+</td>
                        <td>90%</td>
                     </tr>
                  </tbody>
               </table>
               <strong>Note:</strong> Anonymous proxies will generally return a <code>proxyScore</code> of 0.
            </td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>ip_corporateProxy</td>
            <td>enum</td>
            <td>This field can be either <strong>Yes</strong> or <strong>No</strong>. It indicates whether the user’s IP address is a known corporate proxy.</td>
            <td>1.2</td>
         </tr>
         <tr>
            <td colspan="4">
               <strong>Emails and Login Checks</strong>
               These fields provide information about the email and login info that was provided in the input.
            </td>
         </tr>
         <tr>
            <td>freeMail</td>
            <td>enum</td>
            <td>This field can be either <strong>Yes</strong> or <strong>No</strong>. It indicates whether the user’s email address is from a free email provider. Note that this will be set to “No” if no <em>domain</em> is passed in the input.</td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>carderEmail</td>
            <td>enum</td>
            <td>This field can be either <strong>Yes</strong> or <strong>No</strong>. It indicates whether the user’s email address is in a database of known high risk emails.</td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>highRiskUsername</td>
            <td></td>
            <td>This field has been deprecated. It will be removed in a future release.</td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>highRiskPassword</td>
            <td></td>
            <td>This field has been deprecated. It will be removed in a future release.</td>
            <td>1.0</td>
         </tr>
         <tr>
            <td colspan="4">
               <strong>Bank Checks</strong>
               These fields provide information about the user’s credit card and its issuing bank.
            </td>
         </tr>
         <tr>
            <td>binMatch</td>
            <td>enum</td>
            <td>
               This field can be either <strong>Yes</strong>, <strong>No</strong>, <strong>NotFound</strong>, or <strong>NA</strong>.  It indicates whether the country of the billing address matches the country of the majority of customers using that BIN. In cases where the location of customers is highly mixed, the match is to the country of the bank issuing the card.
               The <strong>NotFound</strong> response means that we could not find a match for the provided <em>bin</em> input field. The <strong>NA</strong> response means that you did not provide a <em>bin</em> in the input.
            </td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>binCountry</td>
            <td>string (2)</td>
            <td>The two letter <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2</a> country code country code associated with the location of the majority of customers using this credit card as determined by their billing address. In cases where the location of customers is highly mixed, this defaults to the country of the bank issuing the card. <strong>This field is returned for premium service level queries. For standard service level queries the field is only returned if the <em>binMatch</em> is Yes.</strong></td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>binNameMatch</td>
            <td>enum</td>
            <td>
               This field can be either <strong>Yes</strong>, <strong>No</strong>, <strong>NotFound</strong>, or <strong>NA</strong> It indicates whether the credit card’s bank name matches the <em>binName</em> input field.
               The <strong>NotFound</strong> response means that we could not find a match for the provided <em>bin</em> input field. The <strong>NA</strong> response means that you did not provide a <em>binName</em> in the input.
            </td>
            <td>1.1</td>
         </tr>
         <tr>
            <td>binName</td>
            <td>string</td>
            <td>The name of the bank which issued the credit card. This is available for approximately 96% of all BIN numbers. <strong>This field is only returned for premium service level queries.</strong></td>
            <td>1.1</td>
         </tr>
         <tr>
            <td>binPhoneMatch</td>
            <td>enum</td>
            <td>
               This field can be either <strong>Yes</strong>, <strong>No</strong>, <strong>NotFound</strong>, or <strong>NA</strong> It indicates whether the credit card’s bank name matches the <em>binPhone</em> input field.
               The <strong>NotFound</strong> response means that we could not find a match for the provided <em>bin</em> input field. The <strong>NA</strong> response means that you did not provide a <em>binPhone</em> in the input.
            </td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>binPhone</td>
            <td>string</td>
            <td>The phone number of the bank which issued the credit card. This is available for approximately 75% of all BIN numbers. In some cases the phone number we return may be out of date. <strong>This field is only returned for premium service level queries.</strong></td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>prepaid</td>
            <td>enum</td>
            <td>This field can be either <strong>Yes</strong> or <strong>No</strong>. This indicates whether the card is a prepaid or gift card. If no <em>bin</em> input was provided, this field will be left blank. <strong>This field is only returned for premium service level queries.</strong></td>
            <td>1.3</td>
         </tr>
         <tr>
            <td colspan="4">
               <strong>Address and Phone Number Checks</strong>
               These fields provide information about the user’s phone and address.
            </td>
         </tr>
         <tr>
            <td>custPhoneInBillingLoc</td>
            <td>enum</td>
            <td>
               This field can be either <strong>Yes</strong>, <strong>No</strong>, or <strong>NotFound</strong>. This indicates whether the customer’s phone number is in the billing address’s postal code.
               The <strong>No</strong> response means that phone number may be in a different area, or it is not listed in our database. The <strong>NotFound</strong> response indicates that the phone number <em>prefix</em> is not in our database.
               Currently we only return information about US phone numbers. For all other countries, this field will be left blank.
            </td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>shipForward</td>
            <td>enum</td>
            <td>This field can be either <strong>Yes</strong>, <strong>No</strong>, or <strong>NA</strong>. This indicates whether the customer’s shipping address is in a database of known high risk shipping addresses. The <strong>NA</strong> response indicates that we could not parse the shipping address.</td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>cityPostalMatch</td>
            <td>enum</td>
            <td>This field can be either <strong>Yes</strong> or <strong>No</strong>. This indicates whether the customer’s billing city and state match their postal code.</td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>shipCityPostalMatch</td>
            <td>enum</td>
            <td>This field can be either <strong>Yes</strong> or <strong>No</strong>. This indicates whether the customer’s shipping city and state match their postal code.</td>
            <td>1.0</td>
         </tr>
         <tr>
            <td colspan="4">
               <strong>Account Information Fields</strong>
               These fields provide information about your MaxMind account.
            </td>
         </tr>
         <tr>
            <td>queriesRemaining</td>
            <td>integer</td>
            <td>This is the number of minFraud queries remaining in your account.</td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>maxmindID</td>
            <td>string (8)</td>
            <td>This is a unique eight character string identifying this minFraud request. Please use this ID in bug reports or support requests to MaxMind so that we can easily identify a particular request.</td>
            <td>1.0</td>
         </tr>
         <tr>
            <td>minfraud_version</td>
            <td>string</td>
            <td>This returns the API version that was used for this request.</td>
            <td>1.3</td>
         </tr>
         <tr>
            <td>service_level</td>
            <td>enum</td>
            <td>This returns the service level that was used for this request. This can be either <strong>standard</strong> or <strong>premium</strong>.</td>
            <td>1.3</td>
         </tr>
         <tr>
            <td colspan="4">
               <strong>Error Reporting</strong>
            </td>
         </tr>
         <tr>
            <td>err</td>
            <td>enum</td>
            <td>
               If there was an error or warning with this request, this field contains an error code string.
               The possible error codes are:
               <ul>
                  <li><strong>INVALID_LICENSE_KEY</strong></li>
                  <li><strong>MAX_REQUESTS_REACHED</strong> – This is returned when your account is out of queries.</li>
                  <li><strong>LICENSE_REQUIRED</strong> – This is returned if you do not provide a license key at all.</li>
                  <li><strong>PERMISSION_REQUIRED</strong> – This is returned if you do not have permission to use the service. Please <a href="https://support.maxmind.com/hc/en-us/requests/new">contact our support team</a> for more information.</li>
               </ul>
               The possible warning codes are:
               <ul>
                  <li><strong>COUNTRY_NOT_FOUND</strong></li>
                  <li><strong>CITY_NOT_FOUND</strong></li>
                  <li><strong>CITY_REQUIRED</strong></li>
                  <li><strong>INVALID_EMAIL_MD5</strong></li>
                  <li><strong>IP_NOT_FOUND</strong> – This warning will be returned if the IP address is not valid, if it is not public, or if it is not in our GeoIP database.</li>
                  <li><strong>POSTAL_CODE_REQUIRED</strong></li>
                  <li><strong>POSTAL_CODE_NOT_FOUND</strong></li>
               </ul>
            </td>
            <td>1.0</td>
         </tr>
      </tbody>
   </table>
</div>
{{</ rawhtml >}}

## Testing minFraud Legacy with the MaxMind Sandbox

{{< snippet "snippets/sandbox-intro.md" >}}

### Select the proper Legacy version for testing

{{< alert >}}
Please note that if you would like to test the current version of
the minFraud service, you should follow the [instructions for testing the
current minFraud service on the Sandbox](/minfraud/sandbox-environment).
{{</ alert >}}

You can control which version of the Legacy minFraud service your Sandbox
account uses.

Once an account administrator has set up your Sandbox environment and granted
you access, you can login to your Sandbox account and click on “minFraud
Version” in the minFraud section of the left-hand navigation menu
[[direct link](https://sandbox.maxmind.com/en/accounts/current/minfraud/legacy-version),
Sandbox account login required].

Select the version of minFraud you would like to test, and click the blue Submit
button. The latest version of minFraud will be selected by default when you
initialize your Sandbox environment.

### Generate a License Key for the Sandbox

{{< snippet "snippets/sandbox-license-key.md" >}}

### Point your integration to the Sandbox service endpoints

Use the service endpoint for the Sandbox version of the minFraud Legacy service:

`https://sandbox.maxmind.com/minfraud/v1.0/legacy`

If you are using the original URI, you can also test using that URI on the
Sandbox:

`https://sandbox.maxmind.com/app/ccv2r`

Remember to use the license key generated by your Sandbox account to
authenticate your requests.

### Test data for the Sandbox minFraud Legacy service

You may only submit approved test data to the Sandbox version of the minFraud
services. At this time, the only approved test transaction data are the three IP
addresses listed below. You can submit transactions to Sandbox minFraud Legacy
services with any of the following IP addresses as the required `i` (IP address
input). [Learn more about Legacy inputs above.](#input)

You should receive a minFraud response with risk scores and risk data.

The `proxyScore` output will contain a response within the range defined below:

| Test IP Address Input | Test proxyScore Output Range |
| --------------------- | ---------------------------- |
| `128.101.101.101`     | 2 - 4                        |
| `74.209.24.1`         | 0.5 - 1.99                   |
| `65.116.3.80`         | 0 - 0.49                     |

Here is an example request that should return a valid minFraud response without
any warnings or errors, and with a proxyScore between 2 and 4:

- `https://sandbox.maxmind.com/minfraud/v1.0/legacy?i=146.243.121.22&license_key=<your_sandbox_license_key>&country=US`

You should not submit real transaction data to the Sandbox version of the
minFraud Legacy services, but you can submit transactions with dummy data.

{{< snippet "snippets/sandbox-limits.md" >}}

### Learn more about the MaxMind Sandbox

{{< snippet "snippets/sandbox-learn-more.md" >}}
