import mongoose from "mongoose";
import { ROLES } from "../../common/config/constant.js"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 50,
        default: undefined
    },
    avatar: {
        type: String,
        trim: true,
        default: undefined
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.USER
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    passwordToken: {
        token: { type: String, select: false },
        expiry: { type: Date, select: false }
    },
    refreshToken: {
        token: { type: String, select: false },
        expiry: { type: Date, select: false }
    },
    verificationToken: {
        token: { type: String, select: false },
        expiry: { type: Date, select: false }
    }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)