import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true,
        unique: true
    },
    img: {
        type: String,
        require: true
    },
    categories: {
        type: Array
    },
    size: {
        type: Array
    },
    color: {
        type: Array
    },
    price: {
        type: Number,
        require: true
    }
}, {
    timestamps: true,
})

export default mongoose.model('Product', ProductSchema);