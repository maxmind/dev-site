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
