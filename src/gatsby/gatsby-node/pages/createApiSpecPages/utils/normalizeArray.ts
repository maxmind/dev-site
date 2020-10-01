export default (subject: unknown): unknown[] => Array.isArray(subject)
  ? subject
  : [
    subject,
  ];
