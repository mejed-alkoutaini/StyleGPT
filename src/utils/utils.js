// Validates an email address using a regular expression
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validates a password to ensure it is at least 8 characters long
export function isValidPassword(password) {
  const passwordRegex = /^.{8,}$/;
  return passwordRegex.test(password);
}

// Generates a UUID using crypto.getRandomValues for randomness
export const uuidGenerator = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
};
