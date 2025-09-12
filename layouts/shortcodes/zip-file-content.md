{{ $productName := .Get "product-name" }}

The zip file itself is named `{{ $productName }}-CSV_{YYYYMMDD}.zip`.
The downloaded zip file contains a single directory which in turn
contains several files. That directory is named
`{{ $productName }}-CSV_{YYYYMMDD}`.

{{ if ne (.Get "exclude-table") "true" }}
The files in this zip archive are:

| Filename | Description |
|----------|-------------|
| `LICENSE.txt` | End user license |
| `COPYRIGHT.txt` | Copyright statement |
| `{{ $productName }}-Blocks-IPv4.csv` | CSV file containing data on IPv4 addresses |
| `{{ $productName }}-Blocks-IPv6.csv` | CSV file containing data on IPv6 addresses |
{{ end }}