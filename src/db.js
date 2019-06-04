

const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 10,
    host     : '127.0.0.1',
    user     : 'StudentsManager',
    password : 'StudentsManager123$',
    database : 'studentsmanagerdb'
});

/**
 * Creates a db connection from pool and releases it after calling da done callback 
 * @param {*} done callback having as parameter the connection
 */
const connect = (done) => {
    pool.getConnection((err, connection) => {
        try{
            connection.connect();
            done(connection);
        } finally {
            if(connection) {
                connection.release();
            }
        }
    });
};

const responsesCallback = (err, rows, fields, callback) => {
    if (err) {
        throw err;
    }
    callback(rows);
};

module.exports = {
    connect,
    responsesCallback
};