import { SchemaObject } from 'openapi3-ts';

const Insights: SchemaObject = {
  allOf: [
    {
      $ref: '#/components/schemas/Response.Factors',
    },
    {
      properties: {
        subscores: {
          $ref: '#/components/schemas/Response.Insights.Subscores',
        },
      },
      type: 'object',
    },
  ],
};

export default Insights;
