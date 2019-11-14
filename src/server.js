const express = require('express');
const { urlencoded, json } =  require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// import mysql from 'mysql';
// import { getUser, getClusters } from './db';
const modules = require('./data-modules');
const business = require('./business-modules');

// const PORT = normalizePort(process.env.OPENSHIFT_NODEJS_PORT || '3000');
const PORT = normalizePort(process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT ||'3000');
// const IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
const IP = process.env.IP || '0.0.0.0';

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
var router = require('express').Router();
const app = express();

app.use(cors(corsOptions))
app.use(urlencoded({ extended: false }));
app.use(json())
app.use(cookieParser())

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'sql7.freesqldatabase.com',
//     user: 'sql7256433',
//     password: 'aZUlBF2199',
//     database: 'sql7256433'
// });

router.get('/', (req, res) => res.send({ 'SUCESS': 'TRUE!' }));

router.post('/login', (req, res, next) => {
    try {
        console.log('>>>MOVE IT', req);
        modules.auth.getUser(req.body.params, (result) => {
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

router.get('/students', (req, res) => business.students.getPaginatedStudents(req, res));
router.get('/classes', (req, res) => business.clusters.getAllClusters(req, res));
router.get('/grades', (req, res) => business.grades.getAllGrades(req, res));





app.use('/api', router);
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
