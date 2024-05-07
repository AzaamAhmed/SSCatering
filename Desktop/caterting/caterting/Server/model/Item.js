const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    item:String,
    done:{
        type :Boolean,
        default:false
    },
    name:String,
    price:String,
    description:String
})

const ItemModel = mongoose.model("catering",ItemSchema)
module.exports =ItemModel