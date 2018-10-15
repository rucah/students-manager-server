

const mysql = require('mysql');
const isEmpty = require('lodash/isEmpty');

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

const getStudents = (filters, callback) => {
    const { page, pageSize, musicality, cluster } = filters;
    let query = `Select s.id, name, citizen_number AS citizenNumber, nationality, contacts, responsible, musicality, comments, c.value as cluster
    From students s
    Join classes c On c.id = s.class_id
    Where 1 = 1`;

    if(cluster) {
        query = query + ` And s.class_id = ${cluster}`;
    }

    if(!isEmpty(musicality)) {
        query = query + ` And s.musicality = ${musicality}`;
    }

    // it shall be ordered by name
    query = query + ' Order By id';

    if(page && pageSize) {
        const limitFrom = (page - 0)  * pageSize;
        query = query + ` Limit ${limitFrom}, ${pageSize}`;
    }

    connect((connection) => {
        connection.query(
            query
            , (err, rows, fields) => {
            
                if (err) {
                throw err;
            }
            
            callback(rows);
        });
    });
};

const countStudents = (filters, callback) => {
    const { musicality, cluster } = filters;
    let query = `Select count(s.id) as length
    From students s
    Join classes c On c.id = s.class_id
    Where 1 = 1`;

    if(cluster) {
        query = query + ` And s.class_id = ${cluster}`;
    }

    if(!isEmpty(musicality)) {
        query = query + ` And s.musicality = ${musicality}`;
    }

    connect((connection) => {
        connection.query(
            query
            , (err, rows, fields) => {
            
                if (err) {
                throw err;
            }
            
            callback(rows);
        });
    });
};

module.exports = {
    getUser,
    getStudents,
    countStudents
}