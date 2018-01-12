import mysql from "mysql2/promise"

let pool;

export async function createPool() {
    pool = await mysql.createPool({
        connectionLimit: 10,
        host: '104.197.147.249',
        user: 'webapp',
        password: 'fuckwindows',
        database: 'kso'
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
