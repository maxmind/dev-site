---
draft: false
title: Evaluate a Transaction
---

Evaluating a transaction consists of setting up device tracking on your website,
creating an object that contains the details of the transaction, and then
submitting the transaction to the minFraud service for evaluation.

## Implementation

MaxMind offers and highly recommends using official client libraries to access
our minFraud services. If you cannot or do not wish to use our client libraries,
please review our [minFraud API Documentation page](/minfraud/api-documentation)
for details on our JSON API.

### 1. Add device tracking to your website

The [Device Tracking Add-On](/minfraud/track-devices) runs on a visiting device
so that the minFraud service can assign a device ID and begin collecting
fingerprint information. This helps detect fraudsters if they change or enable
proxies while browsing your website.

Note that, in order to be effective, the Device Tracking Add-on must, at a
minimum, be included on the page where the IP address is captured for a minFraud
query.

Place the following code in the footer of the HTML webpage and replace
`INSERT_MAXMIND_ACCOUNT_ID_HERE` with your
[MaxMind account ID](https://support.maxmind.com/knowledge-base/articles/find-your-maxmind-account-id):

```html
<script>
  (function () {
    var mmapiws = (window.__mmapiws = window.__mmapiws || {});
    mmapiws.accountId = 'INSERT_MAXMIND_ACCOUNT_ID_HERE';
    var loadDeviceJs = function () {
      var element = document.createElement('script');
      element.async = true;
      element.src = 'https://device.maxmind.com/js/device.js';
      document.body.appendChild(element);
    };
    if (window.addEventListener) {
      window.addEventListener('load', loadDeviceJs, false);
    } else if (window.attachEvent) {
      window.attachEvent('onload', loadDeviceJs);
    }
  })();
</script>
```

### 2. Install the minFraud client library

We have a collection of officially supported libraries for you to interact with
the minFraud API:

{{< codeset >}}

```csharp
// Install via NuGet
Install-Package MaxMind.MinFraud
```

```java
// Install via Maven, recommended
<dependency>
  <groupId>com.maxmind.minfraud</groupId>
  <artifactId>minfraud</artifactId>
  <version>4.0.0</version>
</dependency>

// Or install via Gradle
repositories {
  mavenCentral()
}
dependencies {
  implementation 'com.maxmind.minfraud:minfraud:4.0.0'
}
```

```javascript
// Install via npm
npm install @maxmind/minfraud-api-node

// Or install via yarn
yarn add @maxmind/minfraud-api-node
```

```php
# Install via Composer
composer require maxmind/minfraud:~3.0
```

```python
# Install via pip
pip install minfraud
```

```ruby
# Install as a gem
gem install minfraud

# Or add this to your Gemfile
gem 'minfraud'
```

{{</ codeset >}}

### 3. Create a minFraud client object

To interact with our API, you need to create a new client object. For this you
will need
[your MaxMind account ID and license key](https://www.maxmind.com/en/accounts/current/license-key):

{{< codeset >}}

```csharp
int accountId = 10;
string licenseKey = "LICENSEKEY";

var client = new WebServiceClient(accountId, licenseKey);
```

```java
int accountId = 10;
String licenseKey = "LICENSEKEY";

WebServiceClient client = new WebServiceClient.Builder(accountId, licenseKey).build();
```

```javascript
import * as minFraud from '@maxmind/minfraud-api-node';

const accountId = '10';
const licenseKey = 'LICENSEKEY';

const client = new minFraud.Client(accountId, licenseKey);
```

```php
$accountId = 10;
$licenseKey = 'LICENSEKEY';

$client = new MinFraud($accountId, $licenseKey);
```

```python
from minfraud import Client, AsyncClient

account_id = 10
license_key = 'LICENSEKEY'

# If you want to use synchronous requests
client = Client(account_id, license_key)

# Or if you want to use asynchronous requests
async_client = AsyncClient(account_id, license_key)
```

```ruby
Minfraud.configure do |c|
  c.account_id = 10
  c.license_key = 'LICENSEKEY'
end
```

{{</ codeset >}}

### 4. Create a transaction object

The transaction object represents a customer's transaction that you are sending
to the minFraud service for evaluation. There are no mandatory fields, but
including [more information](/minfraud/evaluate-a-transaction#full-examples)
about the transaction improves the accuracy of the transaction's evaluation. The
following examples use the recommended minimum amount of information you should
submit:

{{< codeset >}}

```csharp
var transaction = new Transaction
{
    Device = new Device
    {
        IPAddress = System.Net.IPAddress.Parse("1.1.1.1")
    },
    Email = new Email
    {
        Address = "test@maxmind.com",
        Domain = "maxmind.com"
    },
    Billing = new Billing
    {
        FirstName = "First",
        LastName = "Last",
        Company = "Company, Inc.",
        Address = "1 Billing Address St.",
        Address2 = "Unit 1",
        City = "Waltham",
        Region = "MA",
        Country = "US",
        Postal = "02451",
        PhoneNumber = "555-555-5555",
        PhoneCountryCode = "1"
    },
    CreditCard = new CreditCard
    {
        IssuerIdNumber = "411111"
    },
    Shipping = new Shipping
    {
        FirstName = "First",
        LastName = "Last",
        Company = "Company Inc.",
        Address = "1 Shipping Address St.",
        Address2 = "Unit 1",
        City = "Waltham",
        Region = "MA",
        Country = "US",
        Postal = "02451",
        PhoneNumber = "555-555-5555",
        PhoneCountryCode = "1"
    }
};
```

```java
Transaction transaction = new Transaction.Builder(
        new Device.Builder(InetAddress.getByName("1.1.1.1"))
            .build()
    ).billing(
        new Billing.Builder()
            .address("1 Billing Address St.")
            .address2("Unit 1")
            .city("Waltham")
            .company("Company, Inc")
            .firstName("First")
            .lastName("Last")
            .phoneCountryCode("1")
            .phoneNumber("555-555-5555")
            .postal("02451")
            .region("MA")
            .build()
    ).creditCard(
        new CreditCard.Builder()
            .issuerIdNumber("411111")
            .build()
    ).email(
        new Email.Builder()
            .address("test@maxmind.com")
            .domain("maxmind.com")
            .build()
    ).shipping(
        new Shipping.Builder()
            .address("1 Shipping Address St.")
            .address2("Unit 1")
            .city("Waltham")
            .company("Company, Inc")
            .firstName("First")
            .lastName("Last")
            .phoneCountryCode("1")
            .phoneNumber("555-555-5555")
            .postal("02451")
            .region("MA")
            .build()
    ).build();
```

```javascript
import * as minFraud from '@maxmind/minfraud-api-node';

let transaction;

try {
  transaction = new minFraud.Transaction({
    device: new minFraud.Device({
      ipAddress: '1.1.1.1',
    }),
    billing: new minFraud.Billing({
      address: '1 Billing Address St.',
      address2: 'Unit 1',
      city: 'Waltham',
      company: 'Company, Inc.',
      country: 'US',
      firstName: 'First',
      lastName: 'Last',
      phoneCountryCode: '1',
      phoneNumber: '555-555-5555',
      postal: '02451',
      region: 'MA',
    }),
    creditCard: new minFraud.CreditCard({
      issuerIdNumber: '411111',
    }),
    email: new minFraud.Email({
      address: 'test@maxmind.com',
      domain: 'maxmind.com',
    }),
    shipping: new minFraud.Shipping({
      address: '1 Shipping Address St.',
      address2: 'Unit 1',
      city: 'Waltham',
      company: 'Company, Inc.',
      country: 'US',
      firstName: 'First',
      lastName: 'Last',
      phoneCountryCode: '1',
      phoneNumber: '555-555-5555',
      postal: '02451',
      region: 'MA',
    }),
  });
} catch (error) {
  // handle the error
}
```

```php
$request = $client->withDevice(
    ipAddress: '1.1.1.1'
)->withBilling(
    firstName: 'First',
    lastName: 'Last',
    company: 'Company',
    address: '1 Billing Address St.',
    address2: 'Unit 1',
    city: 'Waltham',
    region: 'MA',
    country: 'US',
    postal: '02451',
    phoneNumber: '555-555-5555',
    phoneCountryCode: '1'
)->withCreditCard(
    issuerIdNumber: '411111'
)->withEmail(
    address: 'test@maxmind.com',
    domain: 'maxmind.com'
)->withShipping(
    firstName: 'First',
    lastName: 'Last',
    company: 'Company',
    address: '1 Shipping Address St.',
    address2: 'Unit 1',
    city: 'Waltham',
    region: 'MA',
    country: 'US',
    postal: '02451',
    phoneNumber: '555-555-5555',
    phoneCountryCode: '1'
);
```

```python
request = {
   'device': {
       'ip_address': '1.1.1.1',
   },
   'billing': {
       'first_name': 'First',
       'last_name': 'Last',
       'company': 'Company, Inc.',
       'address': '1 Billing Address St.',
       'address_2': 'Unit 1',
       'city': 'Waltham',
       'region': 'MA',
       'country': 'US',
       'postal': '02451',
       'phone_country_code': '1',
       'phone_number': '555-555-5555',
   },
   'credit_card': {
       'issuer_id_number': '411111'
   },
   'email': {
       'address': '977577b140bfb7c516e4746204fbdb01',
       'domain': 'maxmind.com'
   },
   'shipping': {
       'first_name': 'First',
       'last_name': 'Last',
       'company': 'Company, Inc.',
       'address': '1 Shipping Address St.',
       'address_2': 'Unit 1',
       'city': 'Waltham',
       'region': 'MA',
       'country': 'US',
       'postal': '02451',
       'phone_country_code': '1',
       'phone_number': '555-555-5555',
   }
}
```

```ruby
assessment = Minfraud::Assessments.new(
  device: {
    ip_address:      '1.1.1.1',
  },
  billing: {
    first_name:         'First',
    last_name:          'Last',
    company:            'Company, Inc.',
    address:            '1 Billing Address St.',
    address_2:          'Unit 1',
    city:               'Waltham',
    region:             'MA',
    country:            'US',
    postal:             '02451',
    phone_number:       '555-555-5555',
    phone_country_code: '1',
  },
  credit_card: {
    issuer_id_number:        '411111',
  },
  email: {
    address: 'test@maxmind.com',
    domain:  'maxmind.com',
  },
  shipping: {
    first_name:         'First',
    last_name:          'Last',
    company:            'Company, Inc.',
    address:            '1 Shipping Address St.',
    address_2:          'Unit 1',
    city:               'Waltham',
    region:             'MA',
    country:            'US',
    postal:             '02451',
    phone_number:       '555-555-5555',
    phone_country_code: '1',
  },
)
```

{{</ codeset >}}

### 5. Submit the transaction object for evaluation

Our client libraries provide a distinct method for each minFraud service. Use
the appropriate method to submit the transaction object to the minFraud Score,
Insights, or Factors service.

{{< codeset >}}

```csharp
// minFraud Score
var score = await client.ScoreAsync(transaction);

// minFraud Insights
var insights = await client.InsightsAsync(transaction);

// minFraud Factors
var factors = await client.FactorsAsync(transaction);
```

```java
// minFraud Score
ScoreResponse score = client.score(transaction);

// minFraud Insights
InsightsResponse insights = client.insights(transaction);

// minFraud Factors
FactorsResponse factors = client.factors(transaction);
```

```javascript
// minFraud Score
client.score(transaction).then(scoreResponse => ...);

// minFraud Insights
client.insights(transaction).then(insightsResponse => ...);

// minFraud Factors
client.factors(transaction).then(factorsResponse => ...);
```

```php
// minFraud Score
$scoreResponse = $request->score();

// minFraud Insights
$insightsResponse = $request->insights();

// minFraud Factors
$factorsResponse = $request->factors();
```

```python
# minFraud Score - Synchronous
score_response = client.score(request)

# minFraud Score - Asynchronous
score_response = await async_client.score(request)

# minFraud Insights - Synchronous
insights_response = client.insights(request)

# minFraud Insights - Asynchronous
insights_response = await async_client.insights(request)

# minFraud Factors - Synchronous
factors_response = client.factors(request)

# minFraud Factors - Asynchronous
factors_response = await async_client.factors(request)
```

```ruby
# minFraud Score
score_model = assessment.score.body

# minFraud Insights
insights_model = assessment.insights.body

# minFraud Factors
factors_model = assessment.factors.body
```

{{</ codeset >}}

## Validation and error handling

By default, our client libraries will throw an exception if any of the
transaction object's values are invalid. The exception is thrown when the object
is constructed; the python library will raise an error when the minFraud service
method is called.

If the minFraud request fails, our client libraries will throw an exception,
raise an error (python), or reject the promise (node).

For more information on errors and exceptions, including their types and
descriptions,
[go to the specific library's documentation page](#links-to-maxmind-client-apis).

## Full examples

{{< codeset >}}

```csharp
using MaxMind.MinFraud;
using MaxMind.MinFraud.Request;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

public class MinFraudExample
{
    static void Main()
    {
        MinFraudAsync().Wait();
    }

    static public async Task MinFraudAsync()
    {
        var transaction = new Transaction
        {
            Device = new Device
            {
                IPAddress = IPAddress.Parse("1.1.1.1"),
                UserAgent = "Mozilla/5.0 (X11; Linux x86_64)",
                AcceptLanguage = "en-US,en;q=0.8",
                SessionAge = 3600,
                SessionId = "a333a4e127f880d8820e56a66f40717c"
            },
            Event = new Event
            {
                TransactionId = "txn3134133",
                ShopId = "s2123",
                Time = new DateTimeOffset(2014, 4, 12, 23, 20, 50, 52, new TimeSpan(0)),
                Type = EventType.Purchase
            },
            Account = new Account
            {
                UserId = "3132",
                Username = "fred"
            },
            Email = new Email
            {
                Address = "test@maxmind.com",
                Domain = "maxmind.com"
            },
            Billing = new Billing
            {
                FirstName = "First",
                LastName = "Last",
                Company = "Company, Inc.",
                Address = "1 Billing Address St.",
                Address2 = "Unit 1",
                City = "Waltham",
                Region = "MA",
                Country = "US",
                Postal = "02451",
                PhoneNumber = "555-555-5555",
                PhoneCountryCode = "1"
            },
            Shipping = new Shipping
            {
                FirstName = "First",
                LastName = "Last",
                Company = "Company Inc.",
                Address = "1 Shipping Address St.",
                Address2 = "Unit 1",
                City = "Waltham",
                Region = "MA",
                Country = "US",
                Postal = "02451",
                PhoneNumber = "555-555-5555",
                PhoneCountryCode = "1",
                DeliverySpeed = ShippingDeliverySpeed.SameDay
            },
            Payment = new Payment
            {
                Processor = PaymentProcessor.Stripe,
                WasAuthorized = false,
                DeclineCode = "invalid number"
            },
            CreditCard = new CreditCard
            {
                IssuerIdNumber = "411111",
                BankName = "Test Bank",
                BankPhoneCountryCode = "1",
                BankPhoneNumber = "555-555-5555",
                AvsResult = 'Y',
                CvvResult = 'N',
                LastDigits = "1234"
            },
            Order = new Order
            {
                Amount = 323.21m,
                Currency = "USD",
                DiscountCode = "FIRST",
                AffiliateId = "af12",
                SubaffiliateId = "saf42",
                ReferrerUri = new Uri("http://www.amazon.com/")
            },
            ShoppingCart = new List<ShoppingCartItem>
            {
                new ShoppingCartItem
                {
                    Category = "pets",
                    ItemId = "ad23232",
                    Quantity = 2,
                    Price = 20.43m
                },
                new ShoppingCartItem
                {
                    Category = "beauty",
                    ItemId = "bst112",
                    Quantity = 1,
                    Price = 100.00m
                }
            },
            CustomInputs = new CustomInputs.Builder
            {
                { "float_input", 12.1d},
                { "integer_input", 3123},
                { "string_input", "This is a string input."},
                { "boolean_input", true},
            }.Build()
        };

        // If you are making multiple requests, a single WebServiceClient
        // should be shared across requests to allow connection reuse. The
        // class is thread safe.
        //
        // Replace "6" with your account ID and "ABCD567890" with your license
        // key.
        using (var client = new WebServiceClient(6, "ABCD567890"))
        {
            // Use `InsightsAsync` if querying Insights; `FactorsAsync` if querying Factors
            var score = await client.ScoreAsync(transaction);
            Console.WriteLine(score);
        }
    }
}
```

```java
Transaction request = new Transaction.Builder(
        new Device.Builder(InetAddress.getByName("1.1.1.1"))
            .acceptLanguage("en-US")
            .sessionAge(3600.6)
            .sessionId("foobar")
            .userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36")
            .build()
    ).account(
        new Account.Builder()
            .userId("usr-123")
            .username("fraudster9")
            .build()
    ).billing(
        new Billing.Builder()
            .address("1 Billing Address St.")
            .address2("Unit 1")
            .city("Waltham")
            .company("Company, Inc")
            .firstName("First")
            .lastName("Last")
            .phoneCountryCode("1")
            .phoneNumber("555-555-5555")
            .postal("02451")
            .region("MA")
            .build()
    ).creditCard(
        new CreditCard.Builder()
            .avsResult('N')
            .bankName("Test Bank")
            .bankPhoneCountryCode("1")
            .bankPhoneNumber("555-555-5555")
            .cvvResult('Y')
            .issuerIdNumber("411111")
            .lastDigits("1234")
            .build()
    ).email(
        new Email.Builder()
            .address("fraud@ster.com")
            .domain("ster.com")
            .build()
    ).event(
        new Event.Builder()
            .shopId("2432")
            .time(new Date())
            .transactionId("tr1242")
            .type(Event.Type.ACCOUNT_CREATION)
            .build()
    ).order(
        new Order.Builder()
            .affiliateId("af5")
            .amount(new BigDecimal(Double.toString(1.1)))
            .currency("USD")
            .discountCode("10OFF")
            .referrerUri(new URI("https://www.google.com/"))
            .subaffiliateId("saf9")
            .build()
    ).payment(
        new Payment.Builder()
            .declineCode("invalid")
            .processor(Payment.Processor.ADYEN)
            .wasAuthorized(false)
            .build()
    ).shipping(
        new Shipping.Builder()
            .address("1 Shipping Address St.")
            .address2("Unit 1")
            .city("Waltham")
            .company("Company, Inc")
            .firstName("First")
            .lastName("Last")
            .phoneCountryCode("1")
            .phoneNumber("555-555-5555")
            .postal("02451")
            .region("MA")
            .deliverySpeed(Shipping.DeliverySpeed.EXPEDITED)
            .build()
    ).addShoppingCartItem(
        new ShoppingCartItem.Builder()
            .category("TOYS")
            .itemId("t-132")
            .price(1.1)
            .quantity(100)
            .build()
    ).addShoppingCartItem(
        new ShoppingCartItem.Builder()
            .category("COSMETICS")
            .itemId("c-12312")
            .price(3.)
            .quantity(1)
            .build()
    ).customInputs(
        new CustomInputs.Builder()
            .put("float_input", 12.1)
            .put("integer_input", 3123)
            .put("string_input", "This is a string input.")
            .put("boolean_input", true)
            .build()
    ).build();

WebServiceClient client = new WebServiceClient.Builder(6, "ABCD567890").build();

// use `client.insights` or `client.factors` for Insights and Factors respectively
System.out.println(client.score(request));
```

```javascript
import { URL } from 'url'; // Used for `order.referrerUri
import * as minFraud from '@maxmind/minfraud-api-node';
// const minFraud = require('@maxmind/minfraud-api-node');

// client is reusable
const client = new minFraud.Client('1234', 'LICENSEKEY');

let transaction;

try {
  transaction = new minFraud.Transaction({
    // device is required
    device: new minFraud.Device({
      ipAddress: '1.1.1.1',
      acceptLanguage: 'en-US,en;q=0.8',
      sessionAge: 3600,
      sessionId: 'a333a4e127f880d8820e56a66f40717c',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
    }),
    event: new minFraud.Event({
      shopId: 'shop',
      time: new Date(Date.now()),
      transactionId: 'txn1234',
      type: minFraud.Constants.EventType.PayoutChange,
    }),
    account: new minFraud.Account({
      userId: 'user123',
      username: 'userperson',
    }),
    email: new minFraud.Email({
      address: 'foo@bar.com',
      domain: 'bar.com',
    }),
    billing: new minFraud.Billing({
      address: '1 Billing Address St.',
      address2: 'Unit 1',
      city: 'Waltham',
      company: 'Company, Inc.',
      country: 'US',
      firstName: 'First',
      lastName: 'Last',
      phoneCountryCode: '1',
      phoneNumber: '555-555-5555',
      postal: '02451',
      region: 'MA',
    }),
    shipping: new minFraud.Shipping({
      address: '1 Shipping Address St.',
      address2: 'Unit 1',
      city: 'Waltham',
      company: 'Company, Inc.',
      country: 'US',
      firstName: 'First',
      lastName: 'Last',
      phoneCountryCode: '1',
      phoneNumber: '555-555-5555',
      postal: '02451',
      region: 'MA',
    }),
    payment: new minFraud.Payment({
      declineCode: 'A',
      processor: minFraud.Constants.Processor.ConceptPayments,
      wasAuthorized: true,
    }),
    creditCard: new minFraud.CreditCard({
      avsResult: 'A',
      bankName: 'Test bank',
      bankPhoneCountryCode: '1',
      bankPhoneNumber: '555-555-5555',
      cvvResult: 'B',
      issuerIdNumber: '411111',
      lastDigits: '1234',
      token: 'a_token',
    }),
    order: new minFraud.Order({
      affiliateId: 'robotnet',
      amount: 22.99,
      currency: 'USD',
      discountCode: 'COUPONS',
      hasGiftMessage: true,
      isGift: true,
      referrerUri: new URL('https://robots.com/swarms'),
      subaffiliateId: 'swarm',
    }),
    shoppingCart: [
      new minFraud.ShoppingCartItem({
        category: 'screws',
        itemId: 'sc123',
        price: 9.99,
        quantity: 100,
      }),
      new minFraud.ShoppingCartItem({
        category: 'screws',
        itemId: 'sc123',
        price: 9.99,
        quantity: 100,
      }),
    ],
    customInputs: [
      new minFraud.CustomInput('key', 'value'),
      new minFraud.CustomInput('key_2', true),
      new minFraud.CustomInput('key_3', 100),
    ],
  });
} catch (error) {
  // handle the error
}

// Use `client.insights` or `client.factors` for Insights and Factors respectively
client.score(transaction).then((response) => {
  console.log(response.riskScore); // 50
  console.log(response.ipAddress.risk); // 50
});
```

```php
<?php
require_once 'vendor/autoload.php';
use MaxMind\MinFraud;

# The constructor for MinFraud takes your account ID, your license key, and
# optionally an array of options.
$mf = new MinFraud(1, 'ABCD567890');

# Note that each ->with*() call returns a new immutable object. This means
# that if you separate the calls into separate statements without chaining,
# you should assign the return value to a variable each time.
$request = $mf->withDevice(
    ipAddress: '1.1.1.1',
    sessionAge: 3600.5,
    sessionId: 'foobar',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36',
    acceptLanguage: 'en-US,en;q=0.8'
)->withEvent(
    transactionId: 'txn3134133',
    shopId: 's2123',
    time: '2012-04-12T23:20:50+00:00',
    type: 'purchase'
)->withAccount(
    userId: 3132,
    usernameMd5: '4f9726678c438914fa04bdb8c1a24088'
)->withEmail(
    address: 'test@maxmind.com',
    domain: 'maxmind.com'
)->withBilling(
    firstName: 'First',
    lastName: 'Last',
    company: 'Company',
    address: '1 Billing Address St.',
    address2: 'Unit 1',
    city: 'Waltham',
    region: 'MA',
    country: 'US',
    postal: '02451',
    phoneNumber: '555-555-5555',
    phoneCountryCode: '1'
)->withShipping(
    firstName: 'First',
    lastName: 'Last',
    company: 'Company',
    address: '1 Shipping Address St.',
    address2: 'Unit 1',
    city: 'Waltham',
    region: 'MA',
    country: 'US',
    postal: '02451',
    phoneNumber: '555-555-5555',
    phoneCountryCode: '1',
    deliverySpeed: 'same_day'
)->withPayment(
    processor: 'stripe',
    wasAuthorized: false,
    declineCode: 'invalid number'
)->withCreditCard(
    issuerIdNumber: '411111',
    lastDigits: '1234',
    bankName: 'Test Bank',
    bankPhoneCountryCode: '1',
    bankPhoneNumber: '555-555-5555',
    avsResult: 'Y',
    cvvResult: 'N'
)->withOrder(
    amount: 323.21,
    currency: 'USD',
    discountCode: 'FIRST',
    isGift: true,
    hasGiftMessage: false,
    affiliateId: 'af12',
    subaffiliateId: 'saf42',
    referrerUri: 'http://www.amazon.com/'
)->withShoppingCartItem(
    category: 'pets',
    itemId: 'leash-0231',
    quantity: 2,
    price: 20.43
)->withShoppingCartItem(
    category: 'beauty',
    itemId: 'msc-1232',
    quantity: 1,
    price: 100.00
)->withCustomInputs([
    'section'            => 'news',
    'previous_purchases' => 19,
    'discount'           => 3.2,
    'previous_user'      => true,
]);

# To get the minFraud Factors response model, use ->factors():
$factorsResponse = $request->factors();

foreach ($factorsResponse->riskScoreReasons as $riskScoreReason) {
    print($riskScoreReason->multiplier . "\n");
    foreach ($riskScoreReason->reasons as $reason) {
        print($reason->code . ': ' . $reason->reason . "\n");
    }
}

# To get the minFraud Insights response model, use ->insights():
$insightsResponse = $request->insights();

print($insightsResponse->riskScore . "\n");
print($insightsResponse->creditCard->issuer->name . "\n");

foreach ($insightsResponse->warnings as $warning) {
    print($warning->warning . "\n");
}

# To get the minFraud Score response model, use ->score():
$scoreResponse = $request->score();

print($scoreResponse->riskScore . "\n");

foreach ($scoreResponse->warnings as $warning) {
    print($warning->warning . "\n");
}
```

```python
import asyncio  # Only needed for asynchronous requests
from minfraud import AsyncClient, Client

request = {
    'device': {
        'ip_address': '1.1.1.1',
        'accept_language': 'en-US,en;q=0.8',
        'session_age': 3600,
        'session_id': 'a333a4e127f880d8820e56a66f40717c',
        'user_agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36'
    },
    'event': {
        'shop_id': 's2123',
        'type': 'purchase',
        'transaction_id': 'txn3134133',
        'time': '2014-04-12T23:20:50.052+00:00'
    },
    'account': {
        'user_id': '3132',
        'username_md5': '570a90bfbf8c7eab5dc5d4e26832d5b1'
    },
    'email': {
        'address': '977577b140bfb7c516e4746204fbdb01',
        'domain': 'maxmind.com'
    },
    'billing': {
        'first_name': 'First',
        'last_name': 'Last',
        'company': 'Company, Inc.',
        'address': '1 Billing Address St.',
        'address_2': 'Unit 1',
        'city': 'Waltham',
        'region': 'MA',
        'country': 'US',
        'postal': '02451',
        'phone_country_code': '1',
        'phone_number': '555-555-5555',
    },
    'shipping': {
        'first_name': 'First',
        'last_name': 'Last',
        'company': 'Company, Inc.',
        'address': '1 Shipping Address St.',
        'address_2': 'Unit 1',
        'city': 'Waltham',
        'region': 'MA',
        'country': 'US',
        'postal': '02451',
        'phone_country_code': '1',
        'phone_number': '555-555-5555',
        'delivery_speed': 'same_day',
    },
    'credit_card': {
        'bank_phone_country_code': '1',
        'avs_result': 'Y',
        'bank_phone_number': '555-555-5555',
        'last_digits': '1234',
        'cvv_result': 'N',
        'bank_name': 'Test Bank',
        'issuer_id_number': '411111'
    },
    'payment': {
        'decline_code': 'invalid number',
        'was_authorized': False,
        'processor': 'stripe'
    },
    'shopping_cart': [{
        'category': 'pets',
        'quantity': 2,
        'price': 20.43,
        'item_id': 'lsh12'
    }, {
        'category': 'beauty',
        'quantity': 1,
        'price': 100.0,
        'item_id': 'ms12'
    }],
    'order': {
        'affiliate_id': 'af12',
        'referrer_uri': 'http://www.amazon.com/',
        'subaffiliate_id': 'saf42',
        'discount_code': 'FIRST',
        'currency': 'USD',
        'amount': 323.21
    },
    'custom_inputs': {
        'section': 'news',
        'num_of_previous_purchases': 19,
        'discount': 3.2,
        'previous_user': True
    }
}

# This example function uses a synchronous Client object. The object
# can be used across multiple requests.
def sync_example(account_id, license_key):
    with Client(account_id, license_key) as client:
        print(client.score(request))
        print(client.insights(request))
        print(client.factors(request))

sync_example(42, 'license_key')

# This example function uses an asynchronous AsyncClient object. The
# object can be used across multiple requests.
async def async_example(account_id, license_key):
    async with AsyncClient(account_id, license_key) as client:
        print(await client.score(request))
        print(await client.insights(request))
        print(await client.factors(request))

asyncio.run(async_example(42, 'license_key'))
```

```ruby
# Prepare the request.
assessment = Minfraud::Assessments.new(
  device: {
    ip_address:      '1.1.1.1',
    accept_language: 'en-US,en;q=0.8',
    session_age:     3600.5,
    session_id:      'foo',
    user_agent:      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36',
  },
  event: {
    transaction_id: 'txn3134133',
    shop_id:        's2123',
    time:           '2012-04-12T23:20:50+00:00',
    type:           :purchase,
  },
  account: {
    user_id:      '3132',
    username_md5: '4f9726678c438914fa04bdb8c1a24088',
  },
  email: {
    address: 'test@maxmind.com',
    domain:  'maxmind.com',
  },
  billing: {
    first_name:         'First',
    last_name:          'Last',
    company:            'Company, Inc.',
    address:            '1 Billing Address St.',
    address_2:          'Unit 1',
    city:               'Waltham',
    region:             'MA',
    country:            'US',
    postal:             '02451',
    phone_number:       '555-555-5555',
    phone_country_code: '1',
  },
  shipping: {
    first_name:         'First',
    last_name:          'Last',
    company:            'Company, Inc.',
    address:            '1 Shipping Address St.',
    address_2:          'Unit 1',
    city:               'Waltham',
    region:             'MA',
    country:            'US',
    postal:             '02451',
    phone_number:       '555-555-5555',
    phone_country_code: '1',
    delivery_speed:     :same_day,
  },
  payment: {
    processor:      :stripe,
    was_authorized: false,
    decline_code:   'invalid number',
  },
  credit_card: {
    issuer_id_number:        '411111',
    last_digits:             '1234',
    bank_name:               'Test Bank',
    bank_phone_country_code: '1',
    bank_phone_number:       '555-555-5555',
    token:                   'abcd',
    avs_result:              'Y',
    cvv_result:              'N',
  },
  order: {
    amount:           323.21,
    currency:         'USD',
    discount_code:    'FIRST',
    is_gift:          true,
    has_gift_message: false,
    affiliate_id:     'af12',
    subaffiliate_id:  'saf42',
    referrer_uri:     'http://www.amazon.com/',
  },
  shopping_cart: [
    {
      category: 'pets',
      item_id:  'leash-0231',
      quantity: 2,
      price:    20.43,
    },
    {
      category: 'beauty',
      item_id:  'msc-1232',
      quantity: 1,
      price:    100.00,
    },
  ],
  custom_inputs: {
    section:            'news',
    previous_purchases: 19,
    discount:           3.2,
    previous_user:      true,
  },
)

# To get the Factors response model, use #factors.
factors_model = assessment.factors.body

factors_model.warnings.each { |w| puts w.warning }

factors_model.risk_score_reasons.each do |risk_score_reason|
  p risk_score_reason.multiplier
  risk_score_reason.reasons.each do |reason|
    p "#{reason.code}: #{reason.reason}"
  end
end
p factors_model.risk_score

# To get the Insights response model, use #insights.
insights_model = assessment.insights.body

insights_model.warnings.each { |w| puts w.warning }

p insights_model.credit_card.issuer.name
p insights_model.risk_score

# To get the Score response model, use #score.
score_model = assessment.score.body

score_model.warnings.each { |w| puts w.warning }

p score_model.risk_score
```

{{</ codeset >}}

## Links to MaxMind client APIs

{{< snippet "snippets/minfraud-client-apis.md" >}}
