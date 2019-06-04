const { connect, responsesCallback } = require('../db');

const getClusters = (callback) => {
    connect((connection) => {
        connection.query(`Select Id as value, Value as label 
            From classes 
            Order By Id`, (err, rows, fields) => responsesCallback(err, rows, fields, callback));
    });
};

module.exports = {
    getClusters
}