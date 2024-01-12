const express = require('express'); //install express for frameWork of node.js
const mongoose = require('mongoose'); // install mongoose for db
const Product = require('./Model/ProductModals'); // importing schema for the api
const app = express(); //declaring express in variable name app



app.use(express.json()); //it reads json 
app.use(express.urlencoded({ extended: false })); //it can read any type of format 

// routes
app.get('/', (req, res) => {
    res.send(`hello world this is node api`)
})  //declaring route
app.get('/home', (req, res) => {
    res.send(`home`)
})

app.get('/product', async (req, res) => {  //getting api end point
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})
app.get('/product/:id', async (req, res) => {  //declaring product by id
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

app.post('/product', async (req, res) => { //posting products
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})


// update

app.put('/product/:id', async (req, res) => { //updating product by id
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            res.status(404).json({ message: `can not find the product of this ID ${id}` });
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }

})
app.delete('/product/:id', async (req, res) => { // deleting product by id
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if (!product) {
            res.status(404).json({ message: `can not find the product of this ID ${id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }

})

mongoose.connect('mongodb+srv://admin123:admin1234567@devtoolsapi.rpw7i4q.mongodb.net/?retryWrites=true&w=majority') // uri of db in which name and password will be added password will be string and numbers only 
    .then(() => {
        console.log('db connected -=====>');
        app.listen(3000, () => {
            console.log(`server is running on port 3000`);  //listining port on which server is live
        })
    }).catch((err) => { console.log(err, "========err===>") })
