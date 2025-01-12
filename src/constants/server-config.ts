export const serverConfig = Object.freeze({
    port: parseInt(process.env.PORT!, 10),
    jwt_secret: process.env.JWT_SECRET!,
    jwt_expire: process.env.JWT_EXPIRE!,
    bcrypt_salt: process.env.BCRYPT_SALT!,
    db: process.env.DB_NAME!,
    db_user_name: process.env.DB_USER_NAME!,
    db_password: process.env.DB_PASSWORD!,
    db_host: process.env.DB_HOST!,
    db_port: parseInt(process.env.DB_PORT!, 10)
})