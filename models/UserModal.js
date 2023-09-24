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

const RegisterModal = mongoose.model("RegisterModal", RegisterSchema)

module.exports = {
    RegisterModal
}