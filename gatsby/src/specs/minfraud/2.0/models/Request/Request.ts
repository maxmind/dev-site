import { SchemaObject } from 'openapi3-ts';

const Account: SchemaObject = {
  description: 'This object contains account information for the end-user on the site where the event took place.',
  properties: {
    user_id: {
      description: 'A unique user ID associated with the end-user in your system. If your system allows the login name for the account to be changed, this should not be the login name for the account, but rather should be an internal ID that does not change. This is not your MaxMind user ID.',
      example: '3132',
      maxLength: 255,
      type: 'string',
    },
    username_md5: {
      description: 'An MD5 hash as a hexadecimal string of the username or login name associated with the account.',
      example: '570a90bfbf8c7eab5dc5d4e26832d5b1',
      maxLength: 32,
      type: 'string',
    },
  },
  type: 'object',
};

const Address: SchemaObject = {
  properties: {
    address: {
      description: 'The first line of the user’s billing address.',
      example: '400 Blake St.',
      maxLength: 255,
      type: 'string',
    },
    address_2: {
      description: 'The second line of the user’s billing address.',
      example: 'Suite 5',
      maxLength: 255,
      type: 'string',
    },
    city: {
      description: 'The city of the user’s billing address.',
      example: 'New Haven',
      maxLength: 255,
      type: 'string',
    },
    company: {
      description: 'The company of the end user as provided in their billing information.',
      example: 'Big Corp.',
      maxLength: 255,
      type: 'string',
    },
    country: {
      description: 'The two character [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the user’s billing address.',
      example: 'US',
      maxLength: 2,
      type: 'string',
    },
    first_name: {
      description: 'The first name of the end user as provided in their billing information.',
      example: 'John',
      maxLength: 255,
      type: 'string',
    },
    last_name: {
      description: 'The last name of the end user as provided in their billing information.',
      example: 'Doe',
      maxLength: 255,
      type: 'string',
    },
    phone_country_code: {
      description: 'The country code for phone number associated with the user’s billing address.',
      example: '1',
      maxLength: 3,
      type: 'string',
    },
    phone_number: {
      description: 'The phone number without the country code for the user’s billing address.',
      example: '203-000-0000',
      maxLength: 255,
      type: 'string',
    },
    postal: {
      description: 'The postal code of the user’s billing address.',
      example: '06515',
      maxLength: 255,
      type: 'string',
    },
    region: {
      description: 'The [ISO 3166-2 subdivision code](http://en.wikipedia.org/wiki/ISO_3166-2) for the user’s billing address.',
      example: 'CT',
      maxLength: 4,
      type: 'string',
    },
  },
  type: 'object',
};

const CreditCard: SchemaObject = {
  properties: {
    avs_result: {
      description: 'The address verification system (AVS) check result, as returned to you by the credit card processor. The minFraud service supports the standard AVS codes.',
      example: 'Y',
      maxLength: 1,
      type: 'string',
    },
    bank_name: {
      description: 'The name of the issuing bank as provided by the end user.',
      example: 'Bank of America',
      maxLength: 255,
      type: 'string',
    },
    bank_phone_country_code: {
      description: 'The phone country code for the issuing bank as provided by the end user.',
      example: '1',
      maxLength: 4,
      type: 'string',
    },
    bank_phone_number: {
      description: 'The phone number, without the country code, for the issuing bank as provided by the end user.',
      example: '800-342-1232',
      maxLength: 255,
      type: 'string',
    },
    cvv_result: {
      description: 'The card verification value (CVV) code as provided by the payment processor.',
      example: 'N',
      maxLength: 1,
      type: 'string',
    },
    issuer_id_number: {
      description: 'The issuer ID number for the credit card. This is the first 6 digits of the credit card number. It identifies the issuing bank.',
      example: '323132',
      maxLength: 6,
      type: 'string',
    },
    last_4_digits: {
      description: 'The last four digits of the credit card number.',
      example: '7643',
      maxLength: 4,
      type: 'string',
    },
    token: {
      description: 'A token uniquely identifying the card. The token should consist of non-space printable ASCII characters. If the token is all digits, it must be more than 19 characters long. The token must not be a primary account number (PAN) or a simple transformation of it. If you have a valid token that looks like a PAN but is not one, you may prefix that token with a fixed string, e.g., `token-`.',
      example: 'OQRST14PLQ98323',
      maxLength: 255,
      type: 'string',
    },
  },
  type: 'object',
};

