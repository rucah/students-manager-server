const isEmpty = require('lodash/isEmpty');
const { connect, responsesCallback } = require('../db');

const getWhereClauseForGetStudents = (filters) => {
    const { name, nickName, musicality, cluster } = filters;
    let where = '';
    if (!isEmpty(name)) {
        where = where + ` And Lower(s.name) Like '%${name.toLowerCase()}%'`;
    }

    if (!isEmpty(nickName)) {
        where = where + ` And Lower(s.nickName) Like '%${nickName.toLowerCase()}%'`;
    }

    if (cluster) {
        const _classes = JSON.stringify(cluster).replace('[', '(').replace(']', ')');
        where = where + ' And s.class_id in ' + _classes;
    }

    if (musicality === 'true') {
        where = where + ` And s.musicality = ${musicality}`;
    }
    return where;
};

const getStudents = (filters, callback) => {
    const { page, pageSize, sortBy , sortDir } = filters;
    let query = 'Select s.id, name, citizen_number AS citizenNumber, nationality, phone, ' + 
        'musicality, comments, c.value as cluster, s.nickName, s.graduationId as graduation ' +
        'From students s ' +
        'Join classes c On c.id = s.class_id ' +
        'Where 1 = 1 ';

    query += getWhereClauseForGetStudents(filters);
    
    // it shall be ordered by name
    query = query + ` Order By ${sortBy} ${sortDir} `;

    if (page >= 0 && pageSize >= 0) {
        const limitFrom = (page - 0) * pageSize;
        query = query + ` Limit ${limitFrom}, ${pageSize}`;
    }

    connect((connection) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            callback(rows);
        });
    });
};

const countStudents = (filters, callback) => {
    let query = `Select count(s.id) as length
        From students s
        Join classes c On c.id = s.class_id
        Where 1 = 1`;

    query += getWhereClauseForGetStudents(filters);

    connect((connection) => {
        connection.query(query, (err, rows, fields) => responsesCallback(err, rows, fields, callback));
    });
};

module.exports = {
    getStudents,
    countStudents
}