{{- $key := .Get "key" -}}
{{- $country := .Get "country" -}}
{{- $city := .Get "city" -}}
{{- $insights := .Get "insights" -}}
{{- $hasCountry := eq $country "true" -}}
{{- $hasCity := eq $city "true" -}}
{{- $hasInsights := eq $insights "true" -}}
<tr>
  <td>
    <code>{{ $key }}</code>
  </td>
  <td>
    {{ .Get "valueType" }}
  </td>
  <td>
    {{ .Inner | .Page.RenderString }}
    {{ with .Get "valueTypeNote" }}
      <p>
        <em>{{ . }}</em>
      </p>
    {{ end }}
    <div>
      <span>{{ if $hasCountry }}✓{{ else }}✗{{ end }} GeoIP Country</span>
      <span>{{ if $hasCity }}✓{{ else }}✗{{ end }} GeoIP City</span>
      <span>{{ if $hasInsights }}✓{{ else }}✗{{ end }} GeoIP Insights</span>
    </div>
  </td>
</tr>
