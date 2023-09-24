const BCRYPT = require('bcrypt');
const JWT = require('jsonwebtoken');
const CONSTANT_DATA = require('./constants');
const moment = require('moment/moment');
const { isDate } = require('moment/moment');

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

/**
 * Convert ISOstring without time zone eg: T00:00:00Z 
 */
commonFunctions.getDateWithoutTimeZone = (date) => moment(date).utcOffset(0, true).format(),


commonFunctions.budgetGenerateCurrentMonthArray = ({startDate, endDate}) => {
  const start_date = startDate; // Start date in ISOString
  const end_date =  endDate // End date in ISOString
  let dateArray = [];
  let currentDatePointer = new Date(start_date);
  while (currentDatePointer <= new Date(end_date)) {
    let update_date = commonFunctions.getDateWithoutTimeZone(new Date(currentDatePointer))?.split("T")?.[0] + "T00:00:00Z"
    dateArray.push({total_budget: null, date: update_date});    
    currentDatePointer.setDate(currentDatePointer.getDate() + 1);
  }
  return dateArray;
}


module.exports = commonFunctions