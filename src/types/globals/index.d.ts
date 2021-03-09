/* eslint-disable @typescript-eslint/no-explicit-any */
declare type GraphqlFn = <TData, TVariables = any>(
  query: string,
  variables?: TVariables
) => Promise<{
  data?: {
    allMdx: {
      nodes: TData[],
    };
  };
  errors?: any,
}>

declare type QueryFn<T> = {
  (graphql: GraphqlFn): Promise<{
    data?: {
      allMdx: {
        nodes: T[];
      };
    };
    errors?: any;
  }>;
}

declare type JsonPrimitive = string | number | boolean | null

// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface IJsonMap extends Record<
  string,
  JsonPrimitive | IJsonArray | IJsonMap
> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface IJsonArray extends Array<
  JsonPrimitive | IJsonArray | IJsonMap
> {}

declare type Json = JsonPrimitive | IJsonMap | IJsonArray;
