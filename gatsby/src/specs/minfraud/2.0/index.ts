// eslint-disable-next-line filenames/match-exported
import OpenApiParser from '@apidevtools/swagger-parser';
import { OpenAPI } from 'openapi-types';
import { OpenApiBuilder, RequestBodyObject } from 'openapi3-ts';

import Request from './models/Request/Request';
import * as Response from './models/Response';

const api = new OpenApiBuilder();

const requestBody: RequestBodyObject  = {
  content: {
    'application/json': {
      schema: Request,
    },
    'application/vnd.maxmind.com-minfraud-score+json': {
      schema: Request,
    },
    'application/vnd.maxmind.com-minfraud-score+json; charset=UTF-8; version=2.0': {
      schema: Request,
    },
  },
  required: true,
};

api
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
              schema: Response.Score,
            },
          },
          description: 'Success',
        },
        ...Response.Errors,
      },
    },
  })
  .addPath('/factors', {
    post: {
      requestBody,
      responses: {
        200: {
          content: {
            'application/json': {
              schema: Response.Factors,
            },
          },
          description: 'Success',
        },
        ...Response.Errors,
      },
    },
  })
  .addPath('/insights', {
    post: {
      requestBody,
      responses: {
        200: {
          content: {
            'application/json': {
              schema: Response.Insights,
            },
          },
          description: 'Success',
        },
        ...Response.Errors,
      },
    },
  })
;

try {
  OpenApiParser.validate(api.getSpec() as OpenAPI.Document);
}
catch(err) {
  console.error(err);
}

export default api;
