{{- /* Clean alert shortcodes from content */ -}}
{{- $content := . -}}
{{- $content = replaceRE `\{\{<\s*alert\s+warning\s*>\}\}` "" $content -}}
{{- $content = replaceRE `\{\{<\s*alert\s+info\s*>\}\}` "" $content -}}
{{- $content = replaceRE `\{\{</\s*alert\s*>\}\}` "" $content -}}
{{- $content }}