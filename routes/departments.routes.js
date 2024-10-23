const express = require('express');
const router = express.Router();
//const db = require('./../db');
const ObjectId = require('mongodb').ObjectId;
//const Department = require('../models/department.model');
const DepartmentsControllers = require('../controllers/departments.controller');
const { default_type } = require('mime');

router.get('/departments', DepartmentsControllers.getAll);

router.get('/departments/random', DepartmentsControllers.getRandom);

router.get('/departments/:id', DepartmentsControllers.getById);

router.post('/departments', DepartmentsControllers.post);

router.put('/departments/:id', DepartmentsControllers.put);

router.delete('/departments/:id', DepartmentsControllers.delete);

module.exports = router;