const mongoose = require("mongoose")

const RegisterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        createdAt: { type: Date, default: Date.now },
    },
    { 
        timestamps: true, 
    }
)

const LoginSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

const RegisterModal = mongoose.model("RegisterModal", RegisterSchema)
const LoginModal = mongoose.model("LoginModal", LoginSchema)

module.exports = {
    RegisterModal, LoginModal
}