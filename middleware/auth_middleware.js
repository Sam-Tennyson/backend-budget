const commonFunctions = require("../utils/commonFunctions");
const CONSTANT_DATA = require("../utils/constants");

const is_authenticated_user = (req, res, next) => {
    try {
        // Extract the token from the request headers or cookies
        let token = req.headers.authorization;
        if (!token) throw new Error(CONSTANT_DATA.MESSAGES.UNAUTHORIED_ACCESS)
        let token_jwt = token.split(" ")[1]
        let {userId} = commonFunctions.decryptJwt(token_jwt)
        req.userId = userId

        next()
    } catch (error) {
        res.status(401).json({message: CONSTANT_DATA.MESSAGES.UNAUTHORIED_ACCESS})
    }
}

module.exports = is_authenticated_user