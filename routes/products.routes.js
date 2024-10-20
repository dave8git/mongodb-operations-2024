// post.routes.js

const express = require('express');
const router = express.Router();
//const db = require('./../db');
//const ObjectId = require('mongodb').ObjectId;
const Product = require('../models/product.model.js');

router.get('/products', async (req, res) => {
  //res.json(db.products);
  // req.db.collection('products')
  // .find()
  // .toArray()
  // .then((data) => {
  //   res.json(data);
  // })
  try {
    res.json(await Product.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  };
});

router.get('/products/random', async (req, res) => {
  //res.json(db.products[Math.floor(Math.random() * db.length)]);
  // req.db.collection('products')
  // .aggregate([{ $sample: { size: 1 }}])
  // .toArray()
  // .then((data) => {
  //   res.json(data[0]);
  // })
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const pro = await Product.findOne().skip(rand);
    if (!pro) res.status(404).json({ message: 'Not found' });
    else res.json(pro);
  } catch (err) {
    res.status(500).json({ message: err });
  };
});

router.get('/products/:id', (req, res) => {
  //res.json(db.products.find(item => item.id == req.params.id));
  req.db.collection('products')
    .findOne({ _id: ObjectId(req.params.id) })
    .then((data) => {
      if (!data) res.status(404).json({ message: 'Not found' });
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
});

router.post('/products', async (req, res) => {
  // const { name, client } = req.body;
  // db.products.push({ id: 3, name, client })
  // res.json({ message: 'OK' });
  // const { name } = req.body;
  // req.db.collection('products')
  //   .insertOne({ name: name })
  //   .then(() => {
  //     res.json({ message: 'OK' });
  //   })
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ name, client });
    await newProduct.save();
    res.json({ message: 'OK' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;
  // db = db.products.map(item => (item.id == req.params.id) ? { ...item, name, client } : item );
  // res.json({ message: 'OK' });
  // const { name } = req.body;
  // req.db.colletion('products')
  //   .updateOne({ _id: ObjectId(req.params.id) }, { $set: {name: name}})
  //   .then(() => {
  //     res.json({ message: 'OK' });
  //   })
  // try {
  //   const pro = await Product.findById(req.params.id);
  //   if (!pro) res.status(404).json({ message: 'Not found' });
  //   else res.json(pro);
  // }
  try { 
    await Product.updateOne({ _id: req.params.id }, { $set: { ...req.body }});
    res.json({ message: 'OK' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/products/:id', async (req, res) => {
  // db = db.products.filter(item => item.id != req.params.id)
  // res.json({ message: 'OK' });
  // req.db.collection('products')
  //   .deleteOne({ _id: ObjectId(req.params.id) })
  //   .then(() => {
  //     res.json({ message: 'OK' })
  //   })
  try {
    const pro = await Product.findById(req.params.id);
    if(pro) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...'})
  }
    catch(err) {
      res.status(500).json({ message: err });
    }
});

module.exports = router;