

const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'sql7.freesqldatabase.com',
    user     : 'sql7256433',
    password : 'aZUlBF2199',
    database : 'sql7256433'
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
            connection.release();
        }
    });
}



const getUser = ({ username, password }, callback) => {
    connect((connection) => {
        connection.query(` Select * from users Where Username = '${username}' && Password = '${password}' `, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            callback(rows[0]);
        });
    });
};

const getStudents = ({}, callback) => {
    connect((connection) => {
        connection.query(
            `Select s.id, name, citizen_number AS citizenNumber, nationality, contacts, responsible, musicality, comments, c.value as class
            From students s
            Join classes c On c.id = s.class_id`, (err, rows, fields) => {
            
                if (err) {
                throw err;
            }
            
            callback(rows);
        });
    });
};

module.exports = {
    getUser,
    getStudents
}