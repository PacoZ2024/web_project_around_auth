import isEmail from 'validator/lib/isEmail';

export function validateEmail(email) {
  return isEmail(email);
}

export function validatePassword(password) {
  const passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  return passwordRegex.test(password);
}
