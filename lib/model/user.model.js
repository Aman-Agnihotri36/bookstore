import { model, Schema } from "mongoose"


const UserSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,

    },

    photo: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }


})

const User = model('User', UserSchema)
export default User