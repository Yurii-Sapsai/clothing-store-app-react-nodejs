import ProductSchema from '../models/Product.js';


export const createProduct = async (req, res) => {
    try {
        const newProduct = new ProductSchema(req.body);
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}



export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await ProductSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}



export const deleteProduct = async (req, res) => {
    try {
        await ProductSchema.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
}



export const getProduct = async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}



export const getAllProducts = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        if (qNew) {
            products = await ProductSchema.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await ProductSchema.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await ProductSchema.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}