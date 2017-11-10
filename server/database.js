const mysql = require('mysql2/promise');


let pool;

async function createPool() {
    pool = await mysql.createPool({
        connectionLimit: 10,
        host: '188.166.20.243',
        user: 'webapp',
        password: 'fuckwindows',
        database: 'test'
    });
}

function getConnection() {
    return pool.getConnection();
}

function execute(...args) {
    return pool.execute(...args)
}

function getPool() {
    return pool;
}

module.exports ={
    createPool,
    getPool,
    execute,
    getConnection
};