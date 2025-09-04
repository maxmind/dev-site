{{ range index $.Site.Data.mm_ips "IPv4"}}
{{ . }}  
{{ end }}
{{ range index $.Site.Data.mm_ips "IPv6"}}
{{ . }}  
{{ end }}

Last updated: {{ index $.Site.Data.mm_ips "lastUpdated" | time.Format "January 02, 2006 3:04 PM Z07:00" }}