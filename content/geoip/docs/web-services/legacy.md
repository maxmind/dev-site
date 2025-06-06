---
draft: false
title: GeoIP Legacy Web Services
---


{{< alert info >}}
We have implemented recent changes to our GeoIP Legacy web services in line with
the retirement of GeoIP Legacy Databases. Please see our [blog
post](https://blog.maxmind.com/2020/06/data-changes-to-geoip-legacy-and-minfraud-legacy-web-services-in-may-2022/)
for more information.
{{</ alert >}}

{{< alert warning >}}
**Note:** This documentation is for the GeoIP legacy services. New customers do
not have access to these services. Please use the [GeoIP web
services](/geoip/docs/web-services).
{{</ alert >}}

The GeoIP web services allow you to look up information about a given IP address
using an HTTP-based API.

## IP Geolocation Usage

IP geolocation is inherently imprecise. Locations are often near the center of
the population. Any location provided by a GeoIP database should not be used to
identify a particular address or household.

## HTTP-based API

The HTTP API requires you to pass a set of parameters as an HTTP GET or POST.
Results are returned in a simple text format documented below.

We offer several different services, each providing a different amount of
information about the IP address.

All of the services take the same parameters as inputs. The only difference
between them is the URI they use and the data they return. The two parameters
that each service takes are the IP address to look up and
[your MaxMind license key](https://www.maxmind.com/en/accounts/current/license-key).

The parameters should be passed in a query string or as a form post
(application/x-www-form-urlencoded). The IP address parameter should be named
**i** (lower case "I") and the license key should be named **l** (lower case
"L").

The IP address should be passed as a string like "44.55.66.77" or
"2001:db8::2:1".

### Per-Service URIs

The URIs for each service are as follows:

| Service                  | URI                                                 |
| ------------------------ | --------------------------------------------------- |
| Country                  | `https://geoip.maxmind.com/geoip/v1.0/country`      |
| City                     | `https://geoip.maxmind.com/geoip/v1.0/city`         |
| City/ISP/Org             | `https://geoip.maxmind.com/geoip/v1.0/city-isp-org` |
| Insights (formerly Omni) | `https://geoip.maxmind.com/geoip/v1.0/insights`     |

You might also be using the original GeoIP Legacy URIs:

| Service                  | URI                           |
| ------------------------ | ----------------------------- |
| Country                  | `https://geoip.maxmind.com/a` |
| City                     | `https://geoip.maxmind.com/b` |
| City/ISP/Org             | `https://geoip.maxmind.com/f` |
| Insights (formerly Omni) | `https://geoip.maxmind.com/e` |

The `geoip.maxmind.com` hostname automatically picks the data center
geographically closest to you.

### Security

You must access this service via HTTPS. We require TLS 1.2 or greater for HTTPS
requests to our servers to keep your data secure.

### Output

All services return data as a set of comma-separated fields. The ISP name,
Organization name, and AS number fields are quoted, since they may contain a
comma. The other fields are not escaped or quoted, but they will never contain a
comma.

All strings are returned in the
[ISO-8859-1 encoding](https://en.wikipedia.org/wiki/ISO/IEC_8859-1). This
encoding is also referred to as latin1.

{{< rawhtml >}}
<div class="table">
  <table>
    <thead>
      <tr>
        <th colspan="3"></th>
        <th colspan="4">Included in …</th>
      </tr>
      <tr>
        <th>Name</th>
        <th>Type&nbsp;(length)</th>
        <th>Description</th>
        <th>Country?</th>
        <th>City?</th>
        <th>City/ISP/Org?</th>
        <th>Insights (formerly Omni)?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Accuracy radius</td>
        <td>integer</td>
        <td>
          The radius in kilometers around the specified location where the IP address is
  likely to be.
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>YES</td>
      </tr>
      <tr>
        <td>City name</td>
        <td>string</td>
        <td>
          The city or town name as defined by <a href="https://www.geonames.org/">GeoNames</a> associated with the IP address.
        </td>
        <td></td>
        <td>YES</td>
        <td>YES</td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Region code</td>
        <td>string</td>
        <td>
          <p>
    The <a href="https://en.wikipedia.org/wiki/ISO_3166-2">ISO-3166-2</a> code for
    the state/region associated with the IP address.
  </p>

  <p>
    We previously returned a <a href="https://en.wikipedia.org/wiki/FIPS_10-4">FIPS 10-4</a> code for all countries other than the United States and Canada. See our <a href="https://blog.maxmind.com/2020/06/data-changes-to-geoip-legacy-and-minfraud-legacy-web-services-in-may-2022/">blog post detailing changes to our legacy web services</a>.
  </p>
        </td>
        <td></td>
        <td>YES</td>
        <td>YES</td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Region name</td>
        <td>string</td>
        <td>
          The region name as defined by <a href="https://www.geonames.org/">GeoNames</a> associated with the IP address.
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Postal code</td>
        <td>string</td>
        <td>
          The postal code associated with the IP address. These are available for some IP
  addresses in Australia, Canada, France, Germany, Italy, Spain, Switzerland,
  United Kingdom, and the US.  We return the first 3 characters for Canadian
  postal codes.  We return the first 2-4 characters (outward code) for
  postal codes in the United Kingdom.
        </td>
        <td></td>
        <td></td>
        <td>YES</td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Metro code</td>
        <td>integer</td>
        <td>
          <strong>Deprecated</strong>. This is a no-longer-maintained code for targeting 
          advertisements in Google.
        </td>
        <td></td>
        <td></td>
        <td>YES</td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Area code</td>
        <td>string</td>
        <td>
          <p><strong>Deprecated. This field will be empty in the updated legacy web service. See our <a href="https://blog.maxmind.com/2020/06/data-changes-to-geoip-legacy-and-minfraud-legacy-web-services-in-may-2022/">blog post detailing changes to our legacy web services</a>.</strong></p></td>
        <td></td>
        <td></td>
        <td>YES</td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Country code</td>
        <td>string (2)</td>
        <td>
          <p>
    A <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO
    3166-1</a> country code for the country associated with the IP address. In
    addition to the standard codes, we may also return one of the following:
  </p>

  <ul>
    <li>
      <strong>A1</strong> – an anonymous proxy.
    </li>
    <li>
      <strong>A2</strong> – a satellite provider.
    </li>
    <li>
      <strong>EU</strong> – an IP in a block used by
      multiple European countries.
    </li>
    <li>
      <strong>AP</strong> – an IP in a block used by
      multiple Asia/Pacific region countries.
    </li>
  </ul>

  <p>
    The <strong>US</strong> country code is returned for IP addresses associated
    with overseas US military bases.
  </p>

        </td>
        <td>YES</td>
        <td>YES</td>
        <td>YES</td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Country name</td>
        <td>string</td>
        <td>
          The country name as defined by <a href="https://www.geonames.org/">GeoNames</a> associated with the IP address.

        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Continent code</td>
        <td>string (2)</td>
        <td>
          <p>
            A two-character code for the continent associated with the IP
            address. The possible codes are:
          </p>

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
        <td></td>
        <td></td>
        <td></td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Latitude</td>
        <td>decimal</td>
        <td>
          The approximate latitude of the location associated with the network. This value is not precise and should not be used to identify a particular address or household
        </td>
        <td></td>
        <td>YES</td>
        <td>YES</td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Longitude</td>
        <td>decimal</td>
        <td>
          The approximate longitude of the location associated with the network. Latitude and Longitude are often near the center of population. These values are not precise and should not be used to identify a particular address or household.
        </td>
        <td></td>
        <td>YES</td>
        <td>YES</td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Time zone</td>
        <td>string</td>
        <td>
          The time zone associated with the IP address. Time zone names are taken from
  the <a href="https://www.iana.org/time-zones/">IANA time zone database</a>. See
  the <a href="/static/csv/codes/time_zone.csv">list of possible values</a>.

        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>YES</td>
      </tr>
      <tr>
        <td>AS number</td>
        <td>string</td>
        <td>
          The <a href="https://en.wikipedia.org/wiki/Autonomous_system_(Internet)">autonomous system number</a> associated with the IP address.
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>YES</td>
      </tr>
      <tr>
        <td>User type</td>
        <td>enum</td>
        <td>
          <p>

  The user type associated with the IP address. This will be one of the following
  values.

  </p>

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
        <td></td>
        <td></td>
        <td></td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Netspeed</td>
        <td>enum</td>
        <td>
          <p>

  The network speed associated with the IP address. This can be one of the
  following values:

  </p>

  <ul>
    <li><strong>Dialup</strong></li>
    <li><strong>Cable/DSL</strong></li>
    <li><strong>Corporate</strong></li>
    <li><strong>Cellular</strong></li>
  </ul>

        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Domain</td>
        <td>string</td>
        <td>
          The second level domain associated with the IP address. This will be

  something like "example.com" or "example.co.uk", not "foo.example.com".

        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>YES</td>
      </tr>
      <tr>
        <td>ISP name</td>
        <td>string</td>
        <td>
          The name of the ISP associated with the IP address.

        </td>
        <td></td>
        <td></td>
        <td>YES</td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Organization name</td>
        <td>string</td>
        <td>
          The name of the organization associated with the IP address.

        </td>
        <td></td>
        <td></td>
        <td>YES</td>
        <td>YES</td>
      </tr>
      <tr>
        <td>City confidence factor</td>
        <td>string</td>
        <td>
          A value from 0-100 representing our confidence that the city is correct.

        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Region confidence factor</td>
        <td>string</td>
        <td>
          A value from 0-100 representing our confidence that the region is correct.

        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Postal confidence factor</td>
        <td>string</td>
        <td>
          A value from 0-100 representing our confidence that the postal code is correct.

        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Country confidence factor</td>
        <td>string</td>
        <td>
          A value from 0-100 representing our confidence that the country is correct.

        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>YES</td>
      </tr>
      <tr>
        <td>Error code</td>
        <td>string</td>
        <td>
          <p>
            If there was an error or warning with this request, this field
            contains an error code string.
          </p>

          <p>
            The possible error codes are:
          </p>

          <ul>
            <li><strong>PERMISSION_REQUIRED</strong> – This is returned if you do not have permission to use the service. Please <a href="https://support.maxmind.com/hc/en-us/requests/new">contact our support team</a> for more information.</li>
            <li>
              <strong>INVALID_LICENSE_KEY</strong> – This error will be returned
              when the license key you pass is not a valid license key or when your account has run out of queries.
            </li>
            <li><strong>LICENSE_REQUIRED</strong> – The Insight service returns this instead of INVALID_LICENSE_KEY.</li>
            <li>
              <strong>IP_NOT_FOUND</strong> – This error will be returned if the
              IP address it not valid, if it is not public, or if it is not in
              our GeoIP database. It will also be returned if you do not pass an
              IP address at all.
            </li>
          </ul>
        </td>
        <td>YES</td>
        <td>YES</td>
        <td>YES</td>
        <td>YES</td>
      </tr>

    </tbody>
  </table>
</div>
{{</ rawhtml >}}

### Output field order

Since all output is returned as a comma separated string, the order in which
fields are returned must be known in order to parse the result. If the request
is successful, the error field may be omitted entirely, since it always comes
last.

{{< rawhtml >}}
<div class="table">
  <table>
    <thead>
      <tr>
        <th>Service</th>
        <th>Field Order</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Country</td>
        <td>
          <ul>
            <li>Country code</li>
            <li>Error</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>City</td>
        <td>
          <ul>
            <li>Country code</li>
            <li>Region code</li>
            <li>City name</li>
            <li>Latitude</li>
            <li>Longitude</li>
            <li>Error</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>City/ISP/Org</td>
        <td>
          <ul>
            <li>Country code</li>
            <li>Region code</li>
            <li>City name</li>
            <li>Postal code</li>
            <li>Latitude</li>
            <li>Longitude</li>
            <li>Metro code</li>
            <li>Area code</li>
            <li>ISP name</li>
            <li>Organization name</li>
            <li>Error</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Insights</td>
        <td>
          <ul>
            <li>Country code</li>
            <li>Country name</li>
            <li>Region code</li>
            <li>Region name</li>
            <li>City name</li>
            <li>Latitude</li>
            <li>Longitude</li>
            <li>Metro code</li>
            <li>Area code</li>
            <li>Time zone</li>
            <li>Continent code</li>
            <li>Postal code</li>
            <li>ISP name</li>
            <li>Organization name</li>
            <li>Domain</li>
            <li>AS number</li>
            <li>Netspeed</li>
            <li>User type</li>
            <li>Accuracy radius</li>
            <li>Country confidence factor</li>
            <li>City confidence factor</li>
            <li>Region confidence factor</li>
            <li>Postal confidence factor</li>
            <li>Error</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

### Client Code Examples

The examples below are all for the Insights or City/ISP/Org web services. Client
code for other services will be very similar. The only differences are the URI
path and the fields which are returned.

#### Perl

This is an example for the Insights web service.

```perl
#!/usr/bin/env perl

use strict;
use warnings;

use Encode qw( decode );
use Getopt::Long;
use LWP::UserAgent;
use Text::CSV_XS;
use URI;
use URI::QueryParam;

my @fields = qw(
    country_code
    country_name
    region_code
    region_name
    city_name
    latitude
    longitude
    metro_code
    area_code
    time_zone
    continent_code
    postal_code
    isp_name
    organization_name
    domain
    as_number
    netspeed
    user_type
    accuracy_radius
    country_confidence
    city_confidence
    region_confidence
    postal_confidence
    error
);

my $license_key = 'YOUR_LICENSE_KEY';
my $ip_address  = '24.24.24.24';

GetOptions(
    'license:s' => \$license_key,
    'ip:s'      => \$ip_address,
);

my $uri = URI->new('https://geoip.maxmind.com/v1.0/insights');
$uri->query_param( l => $license_key );
$uri->query_param( i => $ip_address );

my $ua = LWP::UserAgent->new( timeout => 5 );
my $response = $ua->get($uri);

die 'Request failed with status ' . $response->code()
    unless $response->is_success();

my $csv = Text::CSV_XS->new( { binary => 1 } );
$csv->parse( decode( 'ISO-8859-1', $response->content() ) );

my %insights;
@insights{@fields} = $csv->fields();

binmode STDOUT, ':encoding(UTF-8)';

if ( defined $insights{error} && length $insights{error} ) {
    die "MaxMind returned an error code for the request: $insights{error}\n";
}
else {
    print "\nMaxMind Insights data for $ip_address\n\n";
    for my $field (@fields) {
        print sprintf( "  %-20s  %s\n", $field, $insights{$field} );
    }
    print "\n";
}
```

#### PHP

This is an example for the Insights web service.

```php
#!/usr/bin/env php

<?php

$params = getopt('l:i:');

if (!isset($params['l'])) $params['l'] = 'YOUR_LICENSE_KEY';
if (!isset($params['i'])) $params['i'] = '24.24.24.24';

$query = 'https://geoip.maxmind.com/v1.0/insights?' . http_build_query($params);

$insights_keys =
  array(
    'country_code',
    'country_name',
    'region_code',
    'region_name',
    'city_name',
    'latitude',
    'longitude',
    'metro_code',
    'area_code',
    'time_zone',
    'continent_code',
    'postal_code',
    'isp_name',
    'organization_name',
    'domain',
    'as_number',
    'netspeed',
    'user_type',
    'accuracy_radius',
    'country_confidence',
    'city_confidence',
    'region_confidence',
    'postal_confidence',
    'error'
    );

$curl = curl_init();
curl_setopt_array(
    $curl,
    array(
        CURLOPT_URL => $query,
        CURLOPT_USERAGENT => 'MaxMind PHP Sample',
        CURLOPT_RETURNTRANSFER => true
    )
);

$resp = curl_exec($curl);

if (curl_errno($curl)) {
    throw new Exception(
        'GeoIP request failed with a curl_errno of '
        . curl_errno($curl)
    );
}

$insights_values = str_getcsv($resp);
$insights_values = array_pad($insights_values, sizeof($insights_keys), '');
$insights = array_combine($insights_keys, $insights_values);

print_r($insights);
```

#### Python 2

This is an example for the Insights web service.

```python
#!/usr/bin/env python

import argparse
import csv
import requests
import sys

fields = ['country_code',
          'country_name',
          'region_code',
          'region_name',
          'city_name',
          'latitude',
          'longitude',
          'metro_code',
          'area_code',
          'time_zone',
          'continent_code',
          'postal_code',
          'isp_name',
          'organization_name',
          'domain',
          'as_number',
          'netspeed',
          'user_type',
          'accuracy_radius',
          'country_confidence',
          'city_confidence',
          'region_confidence',
          'postal_confidence',
          'error']

parser = argparse.ArgumentParser(description='MaxMind Insights web service client')
parser.add_argument('--license', default='YOUR_LICENSE_KEY')
parser.add_argument('--ip', default='24.24.24.24')

args = parser.parse_args()

payload = {'l': args.license, 'i': args.ip};
response = requests.get('https://geoip.maxmind.com/v1.0/insights', params=payload)

if response.status_code != requests.codes.ok:
    sys.stderr.write("Request failed with status %s\n" % response.status_code)
    sys.exit(1)

reader = csv.reader([response.content])

insights = dict(zip(fields, [unicode(s, 'latin_1') for s in reader.next()]))
if len(insights['error']):
    sys.stderr.write("MaxMind returned an error code for the request: %s\n" % insights['error'])
    sys.exit(1)
else:
    print "\nMaxMind Insights data for %s\n\n" % args.ip
    for (key, val) in insights.items():
        print "  %-20s  %s" % (key, val)
    print "\n"
```

#### Python 3

This is an example for the Insights web service.

```python
#!/usr/bin/env python

import argparse
import csv
import requests
import sys

fields = ['country_code',
          'country_name',
          'region_code',
          'region_name',
          'city_name',
          'latitude',
          'longitude',
          'metro_code',
          'area_code',
          'time_zone',
          'continent_code',
          'postal_code',
          'isp_name',
          'organization_name',
          'domain',
          'as_number',
          'netspeed',
          'user_type',
          'accuracy_radius',
          'country_confidence',
          'city_confidence',
          'region_confidence',
          'postal_confidence',
          'error']

parser = argparse.ArgumentParser(description='MaxMind Insights web service client')
parser.add_argument('--license', default='YOUR_LICENSE_KEY')
parser.add_argument('--ip', default='24.24.24.24')

args = parser.parse_args()

payload = {'l': args.license, 'i': args.ip};
response = requests.get('https://geoip.maxmind.com/v1.0/insights', params=payload)

if response.status_code != requests.codes.ok:
    sys.stderr.write("Request failed with status %s\n" % response.status_code)
    sys.exit(1)

reader = csv.reader([response.text])

insights = dict(zip(fields, next(reader)))
if len(insights['error']):
    sys.stderr.write("MaxMind returned an error code for the request: %s\n" % insights['error'])
    sys.exit(1)
else:
    print("\nMaxMind Insights data for %s\n\n" % args.ip)
    for (key, val) in insights.items():
        print("  %-20s  %s" % (key, val))
    print("\n")
```

#### Ruby 1.9

This is an example for the Insights web service.

```ruby
#!/usr/bin/env ruby

require 'csv'
require 'net/http'
require 'open-uri'
require 'optparse'
require 'uri'

fields = [:country_code,
          :country_name,
          :region_code,
          :region_name,
          :city_name,
          :latitude,
          :longitude,
          :metro_code,
          :area_code,
          :time_zone,
          :continent_code,
          :postal_code,
          :isp_name,
          :organization_name,
          :domain,
          :as_number,
          :netspeed,
          :user_type,
          :accuracy_radius,
          :country_confidence,
          :city_confidence,
          :region_confidence,
          :postal_confidence,
          :error]

options = { :license => "YOUR_LICENSE_KEY", :ip => "24.24.24.24" }
OptionParser.new { |opts|
  opts.banner = "Usage: insights-geoip-ws.rb [options]"

  opts.on("-l", "--license LICENSE", "MaxMind license key") do |l|
    options[:license] = l
  end

  opts.on("-i", "--ip IPADDRESS", "IP address to look up") do |i|
    options[:ip] = i
  end
}.parse!

uri = URI::HTTP.build(:scheme => 'https',
                      :host   => 'geoip.maxmind.com',
                      :path   => '/v1.0/insights',
                      :query  => URI.encode_www_form(:l => options[:license],
                                                     :i => options[:ip]))

response = Net::HTTP.get_response(uri)

unless response.is_a?(Net::HTTPSuccess)
  abort "Request failed with status #{response.code}"
end

insights = Hash[fields.zip(response.body.encode('utf-8', 'iso-8859-1').parse_csv)]

if insights[:error]
  abort "MaxMind returned an error code for the request: #{insights[:error]}"
else
  puts
  puts "MaxMind Insights data for #{options[:ip]}";
  puts
  insights.each { |key, val| printf "  %-20s  %s\n", key, val }
  puts
end
```

#### Java

This is an example for the Insights web service.

```java
import java.net.MalformedURLException;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class InsightsReader {
    public static void main(String[] args) throws Exception {
        String license_key = "YOUR_LICENSE_KEY";
        String ip_address = "24.24.24.24";

        String url_str = "https://geoip.maxmind.com/v1.0/insights?l=" + license_key + "&i=" + ip_address;

        URL url = new URL(url_str);
        BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
        String inLine;

        while ((inLine = in.readLine()) != null) {
            // Alternatively use a CSV parser here.
            Pattern p = Pattern.compile("\"([^\"]*)\"|(?<=,|^)([^,]*)(?:,|$)");
            Matcher m = p.matcher(inLine);

            List<String> fields = new ArrayList<String>();
            String f;
            while (m.find()) {
                f = m.group(1);
                if (f!=null) {
                    fields.add(f);
                }
                else {
                    fields.add(m.group(2));
                }
            }

            String countrycode = fields.get(0);
            String countryname = fields.get(1);
            String regioncode = fields.get(2);
            String regionname = fields.get(3);
            String city = fields.get(4);
            String lat = fields.get(5);
            String lon = fields.get(6);
            String metrocode = fields.get(7);
            String areacode = fields.get(8);
            String timezone = fields.get(9);
            String continent = fields.get(10);
            String postalcode = fields.get(11);
            String isp = fields.get(12);
            String org = fields.get(13);
            String domain = fields.get(14);
            String asnum = fields.get(15);
            String netspeed = fields.get(16);
            String usertype = fields.get(17);
            String accuracyradius = fields.get(18);
            String countryconf = fields.get(19);
            String cityconf = fields.get(20);
            String regionconf = fields.get(21);
            String postalconf = fields.get(22);
            String error = fields.get(23);
        }

        in.close();
    }
}
```

#### C#

This is an example for the Insights web service.

```csharp
// Contributed by Gokhan Saltik
private string GetMaxMindInsightsData(string IP) {
  System.Uri objUrl = new System.Uri("https://geoip.maxmind.com/v1.0/insights?l=YOUR_LICENSE_KEY&i=" + IP);
  System.Net.WebRequest objWebReq;
  System.Net.WebResponse objResp;
  System.IO.StreamReader sReader;
  string strReturn = string.Empty;

  try
    {
      objWebReq = System.Net.WebRequest.Create(objUrl);
      objResp = objWebReq.GetResponse();

      sReader = new System.IO.StreamReader(objResp.GetResponseStream());
      strReturn = sReader.ReadToEnd();

      sReader.Close();
      objResp.Close();
    }
  catch (Exception ex)
    {
    }
  finally
    {
      objWebReq = null;
    }

  return strReturn;
}

```

#### VB.Net

This is an example for the City/ISP/Org web service.

```vbnet
' Contributed by Rubens A. Lucca
Private Function ReturnData(ByVal IP As String) As String
        Dim objUrl As New System.Uri("https://geoip.maxmind.com/v.10/city-isp-org?l=YOUR_LICENSE_KEY&i=" & IP)
        Dim objWebReq As System.Net.WebRequest
        Dim objResp As System.Net.WebResponse
        Dim sReader As System.IO.StreamReader
        Dim strReturn As String

        'Try to connect to the server and retrieve data.
        Try
            objWebReq = System.Net.WebRequest.Create(objUrl)
            objResp = objWebReq.GetResponse

            'Get the data and store in a return string.
            sReader = New System.IO.StreamReader(objResp.GetResponseStream)
            strReturn = sReader.ReadToEnd

            'Close the objects.
            sReader.Close()
            objResp.Close()
        Catch ex As Exception
        Finally
            objWebReq = Nothing
        End Try

        Return strReturn

    End Function
```

#### Cold Fusion

This is an example for the City/ISP/Org web service.

```xml
<!--- contributed by reinhard jung --->
<cfhttp method="get" url="https://geoip.maxmind.com/v1.0/city-isp-org?l=LicenceKey&i=#CGI.REMOTE_ADDR#"></cfhttp>
<cfset resultMaxMind = cfhttp.FileContent>

<!--- create Array --->
<cfset qMaxMindByID = structNew()/>
<cfset qMaxMindByName = structNew()/>
<cfset thisField = "country,region,city,postal,latitude,longitude,metroCode,area,ISP,organization"/>
<cfset thisPos = 1/>
<cfset thisValue = ""/>
<cfset stringField = "false"/>
<cfloop from="1" to="#Len(resultMaxMind)#" index="mmField">
        <cfif mid(resultMaxMind,mmField,1) IS ',' AND NOT stringField>
                <cfset qMaxMindByID[thisPos] = thisValue>
                <cfset qMaxMindByName['#ListgetAt(thisField,thisPos)#'] = thisValue>
                <cfset thisPos = thisPos +1/>
                <cfset thisValue = ""/>
        <cfelse>
                <cfif mid(resultMaxMind,mmField,1) IS '"'>
                        <cfset stringField = iif(stringField,"false","true")/>
                <cfelse>
                        <cfset thisValue = thisValue &mid(resultMaxMind,mmField,1)/>
                </cfif>
        </cfif>
        <cfif Len(resultMaxMind) EQ mmField>
                <cfset qMaxMindByID[thisPos] = thisValue/>
                <cfset qMaxMindByName['#ListgetAt(thisField,thisPos)#'] = thisValue>
        </cfif>
</cfloop>

<!--- access Array --->
<br /><cfoutput>#qMaxMindByID[3]#</cfoutput>
<br /><cfoutput>#qMaxMindByName['city']#</cfoutput>

<!--- dump Array for overview --->
<cfdump var="#qMaxMindByID#" label="qMaxMindByID"><br />
<cfdump var="#qMaxMindByName#" label="qMaxMindByName"><br />
```

#### ASP

This is an example for the City/ISP/Org web service.

```vbnet
Dim objHttp, strQuery
strQuery = "https://geoip.maxmind.com/v1.0/city-isp-org?l=" & license_key & "&i=" & ipaddress
set objHttp = Server.CreateObject("Msxml2.ServerXMLHTTP")
objHttp.open "GET", strQuery, false
objHttp.send
Response.Write objHttp.ResponseText
Set objHttp = Nothing
```

#### VBScript

This is an example for the City/ISP/Org web service.

```basic
Set request = Server.CreateObject("AspHTTP.Conn")
request.Url = "https://geoip.maxmind.com/v1.0/city-isp-org?l=" & license_key & "&i=" & ip_address
request.RequestMethod = "GET"
string = request.GetURL
data = Split(string, ",")
country = arr(0)
region = arr(1)
city = arr(2)
postal = arr(3)
latitude = arr(4)
longitude = arr(5)
metro_code = arr(6)
area_code = arr(7)
isp = arr(8)
organization = arr(9)
error = arr(10)
```
