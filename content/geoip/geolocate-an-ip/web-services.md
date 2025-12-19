---
draft: false
title: Geolocate an IP address using Web Services
---

Geolocating an IP address using GeoIP or GeoLite web services consists of
configuring a web service client, creating a request, and handling the response.

## Implementation

MaxMind offers and highly recommends using
[official client libraries](/geoip/docs/web-services#client-apis) to access our
geolocation services. If you cannot or do not wish to use our client libraries,
please review our
[GeoIP API Documentation page](/geoip/docs/web-services/#request-and-response-api-references)
for details on our REST API.

### 1. Install the GeoIP client library

We have a collection of officially supported libraries for you to interact with
the GeoIP and GeoLite APIs:

{{< codeset >}}

```csharp
// Install via NuGet
Install-Package MaxMind.GeoIP2
```

```java
// Install via Maven, recommended
<dependency>
  <groupId>com.maxmind.geoip2</groupId>
  <artifactId>geoip2</artifactId>
  <version>2.15.0</version>
</dependency>

// Or install via Gradle
repositories {
  mavenCentral()
}
dependencies {
  compile 'com.maxmind.geoip2:geoip2:2.15.0'
}
```

```javascript
// Install via npm
npm install @maxmind/geoip2-node

// Or install via yarn
yarn add @maxmind/geoip2-node
```

```php
# Install via Composer
composer require geoip2/geoip2:~2.0
```

```python
# Install via pip
pip install geoip2
```

```ruby
# Install as a gem
gem install maxmind-geoip2

# Or add this to your Gemfile
gem 'maxmind-geoip2'
```

{{< /codeset >}}

### 2. Create and configure a GeoIP client object

To interact with our API, you need to create a new client object. For this you
will need your MaxMind
[account ID and license key](https://www.maxmind.com/en/accounts/current/license-key).
Our clients also allow you to interact with our GeoLite API, but this requires
additional configuration as demonstrated below:

{{< codeset >}}

```csharp
int accountId = 10;
string licenseKey = "LICENSEKEY";

var client = new WebServiceClient(accountId, licenseKey);

// To query the GeoLite web service, you must set the optional `host` parameter
// to `geolite.info`
var client = new WebServiceClient(accountId, licenseKey, host: "geolite.info");
```

```java
WebServiceClient client = new WebServiceClient.Builder(10, "LICENSEKEY").build();

// To query the GeoLite web service, you must call the `host` method on the
// builder with "geolite.info"
WebServiceClient client = new WebServiceClient.Builder(10, "LICENSEKEY").host("geolite.info").build();
```

```javascript
const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;
// TypeScript:
// import { WebServiceClient } from '@maxmind/geoip2-node';

const accountId = '10';
const licenseKey = 'LICENSEKEY';

const client = new WebServiceClient(accountId, licenseKey);

// To query the GeoLite web service, you must set the optional `host` parameter
const client = new WebServiceClient(accountId, licenseKey, {
  host: 'geolite.info',
});
```

```php
<?php require_once 'vendor/autoload.php'
use GeoIp2\WebService\Client;

$account_id = 10;
$license_key = 'LICENSEKEY';

$client = new Client($account_id, $license_key);

// To query the GeoLite web service, you must set the optional `host` argument.
// The third argument specifies the language preferences when using the `->name`
// method on the model classes that this client creates.
$client = new Client($account_id, $license_key, ['en'], ['host' => 'geolite.info']);
```

```python
import asyncio # for async requests with AsyncClient
import geoip2.webservice

account_id = 10
license_key = 'LICENSEKEY'

# If you want to use synchronous requests
client = Client(account_id, license_key)

# To query the GeoLite web service, you must set the "host" keyword argument
# to "geolite.info"
client = Client(account_id, license_key, host='geolite.info')

# Or if you want to use asynchronous requests
async_client = AsyncClient(account_id, license_key)

# To query the GeoLite web service, you must set the "host" keyword argument
# to "geolite.info"
async_client = AsyncClient(account_id, license_key, host='geolite.info')
```

```ruby
Minfraud.configure do |c|
  c.account_id = 10
  c.license_key = 'LICENSEKEY'

  # To use the GeoLite web service instead of GeoIP, set the host
  # parameter to "geolite.info", eg:
  # host: 'geolite.info'
end
```

{{< /codeset >}}

### 3. Query the desired geolocation service

GeoIP offers 3 services: Insights, City Plus, and Country. GeoLite offers 2
services: City and Country. Each client library has an appropriately named
method for accessing the desired geolocation service.

{{< codeset >}}

```csharp
// If you are making multiple requests, a single WebServiceClient
// should be shared across requests to allow connection reuse. The
// class is thread safe.

int accountId = 10;
string licenseKey = "LICENSEKEY";

// Sync
using (var client = new WebServiceClient(accountId, licenseKey))
{
    // You can also use `client.City` or `client.Insights`
    // `client.Insights` is not available to GeoLite users
    var response = client.Country("128.101.101.101");

    Console.WriteLine(response.Country.IsoCode);        // 'US'
    Console.WriteLine(response.Country.Name);           // 'United States'
    Console.WriteLine(response.Country.Names["zh-CN"]); // '美国'
}

// Async
using (var client = new WebServiceClient(accountId, licenseKey))
{
    // You can also use `client.CityAsync` or `client.InsightsAsync`
    // `client.InsightsAsync` is not available to GeoLite users
    var response = await client.CountryAsync("128.101.101.101");

    Console.WriteLine(response.Country.IsoCode);        // 'US'
    Console.WriteLine(response.Country.Name);           // 'United States'
    Console.WriteLine(response.Country.Names["zh-CN"]); // '美国'
}
```

```java
try (WebServiceClient client = new WebServiceClient.Builder(42, "license_key")
        .build()) {

    InetAddress ipAddress = InetAddress.getByName("128.101.101.101");

    // You can also use `client.city` or `client.insights`
    // `client.insights` is not available to GeoLite users
    CountryResponse response = client.country(ipAddress);

    Country country = response.getCountry();
    System.out.println(country.getIsoCode());            // 'US'
    System.out.println(country.getName());               // 'United States'
    System.out.println(country.getNames().get("zh-CN")); // '美国'
}
```

```javascript
const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;
// Typescript:
// import { WebServiceClient } from '@maxmind/geoip2-node';

// You can also use `client.city` or `client.insights`
// `client.insights` is not available to GeoLite users
client.country('142.1.1.1').then((response) => {
  console.log(response.country.isoCode); // 'CA'
});
```

```php
<?php require_once 'vendor/autoload.php'
use GeoIp2\WebService\Client;

$account_id = 10;
$license_key = 'LICENSEKEY';

$client = new Client($account_id, $license_key);

// You can also use `$client->city` or `$client->insights`
// `$client->insights` is not available to GeoLite users
$record = $client->country('128.101.101.101');

print($record->country->isoCode . "\n");
```

```python
# Sync
import geoip2.webservice

account_id = 10
license_key = 'LICENSEKEY'

with geoip2.webservice.Client(account_id, license_key) as client:
  # You can also use `client.city` or `client.insights`
  # `client.insights` is not available to GeoLite users
  response = client.country('128.101.101.101)

  print(response.country.iso_code)

# Async
import asyncio
import geoip2.webservice

async def main():
  async with geoip2.webservice.AsyncClient(account_id, license_key) as client:
    # You can also use `client.city` or `client.insights`
    # `client.insights` is not available to GeoLite users
    response = await client.country('128.101.101.101)

    print(response.country.iso_code)

asyncio.run(main())
```

```ruby
require 'maxmind/geoip2'

Minfraud.configure do |c|
  c.account_id = 10
  c.license_key = 'LICENSEKEY'
end

# You can also use `client.city` or `client.insights`
# `client.insights` is not available to GeoLite users
record = client.country('128.101.101.101')

puts record.country.iso_code
```

{{< /codeset >}}

## Client APIs

You can find a complete list of official and third-party client APIs on the
[web services documentation page](/geoip/docs/web-services#client-apis).

## Command Line (curl) Examples

{{< snippet "snippets/geoip-curl-examples.md" >}}
