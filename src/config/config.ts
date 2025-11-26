import 'dotenv/config'

export const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    SALT_ROUNDS: process.env.SALT,
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
    SEVEN_DAYS: process.env.SEVEN_DAYS || 7 * 24 * 60 * 60 * 1000,
    SHORT_TIME: process.env.SHORT_TIME,
    WINDOW_SIZE_MS: process.env.WINDOW_SIZE_MS || 60 * 10000,
    MAX_REQUEST: process.env.MAX_REQUEST || 100
}
