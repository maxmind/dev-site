---
draft: false
title: Proxy Detection Legacy Web Service
---

{{< alert warning >}}
To learn more about the risk associated with a particular IP address, use the
[minFraud Score service](/minfraud/evaluate-a-transaction/). This service provides the IP Risk Score, a
replacement for the proxyScore. To identify anonymous IP addresses in support
of geotargeting and ad serving environments, we recommend using the
[GeoIP Anonymous IP database](https://www.maxmind.com/en/geoip2-anonymous-ip-database).
{{</ alert >}}

The proxy detection web service provides a score measuring the risk associated
with an IP address. It is called the IP risk score in our current minFraud
services.
[Learn more about the IP risk score on our knowledge base.](https://support.maxmind.com/hc/en-us/articles/4408382525851-IP-Risk-Score)

## Release Notes

Changes to the proxy detection web service are documented in our
[release notes](/minfraud/release-notes).

## Device Tracking Add-on

You may optionally include in your site
[some JavaScript](/minfraud/track-devices) that helps us identify the device
your customer is using to determine whether it has been used in previous
fraudulent transactions. The device information passed to MaxMind via the Device
Tracking Add-on is factored into the proxyScore returned when you query the HTTP
API.

## HTTP-based API

This web service uses the same hostnames as our [minFraud](/minfraud) web
service. Its URI is `https://minfraud.maxmind.com/app/ipauth_http`

The `minfraud.maxmind.com` hostname automatically picks the data center
geographically closest to you.

## Security

The API is only available via HTTPS. If you attempt to access this service via
HTTP, you will receive a `403 Forbidden` HTTP response.

We require TLS 1.2 or greater for all requests to our servers to keep your data
secure.

## Input

The API requires you to pass a set of parameters as an HTTP GET or POST. Results
are returned in a simple text format documented below.

The three parameters that this service takes are the IP address to look up, the
shopID and
[your MaxMind license key](https://www.maxmind.com/en/accounts/current/license-key).

The shopID is your internal ID for the shop, affiliate, or merchant this order
is coming from, and is required for customers who are resellers, payment
providers, gateways and affiliate networks.

The parameters should be passed in a query string or as a form post
(application/x-www-form-urlencoded). The IP address parameter should be named
`i` (lower case "I"), the shopID parameter should be named `shopID` and the
license key should be named `l` (lower case "L").

The IP address should be passed as a string like "44.55.66.77".

## Output

This service returns data as a set of comma-separated fields. The individual
fields are not escaped or quoted, but they will never contain a comma.

All strings are returned as ASCII.

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
            <td>proxyScore</td>
            <td>decimal</td>
            <td>
               A score from 0.00-4.00 indicating the likelihood that the user's IP address is
               an anonymous proxy, open proxy, or VPN.
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
               A proxyScore of 0.00 will be returned for a corporate proxy or private IP and an empty
               string will be returned for an invalid IP.
            </td>
         </tr>
         <tr>
            <td>err</td>
            <td>enum</td>
            <td>
               <p>
                  If there was an error or warning with this request, this field
                  contains an error code string.
               </p>
               <p>
                  The possible error codes are:
               </p>
               <ul>
                  <li>`PERMISSION_REQUIRED` – You do not have permission to use the service. Please <a href="https://support.maxmind.com/hc/en-us/requests/new">contact our support team</a> for more information.</li>
                  <li>
                     `LICENSE_REQUIRED` – You must provide a license key.
                  </li>
                  <li>
                     `INVALID_LICENSE_KEY` – The license key provided is invalid.
                  </li>
                  <li>
                     `MAX_REQUESTS_REACHED` – This error will be returned
                     if your account is out of queries or if an invalid license key is
                     provided.
                  </li>
               </ul>
            </td>
         </tr>
      </tbody>
   </table>
</div>
{{</ rawhtml >}}

## Client Code Examples

Below are some sample clients for this web service.

{{< codeset >}}

```perl
#!/usr/bin/env perl

use strict;
use warnings;

use Encode qw( decode );
use Getopt::Long;
use LWP::UserAgent;
use URI;
use URI::QueryParam;

my $license_key = 'YOUR_LICENSE_KEY';
my $ip_address  = '24.24.24.24';

GetOptions(
    'license:s' => \$license_key,
    'ip:s'      => \$ip_address,
);

my $uri = URI->new('https://minfraud.maxmind.com/app/ipauth_http');
$uri->query_param( l => $license_key );
$uri->query_param( i => $ip_address );

my $ua = LWP::UserAgent->new( timeout => 5 );
my $response = $ua->get($uri);

die 'Request failed with status ' . $response->code()
    unless $response->is_success();

my %proxy = map { split /=/, $_ } split /;/, $response->content();

if ( defined $proxy{err} && length $proxy{err} ) {
    die "MaxMind returned an error code for the request: $proxy{err}\n";
}
else {
    print "\nMaxMind Proxy data for $ip_address\n\n";
    for my $field ( sort keys %proxy ) {
        print sprintf( "  %-20s  %s\n", $field, $proxy{$field} );
    }
    print "\n";
}
```

```python
#!/usr/bin/env python

import argparse
import requests
import sys

parser = argparse.ArgumentParser(description='MaxMind Proxy Detection web service client')
parser.add_argument('--license', default='YOUR_LICENSE_KEY')
parser.add_argument('--ip', default='24.24.24.24')

args = parser.parse_args()

payload = {'l': args.license, 'i': args.ip};
response = requests.get('https://minfraud.maxmind.com/app/ipauth_http', params=payload)

if response.status_code != requests.codes.ok:
    sys.stderr.write("Request failed with status %s\n" % response.status_code)
    sys.exit(1)

proxy = dict( f.split('=') for f in response.text.split(';') )

if 'err' in proxy and len(proxy['err']):
    sys.stderr.write("MaxMind returned an error code for the request: %s\n" % proxy['err'])
    sys.exit(1)
else:
    print "\nMaxMind Proxy data for %s\n\n" % args.ip
    for (key, val) in proxy.items():
        print "  %-20s  %s" % (key, val)
    print "\n"
```

```php
#!/usr/bin/php

<?php
$license_key = 'LICENSE_KEY_HERE';
$ipaddress   = 'IP_ADDRESS_HERE';
$query = "https://minfraud.maxmind.com/app/ipauth_http?l=" . $license_key
    . "&i=" . $ipaddress;
$score = file_get_contents($query);
echo $score;
```

```vb.net
Dim objHttp, strQuery
strQuery = "https://minfraud.maxmind.com/app/ipauth_http?l=" & license_key & _
    "&i=" & ipaddress
set objHttp = Server.CreateObject("Msxml2.ServerXMLHTTP")
objHttp.open "GET", strQuery, false
objHttp.send
Response.Write objHttp.ResponseText
Set objHttp = Nothing
```

{{</ codeset >}}
