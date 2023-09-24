const CONSTANT_DATA = {}

CONSTANT_DATA.STATUS = {
    _200: 200,
    _201: 201,
    _400: 400,
    _404: 404,
    _401: 401
}

CONSTANT_DATA.MESSAGES = {
    SOMETTHING_WENT_WRONG: "Something went wrong.",
    INSUFFICIENT_DATA: "Insufficient data.",
    MISSING_FIELD_REQUIRED: "Missing fields are required.",
    ITEM_NOT_FOUND_WITH_THIS_ID: "Cannot find any budget with this ID",
    USER_ALREADY_EXISTS: "This email is already registered",
    REGISTRATION_SUCCESS: "Registration Success",
    NO_USER_FOUND: "No user found",
    INVALID_CREDENTIALS: "Invalid credentials",
    UNAUTHORIED_ACCESS: "Unauthorized access",
    LOGIN_SUCCESS: "Logged-in Successfully",
    DATE_EXISTED: "Please provide new date",
}

CONSTANT_DATA.BUDGET = {
    ADDED: "Budget Added Successfully",
    UPDATED: "Budget Updated Successfully",
    DELETE: "Budget Deleted Successfully",
    FETCH: "Budgets Fetch Successfully",
    FETCH_BY_ID: "Budget data Fetch Successfully",
}

CONSTANT_DATA.SECURITY = {
    JWT_SIGN_KEY: "BUDGET_SECRET_DATA",
    BCRYPT_SALT: 8,
    EXPIRY_TIME: '1h',
}

module.exports = CONSTANT_DATA