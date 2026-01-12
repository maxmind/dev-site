---
draft: false
title: GeoIP and GeoLite Database Documentation
---

## Databases

<!-- prettier-ignore-start -->

{{< link-group/container >}}
- heading: "City and Country Databases"
  url: "/geoip/docs/databases/city-and-country"
  text: "Determine the country, subdivisions (regions), city, and postal code associated with IPv4 and IPv6 addresses worldwide."
- heading: "Enterprise Databases"
  url: "/geoip/docs/databases/enterprise"
  text: "Determine geolocation data such as country, region, state, city, ZIP/postal code, and additional intelligence such as confidence factors, ISP, domain, and connection type."
- heading: "Anonymous IP Databases"
  url: "/geoip/docs/databases/anonymous-ip"
  text: "MaxMind's GeoIP Anonymous IP CSV database helps protect your business by identifying proxy, VPN, hosting, and other anonymous IP addresses."
- heading: "Anonymous Plus Databases"
  url: "/geoip/docs/databases/anonymous-plus"
  text: "MaxMind's GeoIP Anonymous Plus database helps protect your business by identifying anonymized proxy traffic and reduce false positives based on confidence scores, timestamps, and VPN provider names."
- heading: "ISP Databases"
  url: "/geoip/docs/databases/isp"
  text: "Determine the Internet Service Provider, organization name, and autonomous system organization and number associated with an IP address."
- heading: "Connection Type Databases"
  url: "/geoip/docs/databases/connection-type"
  text: "Determine the connection type of your visitors based on their IP address. The database identifies dial-up, cellular, cable/DSL, and corporate connection speeds."
- heading: "Domain Databases"
  url: "/geoip/docs/databases/domain"
  text: "Look up the second level domain names associated with IPv4 and IPv6 addresses."
- heading: "ASN Databases"
  url: "/geoip/docs/databases/asn"
  text: "Look up the autonomous system number and autonomous system organization associated with IPv4 and IPv6 addresses."
{{</ link-group/container >}}

<!-- prettier-ignore-end -->

## Client APIs

### Official Client APIs

