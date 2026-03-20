import "dotenv/config";

export const ENV = {
    PORT: Number(process.env.PORT) || 5000,
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
    DB_NAME: process.env.DB_NAME || "srec2",
    DB_CONNECTION_LIMIT: Number(process.env.DB_CONNECTION_LIMIT) || 10,
    JWT_SECRET: process.env.JWT_SECRET || "fallback-secret-change-me",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "60m",
    MAIL_USER: process.env.MAIL_USER || "",
    MAIL_APP_PASSWORD: process.env.MAIL_APP_PASSWORD || "",
    NODE_ENV: process.env.NODE_ENV || "development",
    URL_PAGE: process.env.URL_PAGE || "http://localhost:5000",
    OPTIONS_HTTPONLY_COOKIE: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge: 1000 * 60 * 60
    }
};
