const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter product name']
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: false
        }

    },
    {
        timestamps: true, //it declare the time when product is created
    }
)

const Product = mongoose.model('product', productSchema); //declaring model for the db

module.exports = Product; //exporting the variable in which model is declared