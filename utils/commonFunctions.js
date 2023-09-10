const BCRYPT = require('bcrypt');
const JWT = require('jsonwebtoken');
const CONSTANT_DATA = require('./constants');

const commonFunctions = {};

/**
 * incrypt password in case user login implementation
 * @param {*} payloadString
 */
commonFunctions.hashPassword = (payloadString) => BCRYPT.hashSync(payloadString, CONSTANT_DATA.SECURITY.BCRYPT_SALT);

/**
 * @param {string} plainText
 * @param {string} hash
 */
commonFunctions.compareHash = (payloadPassword, userPassword) => BCRYPT.compareSync(payloadPassword, userPassword);

/**
 * function to get array of key-values by using key name of the object.
 */
commonFunctions.getEnumArray = (obj) => Object.keys(obj).map((key) => obj[key]);

/**
 * used for converting string id to mongoose object id
 */
commonFunctions.convertIdToMongooseId = (stringId) => MONGOOSE.Types.ObjectId(stringId);

/** used for comare mongoose object id */
commonFunctions.matchMongoId = (id1, id2) => id1.toString() === id2.toString();

/**
 * create jsonwebtoken
 */
commonFunctions.encryptJwt = (payload, expTime = CONSTANT_DATA.SECURITY.EXPIRY_TIME) => JWT
  .sign(payload, CONSTANT_DATA.SECURITY.JWT_SIGN_KEY, { algorithm: 'HS256' }, { expiresIn: expTime });

/**
 * decrypt jsonwebtoken
 */
commonFunctions.decryptJwt = (token) => JWT.verify(token, CONSTANT_DATA.SECURITY.JWT_SIGN_KEY, { algorithm: 'HS256' });


module.exports = commonFunctions