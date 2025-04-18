---
draft: false
title: Importing GeoIP and GeoLite databases to PostgreSQL
---

This guide will show you how to import GeoIP or GeoLite databases into
PostgreSQL so that they can be easily queried and manipulated on your server.

Importing a CSV database consists of downloading the database, extracting it,
creating tables to hold the data, and indexing those tables for faster querying.

## Download and extract the database

Begin by making sure you have downloaded the latest version of the GeoIP or
GeoLite database that you want to import. You can
[download databases through your account portal](https://www.maxmind.com/en/accounts/current/geoip/downloads).
CSV format databases are shipped as a single zip file. See our CSV database
documentation for details about the zip structure and contents of the archive.
For the purposes of this tutorial, we will be using the
[GeoIP City CSV file](/geoip/docs/databases/city-and-country/#csv-databases),
but you can get information about
[any of our CSV format databases](/geoip/docs/databases) and adapt the following
instructions accordingly.

### Keep your database updated

If you are importing databases for use in an ongoing manner, you will want to
[automate the process of downloading and extracting the CSV files](/geoip/updating-databases/#directly-downloading-databases)
so that you can be sure that your database is always up to date.

### Extract the CSV files

Once you have downloaded the database, unpack the zip file in your desired
directory. If you are importing the GeoIP City database, you will have a number
of files. In this tutorial we will be working with the following files:

- `GeoIP2-City-Blocks-IPv4.csv`
- `GeoIP2-City-Blocks-IPv6.csv`
- `GeoIP2-City-Locations-en.csv`

If you are working in a language other than English, you can choose the
appropriate `Locations` file from the zip archive. For example, if you want to
load Chinese location names into PostgreSQL, you can use
`GeoIP2-City-Locations-zh-CN.csv` instead of `GeoIP2-City-Locations-en.csv`. Our
documentation on CSV format databases includes a
[list of all location files currently included in GeoIP and GeoLite databases](/geoip/docs/databases/city-and-country/#locations-files).

## Create a table for network data

First we create a table to hold the network information contained in
`GeoIP2-City-Blocks-IPv4.csv` and `GeoIP2-City-Blocks-IPv6.csv`.

### Network table schema

You can find the full description of the schema for these files in
[the section on `Blocks` files for GeoIP and GeoLite CSV databases](/geoip/docs/databases/city-and-country/#blocks-files).
If you are working with a different database, you can find the `Blocks` file
schema [for the appropriate database](/geoip/docs/databases), and adapt the
table to meet that structure.

<Alert type="warning">

Please note that we may add additional columns to the CSV version of our GeoIP
databases at any time. Ideally, you will design any automated integration to
check the columns of the CSV and build your table schema based on the actual
columns, or remove columns from the CSV that you don't need before importing.

The specific method for comparing the columns in the CSV file against the table
schema will depend on the language you're working with and how you wish to
handle additional data.

</Alert>

In this tutorial we will be creating a table to hold our network data called
`geoip2_network`. Note that we will be using PostgreSQL's
[`cidr`](https://www.postgresql.org/docs/current/datatype-net-types.html) type
for the `network` column. This will allow us to to query the database more
easily.

```sql
create table geoip2_network (
  network cidr not null,
  geoname_id int,
  registered_country_geoname_id int,
  represented_country_geoname_id int,
  is_anonymous_proxy bool,
  is_satellite_provider bool,
  postal_code text,
  latitude numeric,
  longitude numeric,
  accuracy_radius int,
  is_anycast bool
);
```

### Load data into the network table

We can now import the contents of `GeoIP2-City-Blocks-IPv4.csv` and
`GeoIP2-City-Blocks-IPv6.csv` into the table we just created:

```sql
\copy geoip2_network from 'GeoIP2-City-Blocks-IPv4.csv' with (format csv, header);
```

```sql
\copy geoip2_network from 'GeoIP2-City-Blocks-IPv6.csv' with (format csv, header);
```

If there are errors such as `missing data for column` or
`extra data after last expected column`, alter the table to meet the CSV file
structure.

### Test our table by querying it

Remember that the table we created uses PostgreSQL's
[cidr](https://www.postgresql.org/docs/current/datatype-net-types.html) type for
the `network` column. This built-in type represents IPv4 and IPv6 networks and
provides
[operations](https://www.postgresql.org/docs/current/functions-net.html) to
(among other things) determine if a given host address is contained in a
network. For example:

```sql
select '192.168.0.0/24'::cidr >>= '192.168.0.1'; -- true
select '192.168.0.0/24'::cidr >>= '192.168.1.1'; -- false
```

We can use that to look up the `geoip2_network` entry for a given IP address
like so:

```sql
select * from geoip2_network where network >>= '214.0.0.0';
```

Which gives a result of:

```markdown
-[ RECORD 1 ]------------------+-------------
network                        | 214.0.0.0/16
geoname_id                     | 6252001
registered_country_geoname_id  | 6252001
represented_country_geoname_id |
is_anonymous_proxy             | f
is_satellite_provider          | f
postal_code                    |
latitude                       | 37.7510
longitude                      | -97.8220
accuracy_radius                | 1000
is_anycast                     | f

Time: 227.970 ms
```

### Index our table for faster searching

We can now look up an individual IP address's `latitude`, `longitude`, and
`accuracy_radius`. To improve our query speed, we'll create an index using
PostgreSQL's
[GiST](https://www.postgresql.org/docs/current/textsearch-indexes.html) indexing
method. For historical reasons, we also have to specify the
[inet_ops](https://www.postgresql.org/docs/9.5/gist-builtin-opclasses.html)
operator class:

```sql
create index on geoip2_network using gist (network inet_ops);
```

With that change we observe that the same query runs a lot faster:

```sql
select * from geoip2_network net where network >>= '214.0.0.0';
```

Which gives a result of:

```markdown
-[ RECORD 1 ]------------------+-------------
network                        | 214.0.0.0/16
geoname_id                     | 6252001
registered_country_geoname_id  | 6252001
represented_country_geoname_id |
is_anonymous_proxy             | f
is_satellite_provider          | f
postal_code                    |
latitude                       | 37.7510
longitude                      | -97.8220
accuracy_radius                | 1000
is_anycast                     | f

Time: 9.869 ms
```

You can now geolocate IP addresses using `latitude`, `longitude`, and
`accuracy_radius`. For more information about how to understand the
`accuracy_radius` field, see the
[article on geolocation accuracy our knowledge base](https://support.maxmind.com/hc/en-us/articles/4407630607131-Geolocation-Accuracy).

## Optional: Create a table for locations data

If `postal_code`, `latitude`, `longitude`, and `accuracy_radius` are everything
we're interested in we'd be done at this point and our application would be
easily able to query what it needs. However, GeoIP databases provide additional
location information. Note the `geoname_id` field in our network table. This
field can be used to look up additional information about the geolocation from
the `Locations` files we downloaded before. We'll load this data into PostgreSQL
next.

### Locations table schema

We start by creating a table as before. As with the `Blocks` files, the schema
for GeoIP and GeoLite City locations files can be found in the
[CSV section of the database documentation](/geoip/docs/databases/city-and-country/#locations-files).

We'll name this table `geoip2_location`:

```sql
create table geoip2_location (
  geoname_id int not null,
  locale_code text not null,
  continent_code text,
  continent_name text,
  country_iso_code text,
  country_name text,
  subdivision_1_iso_code text,
  subdivision_1_name text,
  subdivision_2_iso_code text,
  subdivision_2_name text,
  city_name text,
  metro_code int,
  time_zone text,
  is_in_european_union bool not null,
  primary key (geoname_id, locale_code)
);
```

### Load data into the locations table

We then populate our `geoip2_location` table from a `Locations` CSV file. In
this case we will be populating the table from `GeoIP2-City-Locations-en.csv`.
Using the file with the `-en` suffix will give us the names of geolocations in
English:

```sql
\copy geoip2_location from 'GeoIP2-City-Locations-en.csv' with (format csv, header);
```

Note that there's a number of different `Locations` files available. The other
files with different language suffixes contain localized versions of the `-en`
data in different languages for some of the `geoname_id`s. Depending on your
application's needs you may decide to import additional `Locations` files into
localized tables. For example, you could load `GeoIP2-City-Locations-en.csv`
into a table called `geoip2_location-en`, and load
`GeoIP2-City-Locations-zh-CN.csv` into a table called `geoip2_location-zh`. You
could then query whichever locations table you needed for English or Chinese
respectively.

### Query our tables

We can now use our `geoip2_location` table to resolve the `geoname_id`s provided
by our `geoip2_network` table. For example:

```sql
select latitude, longitude, accuracy_radius, continent_name, country_name, subdivision_1_name, city_name
from geoip2_network net
left join geoip2_location location on (
  net.geoname_id = location.geoname_id
  and location.locale_code = 'en'
)
where network >>= '214.0.0.0';
```

Which gives a result of:

```markdown
-[ RECORD 1 ]------+--------------
latitude           | 37.7510
longitude          | -97.8220
accuracy_radius    | 1000
continent_name     | North America
country_name       | United States
subdivision_1_name |
city_name          |
```

Here we were only interested in English results, but we can adjust our join
condition if we were interested in different or additional languages.

Note how a left outer join is used. This is because additional location
information might not be available for any given row of our `geoip2_network`
table. For example, some IP addresses cannot be resolved to a city or
subdivision. With the left join we'd still receive `latitude`, `longitude`, and
`accuracy_radius` as a result of our query if available, while an inner join
would result in zero rows if no additional location information was available.

In addition to the `geoname_id` column that provides location information for a
network, there's also `registered_country_geoname_id` and
`represented_country_geoname_id`, which provide location information about the
country in which the ISP has registered the network, and the country which is
represented by users of the IP address, respectively. The location data for both
can be included by additional joins:

```sql
select latitude, longitude, accuracy_radius,
       location.continent_name as location_continent_name,
       location.country_name as location_country_name,
       location.subdivision_1_name as location_subdivision_1_name,
       location.city_name as location_city_name,
       registered_country.continent_name as registered_country_continent_name,
       registered_country.country_name as registered_country_country_name,
       represented_country.continent_name as represented_country_continent_name,
       represented_country.country_name as represented_country_country_name
from geoip2_network net
left join geoip2_location location on (
  net.geoname_id = location.geoname_id
  and location.locale_code = 'en'
)
left join geoip2_location registered_country on (
  net.registered_country_geoname_id = registered_country.geoname_id
  and registered_country.locale_code = 'en'
)
left join geoip2_location represented_country on (
  net.represented_country_geoname_id = represented_country.geoname_id
  and represented_country.locale_code = 'en'
)
where network >>= '214.0.0.0';
```

Which gives a result of:

```markdown
-[ RECORD 1 ]----------------------+--------------
latitude                           | 37.7510
longitude                          | -97.8220
accuracy_radius                    | 1000
location_continent_name            | North America
location_country_name              | United States
location_subdivision_1_name        |
location_city_name                 |
registered_country_continent_name  | North America
registered_country_country_name    | United States
represented_country_continent_name |
represented_country_country_name   |
```
