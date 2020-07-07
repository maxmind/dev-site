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

export default Account;