const Device = {
  description: 'This object contains information about the device used in the transaction.',
  properties: {
    accept_langauge: {
      description: 'The HTTP “Accept-Language” header of the device used in the transaction.',
      example: 'en-US,en;q=0.8',
      maxLength: 255,
      type: 'string',
    },
    ip_address: {
      description: 'The IP address associated with the device used by the customer in the transaction. The IP address must be in IPv4 or IPv6 presentation format, i.e., dotted-quad notation or the IPv6 hexadecimal-colon notation.',
      example: '45.36.197.188',
      type: 'string',
    },
    user_agent: {
      description: 'The HTTP “User-Agent” header of the browser used in the transaction.',
      example: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36',
      maxLength: 255,
      type: 'string',
    },
  },
  required: [
    'ip_address',
  ],
  type: 'object',
};

const Email: SchemaObject = {
  properties: {
    address: {
      description: 'This field must be either be a valid email address or an MD5 of the email used in the transaction.',
      example: '977577b140bfb7c516e4746204fbdb01',
      maxLength: 255,
      type: 'string',
    },
    domain: {
      description: 'The domain of the email address used in the transaction.',
      example: 'maxmind.com',
      maxLength: 255,
      type: 'string',
    },
  },
  type: 'object',
};

const Event: SchemaObject = {
  description: 'This object contains general information related to the event being scored.',
  properties: {
    shop_id: {
      description: 'Your internal ID for the shop, affiliate, or merchant this order is coming from. Required for minFraud users who are resellers, payment providers, gateways and affiliate networks.',
      example: 's2123',
      maxLength: 255,
      type: 'string',
    },
    time: {
      description: 'The date and time the event occurred. The string must be in the [RFC 3339](https://tools.ietf.org/html/rfc3339) date-time format, e.g., “2012-04-12T23:20:50.52Z”. If this field is not in the request, the current time will be used.',
      example: '2012-04-12T23:20:50.52Z',
      type: 'string',
    },
    transaction_id: {
      description: 'Your internal ID for the transaction. We can use this to locate a specific transaction in our logs, and it will also show up in email alerts and notifications from us to you.',
      example: 'txn3134133',
      maxLength: 255,
      type: 'string',
    },
    type: {
      description: 'The type of event being scored.',
      enum: [
        'account_creation',
        'account_login',
        'email_change',
        'password_reset',
        'purchase',
        'recurring_purchase',
        'referral',
        'survey',
      ],
      example: 'purchase',
      type: 'string',
    },
  },
  type: 'object',
};

const Order: SchemaObject = {
  properties: {
    affiliate_id: {
      description: 'The ID of the affiliate where the order is coming from.',
      example: 'af12',
      maxLength: 255,
      type: 'string',
    },
    amount: {
      description: 'The total order amount for the transaction before taxes and discounts.',
      example: 323.21,
      format: 'decimal',
      maxLength: 255,
      type: 'number',
    },
    currency: {
      description: 'The [ISO 4217 currency code] (http://en.wikipedia.org/wiki/ISO_4217) for the currency used in the transaction.',
      example: 'USD',
      maxLength: 3,
      type: 'string',
    },
    discount_code: {
      description: 'The discount code applied to the transaction. If multiple discount codes were used, please separate them with a comma.',
      example: 'FIRST',
      maxLength: 255,
      type: 'string',
    },
    has_gift_message: {
      description: 'Whether the purchaser included a gift message.',
      example: false,
      type: 'boolean',
    },
    is_gift: {
      description: 'Whether order was marked as a gift by the purchaser.',
      example: true,
      type: 'boolean',
    },
    referrer_uri: {
      description: 'The URI of the referring site for this order. Needs to be absolute and have a URI scheme such as `https://`.',
      example: 'http://www.google.com/',
      maxLength: 1024,
      type: 'string',
    },
    subaffiliate_id: {
      description: 'The ID of the sub-affiliate where the order is coming from.',
      example: 'saf42',
      maxLength: 255,
      type: 'string',
    },
  },
  type: 'object',
};

