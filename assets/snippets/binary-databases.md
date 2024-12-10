Binary databases make use of the
[MaxMind DB file format](https://maxmind.github.io/MaxMind-DB/). MaxMind
provides [official client APIs](https://dev.maxmind.com/geoip/docs/databases/#official-client-apis)
that are open source and licensed under the Apache License, Version 2.0.  We also provide a list of
[unsupported and unofficial client APIs](https://dev.maxmind.com/geoip/docs/databases/#unofficial-client-apis)
and [unsupported and unofficial integrations](https://dev.maxmind.com/geoip/docs/databases/#integrations)
with various applications.

You can also use the [mmdbinspect tool](https://github.com/maxmind/mmdbinspect)
(in beta), a command line interface built with Go, to look up one or more IPs
from one or more MMDB databases and receive output in a parsable JSON format.
