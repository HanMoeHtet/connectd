// Validation
export const MIN_USERNAME_LENGTH = 7;
export const MAX_USERNAME_LENGTH = 30;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 20;
export const MIN_AGE = 15;

// Language settings
export const DEFAULT_LOCALE = 'en';

// Token config
export const BCRYPT_ROUNDS = 10;
export const EMAIL_VERIFICATION_TOKEN_EXPIRATION_IN_MS = 24 * 60 * 60 * 1000;
export const OTP_LENGTH = 6;
export const OTP_EXPIRATION_IN_MS = 15 * 60 * 1000;
export const AUTH_TOKEN_TYPE = 'Bearer';

//HTTP status codes
export const SUCCESS = 200;
export const CREATED = 201;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const CONFLICT = 409;
export const GONE = 410;
export const SERVER_ERROR = 500;
