export default {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'appdb',
        dialect: "postgres",
        logging: false,
    },

}