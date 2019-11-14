const { connect, responsesCallback } = require('../db');

const getGrades = (callback) => {
    connect((connection) => {
        connection.query(`Select Id as value, Value as label 
            From grades 
            Order By Id`, (err, rows, fields) => responsesCallback(err, rows, fields, callback));
    });
};

module.exports = {
    getGrades
}