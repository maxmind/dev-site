---
draft: false
title: Geolocate an IP address using Web Services with the client-side JavaScript
---

Our GeoIP JavaScript client allows you to use GeoIP web services client-side
without doing any server-side integration on your end. While it is convenient,
there are some caveats with its usage. Some browser settings and add-ons (such
as ad blockers) may prevent the GeoIP JavaScript API from successfully calling
the web services. Additionally, there may be unexpected usage spikes which you
may want to monitor, due to moments of high traffic to your website(s).

We highly recommend using a
[server-side integration](/geoip/geolocate-an-ip/web-services), as it is more
secure and more robust than a client-side integration.

## Implementation

Implementing the GeoIP JavaScript client involves registering your domain(s),
adding a JavaScript snippet to your web page, calling the desired API
method/service, and providing callbacks for all scenarios.

### 1. Register your domain(s)

All domains using the service must be registered. New users may
[request a free trial](https://www.maxmind.com/en/request-service-trial?service_geoip=1)
or
[purchase web service credit](https://www.maxmind.com/en/geoip2-precision-services)
in order to receive an account to register domains. Existing account holders are
able to
[register domains directly](https://www.maxmind.com/en/accounts/current/geoip/javascript/domains).

### 2. Add a JavaScript snippet to your page

In order to use this service, the following JavaScript must be included in your
page.

{{< alert warning >}}
  **Do not download this JavaScript file and serve it from your server(s)!**

The JavaScript file must be served from MaxMind servers, otherwise GeoIP
requests will fail.

{{</ alert >}}

```html
<script src="https://geoip-js.com/js/apis/geoip2/v2.1/geoip2.js" type="text/javascript"></script>
```

### 3. Call an API method and provide callbacks

The JavaScript client provides 3 public methods:

| Option                                         | Description                                                                                                             |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `geoip2.country(onSuccess, onError, options)`  | Calls the "GeoIP Country" endpoint using the routable IP address associated with the machine on which it is running.   |
| `geoip2.city(onSuccess, onError, options)`     | Calls the "GeoIP City Plus" endpoint using the routable IP address associated with the machine on which it is running. |
| `geoip2.insights(onSuccess, onError, options)` | Calls the "GeoIP Insights" endpoint using the routable IP address associated with the machine on which it is running.  |

All of the functions take the same 3 arguments:

- If successful, this function calls the `onSuccess` callback. The first
  parameter passed to the callback contains an object matching the output of one
  of MaxMind’s
  [GeoIP web service API responses](/geoip/docs/web-services/responses).

  In addition to the attributes listed in the web services API docs, the object
  also has a `most_specific_subdivision` property that provides access to the
  most specific subdivision object available. On browsers other than Internet
  Explorer 8, this is implemented as a non-enumerable property using
  `defineProperty`.

- If there is an error, the function calls the `onError` callback with the error
  object as a parameter.

- The optional `options` parameter is an object containing flags for the
  service. This parameter is reserved for future use. There are no options at
  this time.

### Example: Display the user's city name in a page

In this example, we are displaying the user's city name in a page. We have 2
files: page.html and demo.js.

```html
<!-- page.html -->
<!doctype html>
<html>
  <head>
    <title>Which city am I in?</title>
    <script src="https://geoip-js.com/js/apis/geoip2/v2.1/geoip2.js"></script>
    <!-- make sure this is after the geoip2.js file -->
    <script src="/demo.js"></script>
  </head>

  <body>
    <p>
       Where am I?
    </p>

    <p>
      You are in <span id="city"></span>.
    </p>
  </body>
</html>
```

```js
// demo.js
var fillInPage = (function() {
  var updateCityText = function(geoipResponse) {

    /*
     * It's possible that we won't have any names for this city.
     * For language codes with a special character such as pt-BR,
     * replace names.en with names['pt-BR'].
    */
    var cityName = geoipResponse.city.names.en || 'your city';

    document.getElementById('city').innerHTML = cityName
  };

  var onSuccess = function(geoipResponse) {
    updateCityText(geoipResponse);
  };

  // If we get an error, we will display an error message
  var onError = function(error) {
    document.getElementById('city').innerHTML = 'an error!  Please try again..'
  };

  return function() {
    if (typeof geoip2 !== 'undefined') {
      geoip2.city(onSuccess, onError);
    } else {
      document.getElementById('city').innerHTML = 'a browser that blocks GeoIP requests'
    }
  };
}());

fillInPage();
```

### Successful responses

A successful response consists of a single JavaScript object. That object
contains a set of key/value pairs, where the keys are things like `country` and
`traits`, and the values are objects or arrays of objects.

While our REST API is documented as omitting missing keys, we add blank arrays
and objects in the JavaScript API. This makes it much simpler to work with the
response, as you will not need to check whether the data structure exists before
using it.

Wherever a missing property’s value could be an object or array, we will add an
empty object or array as needed. For example, if you call the `city()` method
and the response from the MaxMind server has no `city` key at all, it will end
up being filled in as:

```json
{
  "city": {
    "names": {}
  },
  "country": {...},
  "continent": {...},
  ...
}
```

If the response contains no `subdivisions` key, you will get this:

```json
{
  "city": {...},
  "country": {...},
  "continent": {...},
  "subdivisions": [ { "names": {} } ],
  ...
}
```

### Errors

All errors are passed in a JavaScript object as the first parameter to the
`onError` function. This object contains two keys, `code` and `error`. `code` is
a machine-readable error code that will not change. `error` is a human-readable
description of the error.

| Code                         | HTTP Status          | Description                                                                                             |
| ---------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------- |
| `IP_ADDRESS_INVALID`           | 400 Bad Request      | You have not supplied a valid IPv4 or IPv6 address.                                                     |
| `IP_ADDRESS_REQUIRED`          | 400 Bad Request      | You have not supplied an IP address, which is a required field.                                         |
| `IP_ADDRESS_RESERVED`          | 400 Bad Request      | You have supplied an IP address which belongs to a reserved or private range.                           |
| `IP_ADDRESS_NOT_FOUND`         | 404 Not Found        | The supplied IP address is not in the database.                                                         |
| `DOMAIN_REGISTRATION_REQUIRED` | 401 Unauthorized     | The domain of your site is not registered.                                                              |
| `QUERY_FORBIDDEN`              | 401 Unauthorized     | You tried to access a service or feature that is not covered by your service plan.                      |
| `OUT_OF_QUERIES`               | 402 Payment Required | The license key you have provided is out of queries. Please purchase more queries to use this service.  |
| `PERMISSION_REQUIRED`          | 403 Forbidden        | You do not have permission to use the service. Please [contact our support team](https://support.maxmind.com/hc/en-us/requests/new) for more information. |
| `HTTP_TIMEOUT`                 | (none)               | The request to the GeoIP web service timed out.                                                        |
| `HTTP_ERROR`                   | (none)               | There was an error making the request to the GeoIP web service.                                        |

### Versioning

This document covers **version 2.1** of the GeoIP JavaScript API. Whenever
MaxMind releases a new version of the JavaScript API, we will use a new path, so
the old JavaScript files will always be accessible. For example, if we released
version 42.6 of the JavaScript API, its path would be
`/js/apis/geoip2/**v42.6**/geoip2.js`.

However, support will only be provided for the newest version of the JavaScript
API at any given time.

Please note that the JavaScript API and the web service REST API are versioned
separately. We will bump the JavaScript API version when we add new features or
need to break backwards compatibility with previous versions of the JavaScript
API.

Version 2.1 of the JavaScript API uses version 2.1 of the
[GeoIP web services REST API](/geoip/geoip2/web-services/).

### Browser support

MaxMind is committed to support all browser versions that are currently
supported by their respective creators. When the creator offers multiple support
levels, we only support the browser through its initial support phase. For
example, Microsoft has two support phases, Mainstream and Extended. We are
committed to supporting browsers through the end of the Mainstream support
phase. We reserve the right to end support at any time for any browser no longer
supported by its creator. In order to ensure your data is as safe and secure as
possible, we recommend using the encrypted HTTP (HTTPS) protocol.

Here is the list of browsers supported:

| Browser                     | Version(s)                                                  |
| --------------------------- | ----------------------------------------------------------- |
| Chrome                      | Last two stable releases per Chrome Release Stable Channels |
| Firefox                     | 60+                                                         |
| Internet Explorer           | 11                                                          |
| Edge                        | 17+                                                         |
| Safari (desktop and mobile) | 10+                                                         |
| Opera                       | Current release                                             |
| Android native browser      | 5+                                                          |
| iOS native browser          | 10+                                                         |

### Security

We require TLS 1.2 or greater for HTTPS requests to our servers to keep your
data secure.
