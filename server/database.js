const mysql = require('mysql2');


function getConnection() {
    return mysql.createConnection({
        host: '188.166.20.243',
        user: 'webapp',
        database: 'test'
    })
}
module.exports = getConnection;
//
// let pool;
//
// async function createPool() {
//     pool = await mysql.createPool({
//         connectionLimit: 10,
//         host: '188.166.20.243',
//         user: 'webapp',
//         database: 'test'
//     });
// }
//
// function getConnection() {
//     return pool.getConnection();
// }
//
// function getPool() {
//     return pool;
// }
//
// module.exports ={
//     createPool,
//     getPool,
//     getConnection
// };