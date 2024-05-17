const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());

const mongoURL ='mongodb://localhost:27017';

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
  
  const Book = require('./models/Book'); // Import the model

// CREATE
app.post('/books', async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// READ all
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send();
  }
});

// READ one by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
});

// UPDATE
app.patch('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE
app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
});

app.use(express.json());
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });