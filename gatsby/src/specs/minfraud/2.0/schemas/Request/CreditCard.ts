import { SchemaObject } from 'openapi3-ts';

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

export default CreditCard;
