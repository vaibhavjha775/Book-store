const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./conn/conn');

const user = require('./routes/user');
const book = require('./routes/book');
const cart = require('./routes/cart');
const order = require('./routes/order'); 

app.use(cors());

app.use(express.json());

app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", cart);
app.use("/api/v1", order);





app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    });
