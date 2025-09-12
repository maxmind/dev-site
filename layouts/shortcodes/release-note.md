{{ $title := .Get "title" }}
{{ $date := .Get "date" }}

## {{ $title }}

_{{ $date | time.Format ":date_long" }}_

{{ .Inner }}