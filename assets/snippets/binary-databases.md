Binary databases make use of the
[MaxMind DB file format](https://maxmind.github.io/MaxMind-DB/). MaxMind
provides [official client APIs](/geoip/docs/databases/#official-client-apis)
that are open source.  We also provide a list of
[unsupported and unofficial client APIs](/geoip/docs/databases/#unofficial-client-apis)
and [unsupported and unofficial integrations](/geoip/docs/databases/#integrations)
with various applications.

You can also use the [mmdbinspect tool](https://github.com/maxmind/mmdbinspect)
(in beta), a command line interface built with Go, to look up one or more IPs
from one or more MMDB databases and receive output in a parsable JSON format.
