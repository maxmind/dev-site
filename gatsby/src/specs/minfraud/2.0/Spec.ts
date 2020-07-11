import { OpenApiBuilder, RequestBodyObject } from 'openapi3-ts';

import Request from './schemas/Request';
import RequestAccount from './schemas/Request/Account';
import RequestAddress from './schemas/Request/Address';
import RequestCreditCard from './schemas/Request/CreditCard';
import RequestCustomInput from './schemas/Request/CustomInput';
import RequestCustomInputs from './schemas/Request/CustomInputs';
import RequestDevice from './schemas/Request/Device';
import RequestEmail from './schemas/Request/Email';
import RequestEvent from './schemas/Request/Event';
import RequestOrder from './schemas/Request/Order';
import RequestPayment from './schemas/Request/Payment';
import RequestShoppingCart from './schemas/Request/ShoppingCart';
import RequestShoppingCartItem from './schemas/Request/ShoppingCartItem';
import ResponseFactors from './schemas/Response/Factors';
import ResponseFactorsBillingAddress from './schemas/Response/Factors/BillingAddress';
import ResponseFactorsDevice from './schemas/Response/Factors/Device';
import ResponseFactorsEmail from './schemas/Response/Factors/Email';
import ResponseFactorsIpAddress from './schemas/Response/Factors/IpAddress';
import ResponseFactorsIpAddressGeoName from './schemas/Response/Factors/IpAddress/GeoName';
import ResponseFactorsShippingAddress from './schemas/Response/Factors/ShippingAddress';
import ResponseInsights from './schemas/Response/Insights';
import ResponseInsightsSubscores from './schemas/Response/Insights/Subscores';
import ResponseScore from './schemas/Response/Score';
import ResponseScoreDisposition from './schemas/Response/Score/Disposition';
import ResponseScoreIpAddress from './schemas/Response/Score/IpAddress';
import ResponseScoreWarnings from './schemas/Response/Score/Warnings';
import { addCompiledExamples } from './utils';


const Spec = new OpenApiBuilder();

const requestBody: RequestBodyObject  = {
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/Request',
      },
    },
    'application/vnd.maxmind.com-minfraud-score+json': {
      schema: {
        $ref: '#/components/schemas/Request',
      },
    },
    'application/vnd.maxmind.com-minfraud-score+json; charset=UTF-8; version=2.0': {
      schema: {
        $ref: '#/components/schemas/Request',
      },
    },
  },
  required: true,
};

Spec
  .addTitle('minFraud')
  .addVersion('2.0')
  .addServer({
    url: 'https://minfraud.maxmind.com/minfraud/v2.0',
  })
  .addSecurityScheme(
    'basicAuth',
    {
      scheme: 'basic',
      type: 'http',
    }
  )

  .addPath('/score', {
    post: {
      requestBody,
      responses: {
        200: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Response.Score',
              },
            },
          },
          description: 'Success',
        },
      },
    },
  })
  .addSchema('Request', Request)
  .addSchema('Request.Account', RequestAccount)
  .addSchema('Request.Address', RequestAddress)
  .addSchema('Request.Billing', RequestAddress)
  .addSchema('Request.CreditCard', RequestCreditCard)
  .addSchema('Request.CustomInput', RequestCustomInput)
  .addSchema('Request.CustomInputs', RequestCustomInputs)
  .addSchema('Request.Device', RequestDevice)
  .addSchema('Request.Email', RequestEmail)
  .addSchema('Request.Event', RequestEvent)
  .addSchema('Request.Order', RequestOrder)
  .addSchema('Request.Payment', RequestPayment)
  .addSchema('Request.Shipping', RequestAddress)
  .addSchema('Request.ShoppingCart', RequestShoppingCart)
  .addSchema('Request.ShoppingCartItem', RequestShoppingCartItem)
  .addSchema('Response.Score', ResponseScore)
  .addSchema('Response.Score.Disposition', ResponseScoreDisposition)
  .addSchema('Response.Score.IpAddress', ResponseScoreIpAddress)
  .addSchema('Response.Score.Warnings', ResponseScoreWarnings)


  .addPath('/factors', {
    post: {
      requestBody,
      responses: {
        200: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Response.Factors',
              },
            },
          },
          description: 'Success',
        },
      },
    },
  })
  .addSchema('Response.Factors', ResponseFactors)
  .addSchema('Response.Factors.BillingAddress', ResponseFactorsBillingAddress)
  .addSchema('Response.Factors.Device', ResponseFactorsDevice)
  .addSchema('Response.Factors.Email', ResponseFactorsEmail)
  .addSchema('Response.Factors.IpAddress', ResponseFactorsIpAddress)
  .addSchema('Response.Factors.IpAddress.GeoName', ResponseFactorsIpAddressGeoName)
  .addSchema('Response.Factors.ShippingAddress', ResponseFactorsShippingAddress)

  .addPath('/insights', {
    post: {
      requestBody,
      responses: {
        200: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Response.Insights',
              },
            },
          },
          description: 'Success',
        },
      },
    },
  })
  .addSchema('Response.Insights', ResponseInsights)
  .addSchema('Response.Insights.Subscores', ResponseInsightsSubscores)
;

export const getRenderedSpec = (): Promise<unknown> => addCompiledExamples(
  Spec.getSpec()
);

export default Spec;
