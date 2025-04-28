import express from "express"
import User from "../lib/model/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const router = express.Router()

router.post("/register", async (req, res) => {

    try {
        console.log('yiour data', req.body)
        const { username, email, password } = req?.body

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Someting is missing",
                success: false
            })

        }

        let photo = null

        if (req.file) {

            photo = req.file.path
        }




        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email.",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newuser = await User.create({
            username,
            email,

            password: hashedPassword,

        })

        res.json({ message: 'Success', newuser })


    } catch (error) {
        console.log(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "Someting is missing",
                success: false
            })
        }

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }



        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

        user = {
            _id: user._id,
            username: user.username,
            email: user.email,

        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 1000 }, { httpsOnly: true }, { sameSite: 'strict' }).json({
            message: `Welcome back ${user.username}`,
            user,
            success: true
        })

    } catch (error) {
        console.log(error)
    }

})

export default router