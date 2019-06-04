const connect = require('../db');

const getUser = ({ username, password }, callback) => {
    connect((connection) => {
        connection.query(` Select * from users Where Username = '${username}' && Password = '${password}' `,
        (err, rows, fields) => {
            if (err) {
                throw err;
            }
            callback(rows[0]);
        });
    });
};

module.exports = {
    getUser
}