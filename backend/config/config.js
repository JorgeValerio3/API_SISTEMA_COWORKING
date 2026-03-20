// Re-export from env.ts for backward compatibility
// Modules that import from config.ts will continue to work
import { ENV } from "./env.js";
export const SECRET = ENV.JWT_SECRET;
export const EXPIRES = ENV.JWT_EXPIRES_IN;
export const MAIL = ENV.MAIL_USER;
export const APP_PASS = ENV.MAIL_APP_PASSWORD;
export const URL_PAGE = ENV.URL_PAGE;
export const OPTIONS_HTTPONLY_COOKIE = ENV.OPTIONS_HTTPONLY_COOKIE;
//# sourceMappingURL=config.js.map