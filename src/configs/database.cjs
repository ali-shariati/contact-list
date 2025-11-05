module.exports = {
    development: {
        username: process.env.DB_USERNAME || 'admin',
        password: process.env.DB_PASSWORD || 'adminpass',
        database: 'appdb',
        dialect: "postgres",
        logging: false,
    },

}