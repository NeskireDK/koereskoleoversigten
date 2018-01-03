import mysql from "mysql2/promise"

let pool;

export async function createPool() {
    pool = await mysql.createPool({
        connectionLimit: 10,
        host: '188.166.20.243',
        user: 'webapp',
        password: 'fuckwindows',
        database: '12drive'
    });
}

export function getConnection() {
    return pool.getConnection();
}

export function execute(sql, values) {
    return pool.execute(sql, values)
}

export function query(...args) {
    return pool.query(...args)
}

export function getPool() {
    return pool;
}
