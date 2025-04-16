---
draft: false
title: GeoIP and GeoLite Web Services Documentation
---

## Overview

To learn more about the GeoIP web services and to purchase credits, please view
our
[GeoIP web services page](https://www.maxmind.com/en/geoip2-precision-services).

If you are interested in minFraud Insights or minFraud Factors web services,
which also contain GeoIP Insights data, please
[contact our Enterprise Business team](https://www.maxmind.com/en/sales-contact?comments=I+am+interested+in+minFraud+Factors.&interested_in=minfraud)
for assistance. To better understand the differences between each minFraud
service, review our
[minFraud Service Plans and Pricing page](https://www.maxmind.com/en/solutions/fraud-prevention/plans-pricing)
and the Response Body section below.

## Client APIs

### Official Client APIs


{{< rawhtml >}}
<div class="table">
  <table>
    <thead>
      <tr>
        <th>Language or Framework</th>
        <th>Package Repository</th>
        <th>Documentation</th>
        <th>Version Control</th>
      </tr>
    </thead>
    <tbody>
     <tr>
        <td>.NET (C#)</td>
        <td><a href="https://www.nuget.org/packages/MaxMind.GeoIP2/">NuGet</a></td>
        <td><a href="https://maxmind.github.io/GeoIP2-dotnet/">GitHub Pages</a></td>
        <td><a href="https://github.com/maxmind/GeoIP2-dotnet">GitHub</a> </td>
      </tr>
      <tr>
        <td>Java</td>
        <td><a href="https://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.maxmind.geoip2%22%20AND%20a%3A%22geoip2%22">Maven Central</a></td>
        <td><a href="https://maxmind.github.io/GeoIP2-java/">GitHub Pages</a></td>
        <td><a href="https://github.com/maxmind/GeoIP2-java">GitHub</a></td>
      </tr>
      <tr>
        <td>JavaScript (browser)</td>
        <td></td>
        <td><a href="/geoip/geolocate-an-ip/client-side-javascript">API Docs</a></td>
        <td></td>
      </tr>
      <tr>
        <td>Node.js </td>
        <td><a href="https://npmjs.com/package/@maxmind/geoip2-node">NPM</a> </td>
        <td><a href="https://maxmind.github.io/GeoIP2-node/">GitHub Pages</a></td>
        <td><a href="https://github.com/maxmind/GeoIP2-node">GitHub</a></td>
      </tr>
      <tr>
        <td>Perl (deprecated)</td>
        <td><a href="https://metacpan.org/release/GeoIP2">CPAN</a></td>
        <td><a href="https://metacpan.org/release/GeoIP2">MetaCPAN</a></td>
        <td><a href="https://github.com/maxmind/GeoIP2-perl">GitHub</a></td>
      </tr>
      <tr>
        <td>PHP</td>
        <td><a href="https://packagist.org/packages/geoip2/geoip2">Packagist</a></td>
        <td><a href="https://maxmind.github.io/GeoIP2-php/">GitHub Pages</a></td>
        <td><a href="https://github.com/maxmind/GeoIP2-php">GitHub</a></td>
      </tr>
      <tr>
        <td>Python</td>
        <td><a href="https://pypi.python.org/pypi/geoip2">PyPI</a></td>
        <td><a href="https://geoip2.readthedocs.org/en/latest/">Read the Docs</a></td>
        <td><a href="https://github.com/maxmind/GeoIP2-python">GitHub</a></td>
      </tr>
      <tr>
        <td>Ruby</td>
        <td><a href="https://rubygems.org/gems/maxmind-geoip2">RubyGems</a></td>
        <td><a href="https://www.rubydoc.info/gems/maxmind-geoip2">RubyDoc</a></td>
        <td><a href="https://github.com/maxmind/GeoIP2-ruby">GitHub</a></td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

### Third-Party Client APIs

{{< alert warning >}}
  **_Use at your own risk._** MaxMind does not offer support for these APIs and
  has not reviewed the code.
{{</ alert >}}

{{< rawhtml >}}
<div class="table">
  <table>
    <thead>
      <tr>
        <th>Language or Framework</th>
        <th>Package Repository</th>
        <th>Documentation</th>
        <th>Version Control</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Go</td>
        <td></td>
        <td><a href="https://godoc.org/github.com/savaki/geoip2">GoDoc</a></td>
        <td><a href="https://github.com/savaki/geoip2">GitHub</a></td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

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
- Your traceroute to `geoip.maxmind.com`

[You can submit your support request on our knowledge base.](https://support.maxmind.com/hc/en-us/requests/new)

## Command Line (curl) Examples

{{< snippet "snippets/geoip-curl-examples.md" >}}

## IP Geolocation Accuracy

{{< alert warning >}}
  **IP Geolocation Usage**

IP geolocation is inherently imprecise. Locations are often near the center of
the population. Any location provided by a GeoIP database should not be used to
identify a particular address or household.
{{</ alert >}}

Use the Accuracy Radius as an indication of geolocation accuracy for the
latitude and longitude coordinates we return for an IP address. The actual
location of the IP address is likely within the area defined by this radius and
the latitude and longitude coordinates.

## Versioning

The GeoIP web services use two part versions. Our current release is version
2.1. The major version number will remain at 2 for the foreseeable future and
will not change unless we are releasing an entirely new product ("GeoIP3").

The minor version will only change if there are breaking changes in the web
service. A breaking change is one that breaks client code that follows the
documentation on this page. Breaking changes include changing the type of an
existing field, deleting a field entirely, or changing URIs.

All changes to the web services will be documented in the
[GeoIP release notes](/geoip/release-notes), whether or not the version number
is changed.

The following changes are not considered to be breaking changes and will not be
accompanied by a version number change:

- Adding a new field, either at the top level of the structure or in one
  particular object such as the country or city. Client code should be written
  to allow for new fields to appear.
- Adding new values to enum fields such as `user_type`. Note that this also
  applies to fields such as country codes, country subdivision codes, time
  zones, etc.
- Adding a new language for localized names. We may add additional locale codes
  in the future.
- Adding or removing error codes, and/or changing the body type for an error.
  Client code should always check the `Content-Type` header for any error
  response. Client code should also be prepared to handle any valid HTTP 4xx or
  5xx status code.
- Adding a new service. If we add a GeoIP Inter-Galactic service, we will use a
  new path such as `/geoip/v2.1/inter-galactic`. This should not break any
  existing client code.