const Payment: SchemaObject = {
  properties: {
    decline_code: {
      description: 'The decline code as provided by your payment processor. If the transaction was not declined, do not include this field.',
      example: 'card_declined',
      maxLength: 255,
      type: 'string',
    },
    processor: {
      description: 'If your payment processor is missing from this list, please contact [support@maxmind.com}(mailto:support@maxmind.com).',
      enum: [
        'adyen',
        'altapay',
        'amazon_payments',
        'authorizenet',
        'balanced',
        'beanstream',
        'bluepay',
        'braintree',
        'ccnow',
        'chase_paymentech',
        'cielo',
        'collector',
        'compropago',
        'concept_payments',
        'conekta',
        'cuentadigital',
        'dalpay',
        'dibs',
        'digital_river',
        'ebs',
        'ecomm365',
        'elavon',
        'epay',
        'eprocessing_network',
        'eway',
        'first_data',
        'global_payments',
        'hipay',
        'ingenico',
        'internetsecure',
        'intuit_quickbooks_payments',
        'iugu',
        'lemon_pay',
        'mastercard_payment_gateway',
        'mercadopago',
        'merchant_esolutions',
        'mirjeh',
        'mollie',
        'moneris_solutions',
        'nmi',
        'openpaymx',
        'optimal_payments',
        'orangepay',
        'other',
        'pacnet_services',
        'payfast',
        'paygate',
        'payone',
        'paypal',
        'payplus',
        'paystation',
        'paytrace',
        'paytrail',
        'payture',
        'payu',
        'payulatam',
        'pinpayments',
        'princeton_payment_solutions',
        'psigate',
        'qiwi',
        'quickpay',
        'raberil',
        'rede',
        'redpagos',
        'rewardspay',
        'sagepay',
        'simplify_commerce',
        'skrill',
        'smartcoin',
        'sps_decidir',
        'stripe',
        'telerecargas',
        'towah',
        'usa_epay',
        'verepay',
        'vindicia',
        'virtual_card_services',
        'vme',
        'worldpay',
      ],
      example: 'stripe',
      type: 'string',
    },
    was_authorized: {
      description: 'The authorization outcome from the payment processor. If the transaction has not yet been approved or denied, do not include this field.',
      example: 'false,',
      type: 'boolean',
    },
  },
  type: 'object',
};

const ShoppingCartItem: SchemaObject = {
  properties: {
    category: {
      description: 'The category of the item.',
      maxLength: 255,
      type: 'string',
    },
    item_id: {
      description: 'Your internal ID for the item.',
      maxLength: 255,
      type: 'string',
    },
    price: {
      description: 'The per-unit price of this item in the shopping cart. This should use the same currency as the order currency.',
      format: 'decimal',
      type: 'number',
    },
    quantity: {
      description: 'The quantity of the item in the shopping cart.',
      type: 'integer',
    },
  },
  type: 'object',
};

const ShoppingCart: SchemaObject = {
  description: 'This is an array of shopping cart item objects. A shopping cart should consist of an array of one or more item objects.',
  example: [
    {
      category: 'pets',
      item_id: 'ad23232',
      price: 20.43,
      quantity: 2,
    },
    {
      category: 'beauty',
      item_id: 'bst112',
      price: 100,
      quantity: 1,
    },
  ],
  items: ShoppingCartItem,
  type: 'array',
};

const Request: SchemaObject = {
  properties: {
    account: Account,
    billing: Address,
    credit_card: CreditCard,
    device: Device,
    email: Email,
    event: Event,
    order: Order,
    payment: Payment,
    shipping: Address,
    shopping_cart: ShoppingCart,
  },
  required: [
    'device',
  ],
  type: 'object',
};

export default Request;
