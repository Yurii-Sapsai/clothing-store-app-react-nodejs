import UserSchema from '../models/User.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try {

        const newUser = new UserSchema({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        })

        const savedUser = await newUser.save();
        res.status(200).json(savedUser)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to register',
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserSchema.findOne({ username: req.body.username })
        !user && res.status(401).json('Wrong login or password!')


        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        )
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        originalPassword !== req.body.password && res.status(401).json('Wrong login or password!')

        const accesToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_SEC, {
            expiresIn: '3d'
        }
        )

        const { password, ...other } = user._doc
        res.status(200).json({ ...other, accesToken })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to login',
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
            ).toString()
        }
        const updateUser = await UserSchema.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            })
        res.status(200).json(updateUser)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'No access',
        })
    }
}

export const deleteUser = async (req, res) => {
    try {

        await UserSchema.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted...')

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'No access',
        })
    }
}

export const getUser = async (req, res) => {
    try {

        const user = await UserSchema.findById(req.params.id)
        const { password, ...other } = user._doc
        res.status(200).json(other)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'No access',
        })
    }
}

export const getAllUsers = async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await UserSchema.find().sort({ _id: -1 }).limit(5)
        : await UserSchema.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

export const getUsersStats = async (req, res) => {

    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await UserSchema.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
};