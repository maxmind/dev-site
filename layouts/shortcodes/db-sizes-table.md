MaxMind databases can vary in size from release to release. If you are
working with file size limitations that are concerning, you should build
your integrations to fail gracefully in event of a significant size
change.

From {{ .Get "dateRange" }}, the database files varied in file size and number of networks as
follows:

| Database | CSV File Size | MMDB File Size | IPv4 Networks | IPv6 Networks |
|----------|---------------|----------------|---------------|---------------|
{{- .Inner | strings.TrimSpace }}

The listed file sizes are for unpacked databases. Databases are
downloaded in a compressed format.
