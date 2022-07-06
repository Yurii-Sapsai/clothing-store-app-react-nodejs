import CartSchema from '../models/Cart.js';


export const createCart = async (req, res) => {
    const newCart = new CartSchema(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateCart = async (req, res) => {
    try {
        const updatedCart = await CartSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
}


export const deleteCart = async (req, res) => {
    try {
        await CartSchema.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getUserCart = async (req, res) => {
    try {
        const cart = await CartSchema.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
}


export const getAllCarts = async (req, res) => {
    try {
        const carts = await CartSchema.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
}