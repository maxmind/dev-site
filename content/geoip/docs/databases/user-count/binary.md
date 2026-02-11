---
draft: false
title: GeoIP User Count binary database fields
---

The GeoIP User Count binary database contains the following fields for each
network.

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
        <td>ipv4_24</td>
        <td>uint32</td>
        <td>
          The estimated number of users sharing the IPv4 /24 network that the IP
          address is contained within during the past 24 hours. This is not an
          exact count of individual users but rather a normalized value.
          <br />
          These values should be greater than the values provided in
          <code>ipv4_32</code> because they are representative of the number of
          users across a larger number of IP addresses.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-user-context-data#user-counts"
            >Learn more about the normalization and values of the user count on
            our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>ipv4_32</td>
        <td>uint32</td>
        <td>
          The estimated number of users sharing the IPv4 address during the past
          24 hours. This is not an exact count of individual users but rather a
          normalized value.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-user-context-data#user-counts"
            >Learn more about the normalization and values of the user count on
            our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>ipv6_32</td>
        <td>uint32</td>
        <td>
          The estimated number of users sharing the IPv6 /32 network that the IP
          address is contained within during the past 24 hours. This is not an
          exact count of individual users but rather a normalized value.
          <br />
          These values should be greater than the values provided in
          <code>ipv6_48</code> because they are representative of the number of
          users across a larger number of IP addresses.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-user-context-data#user-counts"
            >Learn more about the normalization and values of the user count on
            our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>ipv6_48</td>
        <td>uint32</td>
        <td>
          The estimated number of users sharing the IPv6 /48 network that the IP
          address is contained within during the past 24 hours. This is not an
          exact count of individual users but rather a normalized value.
          <br />
          These values should be greater than the values provided in
          <code>ipv6_64</code> because they are representative of the number of
          users across a larger number of IP addresses.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-user-context-data#user-counts"
            >Learn more about the normalization and values of the user count on
            our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>ipv6_64</td>
        <td>uint32</td>
        <td>
          The estimated number of users sharing the IPv6 /64 network during the
          past 24 hours. IPv6 /64 networks are usually assigned to individual
          households and can be considered similar from a user perspective to an
          individual IPv4 address. This is not an exact count of individual
          users but rather a normalized value.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-user-context-data#user-counts"
            >Learn more about the normalization and values of the user count on
            our Knowledge Base.</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}
