const express = require('express');
const router = express.Router();
//const db = require('./../db');
const ObjectId = require('mongodb').ObjectId;

router.get('/departments', (req, res) => {
  //res.json(db.departments);
  req.db.collection('departments')
    .find()
    .toArray()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get('/departments/random', (req, res) => {
  //res.json(db.departments[Math.floor(Math.random() * db.length)]);
  req.db.collection('departments')
    .aggregate([{ $sample: { size: 1 }}])
    .toArray()
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get('/departments/:id', (req, res) => {
  //res.json(db.departments.find(item => item.id == req.params.id));
  req.db.collection('departments')
  .findOne({ _id: ObjectId(req.params.id)})
  .then((data) => {
    if(!data) res.status(404).json({ message: 'Not found' }); 
    else res.json(data);
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
});

router.post('/departments', (req, res) => {
  const { name } = req.body;
  req.db.collection('departments')
    .insertOne({ name: name })
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
  // db.departments.push({ id: 3, name })
  // res.json({ message: 'OK' });
});

router.put('/departments/:id', (req, res) => {
  const { name } = req.body;
  req.db.colletion('departments')
    .updateOne({ _id: ObjectId(req.params.id) }, { $set: {name: name}})
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
  // db = db.departments.map(item => (item.id == req.params.id) ? { ...item, name } : item );
  // res.json({ message: 'OK' });
});

router.delete('/departments/:id', (req, res) => {
  // db = db.departments.filter(item => item.id != req.params.id)
  // res.json({ message: 'OK' });
  req.db.collection('departments')
    .deleteOne({ _id: ObjectId(req.params.id)})
    .then(() => {
      res.json({ message: 'OK' })
    })
    .catch(( err ) => {
      res.status(500).json({ message: err });
    })
});

module.exports = router;