| Language or Framework | Package Repository                                                                      | Documentation                                             | Version Control                                    |
| --------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------- |
| .NET (C#)             | [NuGet](https://www.nuget.org/packages/MaxMind.GeoIP2/)                                 | [GitHub Pages](https://maxmind.github.io/GeoIP2-dotnet/)  | [GitHub](https://github.com/maxmind/GeoIP2-dotnet) |
| Apache                | N/A                                                                                     | [GitHub Pages](https://maxmind.github.io/mod_maxminddb/)  | [GitHub](https://github.com/maxmind/mod_maxminddb) |
| C                     | N/A                                                                                     | [GitHub Pages](https://maxmind.github.io/libmaxminddb/)   | [GitHub](https://github.com/maxmind/libmaxminddb)  |
| Java                  | [Maven Central Repository](https://search.maven.org/artifact/com.maxmind.geoip2/geoip2) | [GitHub Pages](https://maxmind.github.io/GeoIP2-java/)    | [GitHub](https://github.com/maxmind/GeoIP2-java)   |
| Node.js               | [NPM](https://www.npmjs.com/package/@maxmind/geoip2-node)                               | [GitHub Pages](https://maxmind.github.io/GeoIP2-node/)    | [GitHub](https://github.com/maxmind/GeoIP2-node)   |
| PHP                   | [Packagist](https://packagist.org/packages/geoip2/geoip2)                               | [GitHub Pages](https://maxmind.github.io/GeoIP2-php/)     | [GitHub](https://github.com/maxmind/GeoIP2-php)    |
| Python                | [PyPI](https://pypi.org/project/geoip2/)                                                | [Read the Docs](https://geoip2.readthedocs.io/en/latest/) | [GitHub](https://github.com/maxmind/GeoIP2-python) |
| Ruby                  | [RubyGems](https://rubygems.org/gems/maxmind-geoip2)                                    | [RubyDoc](https://www.rubydoc.info/gems/maxmind-geoip2)   | [GitHub](https://github.com/maxmind/GeoIP2-ruby)   |

### Unofficial Client APIs

{{< alert warning >}} **Use at your own risk.**

MaxMind does **_not_** offer support for these integrations. Please contact the
integrator for assistance. {{</ alert >}}

| Language             | API Name                        | Package Repository                                                                          | Documentation                                                                      | Version Control                                              |
| -------------------- | ------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| C++                  | GeoLite2++                      |                                                                                             | [Usage](https://www.ccoderun.ca/GeoLite2++/api/usage.html)                         |                                                              |
| Clojure              | maximator                       | [Clojars](https://clojars.org/com.oscaro/maximator)                                         | [README](https://github.com/oscaro/maximator/blob/master/README.md)                | [GitHub](https://github.com/oscaro/maximator)                |
| Common Lisp          | CL-MAXMINDDB                    |                                                                                             | [README](https://github.com/turtle-bazon/cl-maxminddb/blob/hg/README.md)           | [GitHub](https://github.com/turtle-bazon/cl-maxminddb)       |
| Crystal              | GeoIP2.cr (C extension)         |                                                                                             | [README](https://github.com/delef/geoip2.cr/blob/main/README.md)                   | [GitHub](https://github.com/delef/geoip2.cr)                 |
| Crystal              | MaxMindDB.cr                    |                                                                                             | [README](https://github.com/delef/maxminddb.cr/blob/main/README.md)                | [GitHub](https://github.com/delef/maxminddb.cr)              |
| D                    | dmaxminddb                      | [DUB](https://code.dlang.org/packages/dmaxminddb)                                           | [DUB](https://code.dlang.org/packages/dmaxminddb)                                  | [GitHub](https://github.com/maxpoulin64/dmaxminddb)          |
| Dart                 | maxminddb                       | [pub.dev](https://pub.dev/packages/maxminddb)                                               | [pub.dev](https://pub.dev/documentation/maxminddb/latest/)                         | [GitHub](https://github.com/fischerscode/dart-maxmindDB)     |
| Delphi               | MMDB Reader                     |                                                                                             | [README.md](https://github.com/optinsoft/MMDBReader/blob/master/README.md)         | [GitHub](https://github.com/optinsoft/MMDBReader)            |
| Elixir               | Geolix                          | [Hex](https://hex.pm/packages/geolix)                                                       | [README](https://github.com/elixir-geolix/geolix/blob/master/README.md)            | [GitHub](https://github.com/elixir-geolix/geolix)            |
| Erlang               | ego                             |                                                                                             | [README](https://github.com/jflatow/ego/blob/master/README)                        | [GitHub](https://github.com/jflatow/ego/tree/master)         |
| Erlang               | geodata2                        |                                                                                             | [README](https://github.com/brigadier/geodata2/blob/master/README.md)              | [GitHub](https://github.com/brigadier/geodata2)              |
| Erlang               | locus                           | [Hex](https://hex.pm/packages/locus)                                                        | [HexDocs](https://hexdocs.pm/locus/)                                               | [GitHub](https://github.com/g-andrade/locus)                 |
| Go                   | oschwald/geoip2-golang          |                                                                                             | [pkg.go.dev](https://pkg.go.dev/github.com/oschwald/geoip2-golang)                 | [GitHub](https://github.com/oschwald/geoip2-golang)          |
| Go                   | IncSW/geoip2                    |                                                                                             | [pkg.go.dev](https://pkg.go.dev/github.com/IncSW/geoip2)                           | [GitHub](https://github.com/IncSW/geoip2)                    |
| Haskell              | geoip2                          | [Hackage](https://hackage.haskell.org/package/geoip2)                                       | [README](https://github.com/ondrap/geoip2/blob/master/README.md)                   | [GitHub](https://github.com/ondrap/geoip2)                   |
| Lua                  | mmdblua                         |                                                                                             | [README](https://github.com/daurnimator/mmdblua/blob/master/README.md)             | [GitHub](https://github.com/daurnimator/mmdblua)             |
| Lua (C extension)    | lua-maxminddb                   |                                                                                             |                                                                                    | [GitHub](https://github.com/fabled/lua-maxminddb)            |
| Lua (C extension)    | lua-resty-maxminddb             |                                                                                             | [README](https://github.com/anjia0532/lua-resty-maxminddb/blob/master/README.md)   | [GitHub](https://github.com/anjia0532/lua-resty-maxminddb)   |
| Node.js              | jgeoip                          | [npm](https://www.npmjs.com/package/jgeoip)                                                 | [npm](https://www.npmjs.com/package/jgeoip)                                        | [GitHub](https://github.com/jclo/jgeoip)                     |
| Node.js              | maxmind                         | [npm](https://www.npmjs.com/package/maxmind)                                                | [npm](https://www.npmjs.com/package/maxmind)                                       | [GitHub](https://github.com/runk/node-maxmind)               |
| Node.js / Deno / Bun | maxminddb-wasm                  | [npm](https://www.npmjs.com/package/maxminddb-wasm) / [Deno](https://deno.land/x/maxminddb) | [JSR](https://jsr.io/@josh-hemphill/maxminddb-wasm)                                | [GitHub](https://github.com/josh-hemphill/maxminddb-wasm)    |
| OCaml                | ocaml-maxminddb                 | [OPAM](https://opam.ocaml.org/packages/maxminddb/)                                          | [README](https://github.com/fxfactorial/ocaml-maxminddb/blob/master/README.md)     | [GitHub](https://github.com/fxfactorial/ocaml-maxminddb)     |
| Perl                 | Geo::Location::IP               | [CPAN](https://metacpan.org/pod/Geo::Location::IP)                                          | [MetaCPAN](https://metacpan.org/pod/Geo::Location::IP)                             | [GitHub](https://github.com/voegelas/Geo-Location-IP)        |
| Perl                 | IP::Geolocation::MMDB           | [CPAN](https://metacpan.org/pod/IP::Geolocation::MMDB)                                      | [MetaCPAN](https://metacpan.org/pod/IP::Geolocation::MMDB)                         | [GitHub](https://github.com/voegelas/IP-Geolocation-MMDB)    |
| PHP                  | librarymarket/maxmind-db-reader | [Packagist](https://packagist.org/packages/librarymarket/maxmind-db-reader)                 | [README](https://github.com/librarymarket/maxmind-db-reader/blob/1.0.x/README.md)  | [GitHub](https://github.com/librarymarket/maxmind-db-reader) |
| Python               | pandas-maxminddb                | [PyPI](https://pypi.org/project/pandas-maxminddb/)                                          | [README](https://github.com/andrusha/pandas-maxminddb/blob/main/README.md)         | [GitHub](https://github.com/andrusha/pandas-maxminddb)       |
| R                    | rgeolocate                      | [CRAN](https://cran.r-project.org/web/packages/rgeolocate/index.html)                       | [README](https://github.com/Ironholds/rgeolocate/blob/master/README.md)            | [GitHub](https://github.com/Ironholds/rgeolocate)            |
| Racket               | geoip                           |                                                                                             | [Racket Documentation](https://docs.racket-lang.org/geoip/index.html)              | [GitHub](https://github.com/Bogdanp/racket-geoip)            |
| Raku                 | GeoIP2                          |                                                                                             | [README](https://github.com/bbkr/GeoIP2/blob/master/README.md)                     | [GitHub](https://github.com/bbkr/GeoIP2)                     |
| Rust                 | geoip2                          | [Cargo](https://crates.io/crates/geoip2)                                                    | [API docs](https://docs.rs/geoip2/0.1.6/geoip2/)                                   | [GitHub](https://github.com/IncSW/geoip2-rs)                 |
| Rust                 | maxminddb                       | [Cargo](https://crates.io/crates/maxminddb)                                                 | [API docs](https://oschwald.github.io/maxminddb-rust/maxminddb/struct.Reader.html) | [GitHub](https://github.com/oschwald/maxminddb-rust)         |
| Scala                | maxmind-geoip2-scala            |                                                                                             | [README](https://github.com/Sanoma-CDA/maxmind-geoip2-scala/blob/master/README.md) | [GitHub](https://github.com/Sanoma-CDA/maxmind-geoip2-scala) |
| Swift (C extension)  | MaxMindDBSwift                  |                                                                                             | [README](https://github.com/SunboyGo/MaxMindDBSwift/blob/main/README.md)           | [GitHub](https://github.com/SunboyGo/MaxMindDBSwift)         |
| Swift (C extension)  | MMDB-Swift                      | [MMDB-Swift](https://cocoapods.org/pods/MMDB-Swift)                                         | [CocoaPods](https://cocoapods.org/pods/MMDB-Swift)                                 | [GitHub](https://github.com/lexrus/MMDB-Swift)               |
| Zig                  | maxminddb                       |                                                                                             | [README](https://github.com/marselester/maxminddb.zig/blob/master/README.md)       | [GitHub](https://github.com/marselester/maxminddb.zig)       |

### Integrations

{{< alert warning >}} **Use at your own risk.**

MaxMind does **_not_** offer support for these integrations. Please contact the
integrator for assistance. {{</ alert >}}

| Application                    | Platform                | Link                                                                                                        |
| ------------------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| Ad-serving                     | Revive Adserver         | [Geotargeting with Revive Adserver](https://www.revive-adserver.com/faq/geotargeting-with-revive-adserver/) |
| Analytics                      | Piwik/Matomo            | [GEO LOCATE YOUR VISITORS](https://matomo.org/faq/how-to/setting-up-accurate-visitors-geolocation/)         |
| Analytics                      | Snowplow Analytics      | [IP lookups enrichment](https://github.com/snowplow/snowplow/wiki/IP-lookups-enrichment)                    |
| Content Delivery               | Varnish Software        | [libvmod-geoip2](https://github.com/varnishcache-friends/libvmod-geoip2)                                    |
| E-commerce                     | WooCommerce / WordPress | [MaxMind Geolocation Integration](https://woocommerce.com/document/maxmind-geolocation-integration/)        |
| Load balancer                  | NGINX                   | [ngx_http_geoip2_module](https://github.com/leev/ngx_http_geoip2_module)                                    |
| Log Analyzer / Data Processing | Logstash                | [Geoip filter plugin](https://www.elastic.co/docs/reference/logstash/plugins/plugins-filters-geoip)         |
| Network Protocol Analyzer      | Wireshark               | [How To Use GeoIP With Wireshark](https://gitlab.com/wireshark/wireshark/-/wikis/HowToUseGeoIP)             |
| Search                         | Elasticsearch           | [GeoIP processor](https://www.elastic.co/docs/reference/enrich-processor/geoip-processor)                   |
| Web server                     | Caddy                   | [caddy-geoip2](https://github.com/zhangjiayin/caddy-geoip2)                                                 |

## Command Line (mmdbinspect)

You can use the [mmdbinspect tool](https://github.com/maxmind/mmdbinspect) (in
beta), a command line interface, to look up one or more IPs from one or more
MMDB databases and receive output in a parsable JSON format.
