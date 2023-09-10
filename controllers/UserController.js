const { RegisterModal } = require("../models/UserModal");
const commonFunctions = require("../utils/commonFunctions");
const CONSTANT_DATA = require("../utils/constants");

const register = async (req, res) => {
    try {
        const { name, email, password, phone} = req.body;
            
        if (!email || !password || !name || !phone) throw new Error(CONSTANT_DATA.MESSAGES.MISSING_FIELD_REQUIRED);
        
        let newRegisterData = {
            name, email, phone
        }
        if (password) newRegisterData.password = commonFunctions.hashPassword(password)
        const isUserExistsQuery = RegisterModal.findOne({ email });

        // Execute the query using exec() method
        const isUserExists = await isUserExistsQuery.exec();
        if (isUserExists) throw new Error(CONSTANT_DATA.MESSAGES.USER_ALREADY_EXISTS);    
        let user_data = await RegisterModal.create(newRegisterData);
        res.status(200).json({
            msg: CONSTANT_DATA.MESSAGES.REGISTRATION_SUCCESS,
            user_data
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        if (!email || !password) throw new Error(CONSTANT_DATA.MESSAGES.MISSING_FIELD_REQUIRED);

        const userQuery = RegisterModal.findOne({ email});
        const user = await userQuery.exec()

        if (!user) throw new Error(CONSTANT_DATA.MESSAGES.NO_USER_FOUND)
        if (!user.password || !commonFunctions.compareHash(password, user.password || '')) throw new Error(CONSTANT_DATA.MESSAGES.INVALID_CREDENTIALS);
        const token = commonFunctions.encryptJwt({ userId: user._id, date: Date.now() });
        res.status(200).json({
            data: user,
            token
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    register, login
}