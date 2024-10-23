const express = require('express');
const Employee = require('../models/employee.model');
//const db = require('./../db');
//const ObjectId = require('mongodb').ObjectId;

exports.getAll = async (req, res) => {
 // res.json(db.employees);
//  req.db.collection('employees')
//  .find()
//  .toArray()
//  .then((data) => {
//    res.json(data);
//  })
  try {
    res.json(await Employee.find().populate('department'));
  }
 catch(err) {
   res.status(500).json({ message: err });
 };
};

exports.getRandom = async (req, res) => {
  //res.json(db.employees[Math.floor(Math.random() * db.length)]);
  // req.db.collection('employees')
  // .aggregate([{ $sample: { size: 1 }}])
  // .toArray()
  // .then((data) => {
  //   res.json(data[0]);
  // })
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().populate('department').skip(rand)
    if (!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  }
  catch(err) {
    res.status(500).json({ message: err });
  };

};

exports.getById = async (req, res) => {
  //res.json(db.employees.find(item => item.id == req.params.id));
  // req.db.collection('employees')
  // .findOne({ _id: ObjectId(req.params.id)})
  // .then((data) => {
  //   if(!data) res.status(404).json({ message: 'Not found' }); 
  //   else res.json(data);
  // })
  try {
    const dep = await Department.findById(req.params.id).populate('department');
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  // const { firstName, lastName } = req.body;
  // db.employees.push({ id: 3, firstName, lastName })
  // res.json({ message: 'OK' });
  // const { name } = req.body;
  // req.db.collection('employees')
  //   .insertOne({ name: name })
  //   .then(() => {
  //     res.json({ message: 'OK' });
  //   })
  try {
    const { firstName, lastName } = req.body; 
    const newEmployee = new Employee({ firstName, lastName });
    await newEmployee.save();
    res.json({ message: 'OK' });
  } 
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.put = async (req, res) => {
  // const { firstName, lastName } = req.body;
  // db = db.employees.map(item => (item.id == req.params.id) ? { ...item, firstName, lastName } : item );
  // res.json({ message: 'OK' });
  // const { name } = req.body;
  // req.db.colletion('employees')
  //   .updateOne({ _id: ObjectId(req.params.id) }, { $set: {name: name}})
  //   .then(() => {
  //     res.json({ message: 'OK' });
  //   })
  const { firstName, lastName } = req.body;
  try {
   await Employee.updateOne({ _id: req.params.id }, { $set: { ...req.body }});
   res.json({ message: 'OK' });
  }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.delete = async (req, res) => {
  // db = db.employees.filter(item => item.id != req.params.id)
  // res.json({ message: 'OK' });
  // req.db.collection('employees')
  // .deleteOne({ _id: ObjectId(req.params.id)})
  // .then(() => {
  //   res.json({ message: 'OK' })
  // })

    try {
    const emp = await Employee.findById(req.params.id);
    if(emp) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...'});
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
