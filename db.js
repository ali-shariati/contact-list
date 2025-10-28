
import pg from "pg";

const pool = new pg.Pool({
    database: 'appdb',
    user: 'admin',
    password: 'adminpass',
})
export function query(text, params) {
    return pool.query(text, params)
}
