const dbModule = require('../data-modules/grades-module');

const getAllGrades = (req, res) => {
    try {
        dbModule.getGrades((result) => {
            
            res.send(result);
        });

    } catch (error) {
        res.status(500).send({ error: error });
    }
}

module.exports = {
    getAllGrades
}