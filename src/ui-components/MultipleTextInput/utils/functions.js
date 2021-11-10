export const emailVerifier = email => {
  if (email === undefined || email === "") return "This field is required."
  const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!email.match(EMAIL_REGEX)) return `"${email}" is not a valid email.`
};