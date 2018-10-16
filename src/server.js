const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const pick = require('lodash/pick');
const parallel = require('async/parallel');
const mysql = require('mysql')
const db = require('./db');

// const PORT = normalizePort(process.env.OPENSHIFT_NODEJS_PORT || '3000');
const PORT = normalizePort(process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT ||'3000');
// const IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
const IP = process.env.IP || '0.0.0.0';

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser())

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'sql7.freesqldatabase.com',
    user: 'sql7256433',
    password: 'aZUlBF2199',
    database: 'sql7256433'
});

app.get('/', (req, res) => res.send({ 'SUCESS': 'TRUE!' }));

app.get('/login/:username/:password', (req, res, next) => {
    try {
        db.getUser(req.params, (result) => {
            if (result) {
                res.send({ login: true, ...result });
            } else {
                res.send({ login: false });
            }
        });

    } catch (error) {
        res.send({ login: false, error });
    }
});

app.get('/students', (req, res) => {
    const filters = pick(req.query, [
        'page',
        'pageSize', 
        'cluster',
        'musicality'
    ]);
    // tweak so it works with single or multiple clusters
    filters.cluster? filters.cluster = [...filters.cluster]: filters.cluster;

    try {
        parallel([
            (callback) => {
                db.getStudents(filters, (result) => {
                    callback(null, {
                        ...filters,
                        data: result
                    });
            })},
            (callback) => {
                db.countStudents(filters, (result) => {
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
});

app.get('/classes', (req, res) => {
    try {
        db.getClusters((result) => {
            
            res.send(result);
        });

    } catch (error) {
        res.status(500).send({ error: error });
    }
});












app.listen(PORT, IP, console.log(`Server listening at port ${PORT}`));

module.exports = app;

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
