---
draft: false
title: Importing GeoIP and GeoLite databases to MySQL
---

{{< alert warning >}}

On Wednesday, November 27, 2024 we updated this tutorial to address an issue in
which some IPv4 and IPv6 addresses could overlap. If you used a version of this
tutorial prior to that date, please consult the updated instructions for
querying the data in the following sections below:

- [Test our table by querying it](#test-our-table-by-querying-it)
- [Order the table for faster searching](#order-the-table-for-faster-searching)
- [Break up our query for faster searching](#break-up-our-query-for-faster-searching)

{{</ alert >}}

This guide will show you how to import GeoIP or GeoLite databases into MySQL
so that they can be easily queried and manipulated on your server.

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
load Chinese location names into MySQL, you can use
`GeoIP2-City-Locations-zh-CN.csv` instead of `GeoIP2-City-Locations-en.csv`. Our
documentation on CSV format databases includes a
[list of all location files currently included in GeoIP and GeoLite databases](/geoip/docs/databases/city-and-country/#locations-files).

## Create a table for network data

First we create a table to hold the network information contained in
`GeoIP2-City-Blocks-IPv4.csv` and `GeoIP2-City-Blocks-IPv6.csv`.

## Converting the network field

You can find the full description of the schema for these files in
[the section on `Blocks` files for GeoIP and GeoLite CSV databases](/geoip/docs/databases/city-and-country/#blocks-files).
If you are working with a different database, you can find the `Blocks` file
schema [for the appropriate database](/geoip/docs/databases), and adapt the
table to meet that structure.

The `network` field of the database uses CIDR notation. Unfortunately MySQL
doesn't offer any capabilities to work with data in that format, so we'll first
have to convert the networks into something else that we can easily query later
on. We chose to represent networks as a pair of IP addresses that are the first
and last address in the network, respectively. We will convert this field so
that both of these IP addresses will be represented as hexadecimal numbers.

We can use the
[database conversion tool](/geoip/docs/databases/city-and-country/#conversion-utility)
to convert this field to hexadecimal numbers. Once you have downloaded the
program and installed it to the same directory where you have extracted your CSV
files, you can run it:

```sh
$ ./geoip2-csv-converter -block-file GeoIP2-City-Blocks-IPv4.csv -include-hex-range -output-file GeoIP2-City-Blocks-IPv4-Hex.csv
$ ./geoip2-csv-converter -block-file GeoIP2-City-Blocks-IPv6.csv -include-hex-range -output-file GeoIP2-City-Blocks-IPv6-Hex.csv
```

## Schema

We can now create a table called `geoip2_network`to hold the data we just
converted. We'll represent the IP addresses using the type `varbinary(16)`,
which will be large enough to represent 128-bit (16 byte) IPv6 addresses.

```sql
create table geoip2_network (
  network_start varbinary(16) not null,
  network_end varbinary(16) not null,
  geoname_id int,
  registered_country_geoname_id int,
  represented_country_geoname_id int,
  is_anonymous_proxy bool,
  is_satellite_provider bool,
  postal_code text,
  latitude float,
  longitude float,
  accuracy_radius int,
  is_anycast bool,
  index(network_start),
  index(network_end)
);
```

Note that we're adding two separate indexes for `network_start` and
`network_end`. If we used a composite index over both columns, we wouldn't be
able to speed up the queries we'll be using later on.

### Load data into the network table

We can now import the contents of `GeoIP2-City-Blocks-IPv4.csv` and
`GeoIP2-City-Blocks-IPv6.csv` into the table we just created.

We'll start by loading the converted IPv6 data:

```sql
load data infile '/var/lib/mysql-files/GeoIP2-City-Blocks-IPv6-Hex.csv'
into table geoip2_network
fields terminated by ',' enclosed by '"' lines terminated by '\n' ignore 1 rows
(@network_start, @network_end, @geoname_id, @registered_country_geoname_id, @represented_country_geoname_id,
 @is_anonymous_proxy, @is_satellite_provider, @postal_code, @latitude, @longitude, @accuracy_radius, @is_anycast)
set network_start = unhex(@network_start),
    network_end = unhex(@network_end),
    geoname_id = nullif(@geoname_id, ''),
    registered_country_geoname_id = nullif(@registered_country_geoname_id, ''),
    represented_country_geoname_id = nullif(@represented_country_geoname_id, ''),
    is_anonymous_proxy = nullif(@is_anonymous_proxy, ''),
    is_satellite_provider = nullif(@is_satellite_provider, ''),
    postal_code = nullif(@postal_code, ''),
    latitude = nullif(@latitude, ''),
    longitude = nullif(@longitude, ''),
    accuracy_radius = nullif(@accuracy_radius, ''),
    is_anycast = nullif(@is_anycast, '');
```

We can load the converted IPv4 data in the same way:

```sql
load data infile '/var/lib/mysql-files/GeoIP2-City-Blocks-IPv4-Hex.csv'
into table geoip2_network
fields terminated by ',' enclosed by '"' lines terminated by '\n' ignore 1 rows
(@network_start, @network_end, @geoname_id, @registered_country_geoname_id, @represented_country_geoname_id,
 @is_anonymous_proxy, @is_satellite_provider, @postal_code, @latitude, @longitude, @accuracy_radius, @is_anycast)
set network_start = unhex(@network_start),
    network_end = unhex(@network_end),
    geoname_id = nullif(@geoname_id, ''),
    registered_country_geoname_id = nullif(@registered_country_geoname_id, ''),
    represented_country_geoname_id = nullif(@represented_country_geoname_id, ''),
    is_anonymous_proxy = nullif(@is_anonymous_proxy, ''),
    is_satellite_provider = nullif(@is_satellite_provider, ''),
    postal_code = nullif(@postal_code, ''),
    latitude = nullif(@latitude, ''),
    longitude = nullif(@longitude, ''),
    accuracy_radius = nullif(@accuracy_radius, ''),
    is_anycast = nullif(@is_anycast, '');
```

Note, the data will be imported even if the CSV file has extra columns that are
missing in the table.

### Test our table by querying it

With everything loaded we're now ready to look up an IP address in the database.
As we're representing IP addresses as `varbinary(16)`, we'll first have to
convert the textual representation of the IP address we're interested in to that
same type using MySQL's built-in `inet6_aton` function.

```sql
select geoname_id, registered_country_geoname_id, represented_country_geoname_id,
       postal_code, latitude, longitude, accuracy_radius
from geoip2_network
where
  length(inet6_aton('214.0.0.0')) = length(network_start)
  and inet6_aton('214.0.0.0') between network_start and network_end
limit 1;
```

```markdown
+------------+-------------------------------+--------------------------------+-------------+----------+-----------+-----------------+
| geoname_id | registered_country_geoname_id | represented_country_geoname_id | postal_code | latitude | longitude | accuracy_radius |
+------------+-------------------------------+--------------------------------+-------------+----------+-----------+-----------------+
|    6252001 |                       6252001 |                           NULL | NULL        |   37.751 |   -97.822 |            1000 |
+------------+-------------------------------+--------------------------------+-------------+----------+-----------+-----------------+
1 row in set (0.03 sec)
```

While that yields the correct results, we notice that the query performance
could be better. Let's improve it.

### Order the table for faster searching

One way of speeding up the query is the addition of `order by network_end` like
so:

```sql
select geoname_id, registered_country_geoname_id, represented_country_geoname_id,
       postal_code, latitude, longitude, accuracy_radius
from geoip2_network
where
  length(inet6_aton('214.0.0.0')) = length(network_start)
  and inet6_aton('214.0.0.0') between network_start and network_end
order by network_end
limit 1;
```

```markdown
+------------+-------------------------------+--------------------------------+-------------+----------+-----------+-----------------+
| geoname_id | registered_country_geoname_id | represented_country_geoname_id | postal_code | latitude | longitude | accuracy_radius |
+------------+-------------------------------+--------------------------------+-------------+----------+-----------+-----------------+
|    6252001 |                       6252001 |                           NULL | NULL        |   37.751 |   -97.822 |            1000 |
+------------+-------------------------------+--------------------------------+-------------+----------+-----------+-----------------+
1 row in set (0.00 sec)
```

While that addresses the performance concern we've had with the previous query,
this query will still perform poorly for addresses not contained in our GeoIP
database:

```sql
select geoname_id, registered_country_geoname_id, represented_country_geoname_id,
       postal_code, latitude, longitude, accuracy_radius
from geoip2_network
where
  length(inet6_aton('127.0.0.1')) = length(network_start)
  and inet6_aton('127.0.0.1') between network_start and network_end
order by network_end
limit 1;
```

```markdown
Empty set (4.45 sec)
```

### Break up our query for faster searching

We can work around this problem by breaking our query up into two parts such
that MySQL will be able to use the indexes we've created more efficiently:

```sql
select geoname_id, registered_country_geoname_id, represented_country_geoname_id,
       postal_code, latitude, longitude, accuracy_radius
from (
  select *
  from geoip2_network
  where
    length(inet6_aton('214.0.0.0')) = length(network_start)
    and inet6_aton('214.0.0.0') >= network_start
  order by network_start desc
  limit 1
) net
where inet6_aton('214.0.0.0') <= network_end;
```

```markdown
+------------+-------------------------------+--------------------------------+-------------+----------+-----------+-----------------+
| geoname_id | registered_country_geoname_id | represented_country_geoname_id | postal_code | latitude | longitude | accuracy_radius |
+------------+-------------------------------+--------------------------------+-------------+----------+-----------+-----------------+
|    6252001 |                       6252001 |                           NULL | NULL        |   37.751 |   -97.822 |            1000 |
+------------+-------------------------------+--------------------------------+-------------+----------+-----------+-----------------+
1 row in set (0.00 sec)
```

```sql
select geoname_id, registered_country_geoname_id, represented_country_geoname_id,
       postal_code, latitude, longitude, accuracy_radius
from (
  select *
  from geoip2_network
  where
    length(inet6_aton('127.0.0.1')) = length(network_start)
    and inet6_aton('127.0.0.1') >= network_start
  order by network_start desc
  limit 1
) net
where inet6_aton('127.0.0.1') <= network_end;
```

```markdown
Empty set (0.00 sec)
```

Using that construct gives us good query performance for all addresses,
regardless of whether or not the GeoIP database contains any information about
them. Depending on your application, you might want to consider encapsulating
this complexity/verbosity in a function. Alternatively, MySQL also offers
spatial data types that can be used to achieve similar performance while
allowing for queries to be expressed more naturally.

## Optional: Create a table for locations data

If `postal_code`, `latitude`, `longitude`, and `accuracy_radius` are everything
we're interested in we'd be done at this point and our application would be
easily able to query what it needs. However, GeoIP databases provide additional
location information. Note the `geoname_id` field in our network table. This
field can be used to look up additional information about the geolocation from
the `Locations` files we downloaded before. We'll load this data into MySQL
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
  is_in_european_union bool,
  primary key (geoname_id, locale_code(5))
);
```

### Load data into the locations table

We then populate our `geoip2_location` table from a `Locations` CSV file. In
this case we will be populating the table from `GeoIP2-City-Locations-en.csv`.
Using the file with the `-en` suffix will give us the names of geolocations in
English:

```sql
load data infile '/var/lib/mysql-files/GeoIP2-City-Locations-en.csv'
into table geoip2_location
fields terminated by ',' enclosed by '"' lines terminated by '\n' ignore 1 rows (
  geoname_id, locale_code, continent_code, continent_name,
  @country_iso_code, @country_name, @subdivision_1_iso_code, @subdivision_1_name,
  @subdivision_2_iso_code, @subdivision_2_name, @city_name, @metro_code, @time_zone,
  is_in_european_union
)
set country_iso_code = nullif(@country_iso_code, ''),
    country_name = nullif(@country_name, ''),
    subdivision_1_iso_code = nullif(@subdivision_1_iso_code, ''),
    subdivision_1_name = nullif(@subdivision_1_name, ''),
    subdivision_2_iso_code = nullif(@subdivision_2_iso_code, ''),
    subdivision_2_name = nullif(@subdivision_2_name, ''),
    city_name = nullif(@city_name, ''),
    metro_code = nullif(@metro_code, ''),
    time_zone = nullif(@time_zone, '');
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
from (
  select *
  from geoip2_network
  where
    length(inet6_aton('214.0.0.0')) = length(network_start)
    and inet6_aton('214.0.0.0') >= network_start
  order by network_start desc
  limit 1
) net
left join geoip2_location location on (
  net.geoname_id = location.geoname_id and location.locale_code = 'en'
)
where inet6_aton('214.0.0.0') <= network_end;
```

```markdown
+----------+-----------+-----------------+----------------+---------------+--------------------+-----------+
| latitude | longitude | accuracy_radius | continent_name | country_name  | subdivision_1_name | city_name |
+----------+-----------+-----------------+----------------+---------------+--------------------+-----------+
|   37.751 |   -97.822 |            1000 | North America  | United States | NULL               | NULL      |
+----------+-----------+-----------------+----------------+---------------+--------------------+-----------+
1 row in set (0.00 sec)
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
from (
  select *
  from geoip2_network
  where
    length(inet6_aton('214.0.0.0')) = length(network_start)
    and inet6_aton('214.0.0.0') >= network_start
  order by network_start desc
  limit 1
) net
left join geoip2_location location on (
  net.geoname_id = location.geoname_id and location.locale_code = 'en'
)
left join geoip2_location registered_country on (
  net.registered_country_geoname_id = registered_country.geoname_id
  and registered_country.locale_code = 'en'
)
left join geoip2_location represented_country on (
  net.represented_country_geoname_id = represented_country.geoname_id
  and represented_country.locale_code = 'en'
)
where inet6_aton('214.0.0.0') <= network_end;
```

```markdown
+----------+-----------+-----------------+-------------------------+-----------------------+-----------------------------+--------------------+-----------------------------------+---------------------------------+------------------------------------+----------------------------------+
| latitude | longitude | accuracy_radius | location_continent_name | location_country_name | location_subdivision_1_name | location_city_name | registered_country_continent_name | registered_country_country_name | represented_country_continent_name | represented_country_country_name |
+----------+-----------+-----------------+-------------------------+-----------------------+-----------------------------+--------------------+-----------------------------------+---------------------------------+------------------------------------+----------------------------------+
|   37.751 |   -97.822 |            1000 | North America           | United States         | NULL                        | NULL               | North America                     | United States                   | NULL                               | NULL                             |
+----------+-----------+-----------------+-------------------------+-----------------------+-----------------------------+--------------------+-----------------------------------+---------------------------------+------------------------------------+----------------------------------+
1 row in set (0.00 sec)
```
