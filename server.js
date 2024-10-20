const express = require('express');
const cors = require('cors');
const app = express();
// const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
// mongoClient.connect('mongodb://0.0.0.0:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => { // przechowuje informacje dotyczące błędu, client wykorzystamy poniżej
//     if (err) {
//         console.log(err);
//     }
//     else {
        //const db = client.db('companyDB'); // znajdź na serwerze bazę o nazwie companyDB i przypisz jej referencje do stałej db
        const employeesRoutes = require('./routes/employees.routes');
        const departmentsRoutes = require('./routes/departments.routes');
        const productsRoutes = require('./routes/products.routes');

        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        // app.use((req, res, next) => {
        //     req.db = db;
        //     next(); 
        // });
        app.use('/api', employeesRoutes);
        app.use('/api', departmentsRoutes);
        app.use('/api', productsRoutes);

        app.use((req, res) => {
            res.status(404).send({ message: 'Not found...' });
        })

        mongoose.connect('mongodb://0.0.0.0:27017/companyDB', { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection;

        db.once('open', () => { // once wykryje zdarzenie raz i potem nie ma sensu już na nie nasłuchiwać. ** once - wykrywa zdarzenie tylko raz ** 
            console.log('Connected to the database');
        });
        db.on('error', err => console.log('Error ' + err));

        app.listen('8000', () => {
            console.log('Server is running on port: 8000');
        });
        console.log('Succesfully connected to the database');
    // }
// });
