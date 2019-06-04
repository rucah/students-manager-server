const dbModule = require('../data-modules/clusters-module');

const getAllClusters = (req, res) => {
    try {
        dbModule.getClusters((result) => {
            
            res.send(result);
        });

    } catch (error) {
        res.status(500).send({ error: error });
    }
}

module.exports = {
    getAllClusters
}