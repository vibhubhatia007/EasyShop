const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config')

const api = process.env.API_URL;

//middle ware
app.use (express.json());
app.use(morgan('tiny'));


const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
})

const Product = mongoose.model('Product', productSchema);

console.log(api);

const PORT = process.env.PORT|| 5000;

app.get('/products', (req, res) => {

    const produc = {
        id : 1,
        name: 'hair_dresser',
        image: 'some_image',
    }

    res.send(produc);
})

app.post('/products', (req, res) => {

    const product = new Product({
       name: req.body.name,
       image: req.body.image,
       countInStock: req.body.countInStock
    })

    product.save().then((createdProduct=> {
        res.status(201).json();
    })).catch((err) => {
        res.status(500).json({
            error: err,
            succcess: false
        })
    })

    console.log(product);
})

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

app.listen(5000, ()=> {
    console.log(`server is running on port ${PORT}`);
})

