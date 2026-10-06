+++
draft = false
title = 'Geolocate an IP address using Databases'
+++

Geolocating an IP address using GeoIP and GeoLite databases consists of
configuring a database reader and querying the database.

## Implementation

MaxMind offers and highly recommends using
[official client libraries](/geoip/docs/databases#official-client-apis) to query
our databases.

### 1. Install the GeoIP client library

We have a collection of officially supported libraries for you to query with the
GeoIP and GeoLite databases:

{{< snippet "snippets/geoip-client-install.md" >}}

### 2. Configure a GeoIP database reader to query the database

Configuring the database reader requires the database file to be accessible on
the filesystem. After configuring the database reader, you can then query the
database by calling the method corresponding to the database type (e.g. `city`
or `country`) and passing it the IP address you want to look up.

If the lookup succeeds, the method call will return a model class/object for the
database method you called. This model in turn contains multiple record
classes/objects, each of which represents part of the data for the record.

If the request fails, the reader class will throw an exception or return an
error depending on the library.

For more details on database methods, errors, and exceptions,
[see the client API documentation below](#apis-and-third-party-integrations).

{{< codeset >}}

```csharp
using (var reader = new DatabaseReader("path/to/maxmind-database.mmdb"))
{
    var response = reader.City("128.101.101.101");

    Console.WriteLine(response.Country.IsoCode);
}
```

```java
File database = new File("/path/to/maxmind-database.mmdb");

// This reader object should be reused across lookups as creation of it is
// expensive.
DatabaseReader reader = new DatabaseReader.Builder(database).build();

// If you want to use caching at the cost of a small (~2MB) memory overhead:
// new DatabaseReader.Builder(database).withCache(new CHMCache()).build();

InetAddress ipAddress = InetAddress.getByName("128.101.101.101");

CityResponse response = reader.city(ipAddress);

Country country = response.country();
System.out.println(country.isoCode());
```

```javascript
// Asynchronous database opening
import { Reader } from '@maxmind/geoip2-node';

Reader.open('/path/to/maxmind-database.mmdb').then((reader) => {
  const response = reader.city('128.101.101.101');

  console.log(response.country.isoCode);
});

// Synchronous database opening
import { readFileSync } from 'node:fs';
import { Reader } from '@maxmind/geoip2-node';

const dbBuffer = readFileSync('/path/to/maxmind-database.mmdb');

// This reader object should be reused across lookups as creation of it is
// expensive.
const reader = Reader.openBuffer(dbBuffer);

const response = reader.city('128.101.101.101');

console.log(response.country.isoCode);
```

```php
<?php
require_once 'vendor/autoload.php';
use GeoIp2\Database\Reader;

// This reader object should be reused across lookups as creation of it is
// expensive.
$reader = new Reader('/path/to/maxmind-database.mmdb');

$record = $reader->city('128.101.101.101');

print($record->country->isoCode);
```

```python
import geoip2.database

# This reader object should be reused across lookups as creation of it is
# expensive.
with geoip2.database.Reader('/path/to/maxmind-database.mmdb') as reader:
    response = reader.city('128.101.101.101')
    print(response.country.iso_code)
```

```ruby
require 'maxmind/geoip2'

# This reader object should be reused across lookups as creation of it is
# expensive.
reader = MaxMind::GeoIP2::Reader.new(
    database: '/path/to/maxmind-database.mmdb',
)

record = reader.city('128.101.101.101')

puts record.country.iso_code
```

{{< /codeset >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-client-apis.md" >}}
