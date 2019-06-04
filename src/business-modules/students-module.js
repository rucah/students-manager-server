

const pick = require('lodash/pick');
const parallel = require('async/parallel');
const dbModule = require('../data-modules/students-module');

const getPaginatedStudents = (req, res) => {
    const filters = pick(req.query, [
        'page',
        'pageSize',
        'name',
        'nickName',
        'cluster',
        'musicality',
        'sortBy',
        'sortDir'
    ]);
    filters.page = parseInt(filters.page);
    filters.pageSize = 10;
    // tweak so it works with single or multiple clusters
    filters.cluster? filters.cluster = [...filters.cluster]: filters.cluster;
    try {
        parallel([
            (callback) => {
                dbModule.getStudents(filters, (result) => {
                    callback(null, {
                        ...filters,
                        data: result
                    });
            })},
            (callback) => {
                dbModule.countStudents(filters, (result) => {
                    callback(null, {length: result[0].length })
                })
            }
        ], function(err, results) {
            if(err) {
                res.status(500).send({ err });
            } else {
                res.send({
                    ...results[0],
                    ...results[1]
                });
            }
        });
    } catch(error) {
        res.status(500).send({ error });
    }
};

module.exports = {
    getPaginatedStudents
}