require('dotenv').config(); // Loads all env variables
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({message: "Hello"});
    console.log("Get request processed");
});

const blogsRouter = require('./routes/blogs');

app.use('/blogs', blogsRouter);

app.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`));
