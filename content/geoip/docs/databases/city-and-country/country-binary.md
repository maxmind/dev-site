---
draft: false
title: GeoIP Country binary database fields
---

The GeoIP Country binary database contains the following fields for each network.
The top-level record for each network is a map containing the keys listed below.
Each key maps to a map. If a key maps to an undefined or empty value, it is not
included in the record.

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td><a href="#continent">continent</a></td>
        <td>map</td>
        <td>
          A map containing details about the continent associated with the IP
          address.
        </td>
      </tr>

      <tr>
        <td><a href="#country">country</a></td>
        <td>map</td>
        <td>
          A map containing details about the country where MaxMind believes the
          IP address is located.
        </td>
      </tr>

      <tr>
        <td><a href="#registered_country">registered_country</a></td>
        <td>map</td>
        <td>
          A map containing details about the country where the ISP has
          registered the IP block. This may differ from the country where the IP
          is located.
        </td>
      </tr>

      <tr>
        <td><a href="#represented_country">represented_country</a></td>
        <td>map</td>
        <td>
          A map containing details about the country represented by users of the
          IP address, such as a military base or embassy.
        </td>
      </tr>

      <tr>
        <td><a href="#traits">traits</a></td>
        <td>map</td>
        <td>A map containing general traits associated with the IP address.</td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## continent

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>code</td>
        <td>string</td>
        <td>
          A two-character continent code like <code>NA</code> (North America) or
          <code>OC</code> (Oceania).
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes"
            >Learn more about continent codes on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>geoname_id</td>
        <td>uint32</td>
        <td>
          A unique identifier for the continent as specified by
          <a href="https://www.geonames.org/">GeoNames</a>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
            >Learn more about GeoNames IDs on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>names</td>
        <td>map</td>
        <td>
          A map from locale codes (e.g., <code>en</code>, <code>de</code>,
          <code>ja</code>) to localized names.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
            >Learn more about localized geolocation names on our Knowledge
            Base.</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## country

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>geoname_id</td>
        <td>uint32</td>
        <td>
          A unique identifier for the country as specified by
          <a href="https://www.geonames.org/">GeoNames</a>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
            >Learn more about GeoNames IDs on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_in_european_union</td>
        <td>boolean</td>
        <td>
          This is <code>true</code> if the country is a member state of the
          European Union. This key is only present when the value is
          <code>true</code>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#eu-flag"
            >Learn more about the EU flag on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>iso_code</td>
        <td>string</td>
        <td>
          The two-character
          <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a>
          alpha code for the country.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes"
            >Learn more about country codes on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>names</td>
        <td>map</td>
        <td>
          A map from locale codes (e.g., <code>en</code>, <code>de</code>,
          <code>ja</code>) to localized names.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
            >Learn more about localized geolocation names on our Knowledge
            Base.</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## registered_country

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>geoname_id</td>
        <td>uint32</td>
        <td>
          A unique identifier for the registered country as specified by
          <a href="https://www.geonames.org/">GeoNames</a>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
            >Learn more about GeoNames IDs on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_in_european_union</td>
        <td>boolean</td>
        <td>
          This is <code>true</code> if the registered country is a member state
          of the European Union. This key is only present when the value is
          <code>true</code>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#eu-flag"
            >Learn more about the EU flag on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>iso_code</td>
        <td>string</td>
        <td>
          The two-character
          <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a>
          alpha code for the registered country.
        </td>
      </tr>

      <tr>
        <td>names</td>
        <td>map</td>
        <td>
          A map from locale codes (e.g., <code>en</code>, <code>de</code>,
          <code>ja</code>) to localized names.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
            >Learn more about localized geolocation names on our Knowledge
            Base.</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## represented_country

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>geoname_id</td>
        <td>uint32</td>
        <td>
          A unique identifier for the represented country as specified by
          <a href="https://www.geonames.org/">GeoNames</a>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
            >Learn more about GeoNames IDs on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_in_european_union</td>
        <td>boolean</td>
        <td>
          This is <code>true</code> if the represented country is a member state
          of the European Union. This key is only present when the value is
          <code>true</code>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#eu-flag"
            >Learn more about the EU flag on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>iso_code</td>
        <td>string</td>
        <td>
          The two-character
          <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a>
          alpha code for the represented country.
        </td>
      </tr>

      <tr>
        <td>names</td>
        <td>map</td>
        <td>
          A map from locale codes (e.g., <code>en</code>, <code>de</code>,
          <code>ja</code>) to localized names.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
            >Learn more about localized geolocation names on our Knowledge
            Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>type</td>
        <td>string</td>
        <td>
          A string indicating the type of entity that is representing the
          country. Currently this is only <code>military</code> but may expand
          to include other types in the future.
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## traits

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>is_anycast</td>
        <td>boolean</td>
        <td>
          This is <code>true</code> if the IP address belongs to an
          <a href="https://en.wikipedia.org/wiki/Anycast">anycast network</a>.
          This key is only present when the value is <code>true</code>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#anycast"
            >Learn more about anycast data on our Knowledge Base.</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}
