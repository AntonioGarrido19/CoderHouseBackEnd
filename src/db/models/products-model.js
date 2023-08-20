import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    }
    
})

export const productsModel = mongoose.model('Products', productsSchema)