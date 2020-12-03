/* eslint-disable @typescript-eslint/no-explicit-any */
export default (subject: unknown): Record<any, any> => (
  subject && typeof subject === 'object'
)
  ? subject as Record<any, any>
  : {};
