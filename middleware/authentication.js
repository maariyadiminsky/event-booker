const jwt = require("jsonwebtoken");

const skipAuth = (req, next) => {
    req.isUserAuthorized = false;
    return next();
}

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");

    // allow user to pass even if not validated(frontend should decide which routes)
    // but clearly show here the result(validated/or not)
    if (!authHeader) {
        return skipAuth(req, next);
    }
    
    // Authorization: Bearer TOKEN
    // splitting it = ["Bearer", "TOKEN"]
    const JWTToken = authHeader.split(" ")[1];

    // make sure token exists
    if (!JWTToken) {
        return skipAuth(req, next);
    }

    let decryptedToken;

    try {
        decryptedToken = jwt.verify(JWTToken, process.env.JWT_SECRET_KEY);
    } catch(err) {
        skipAuth(req, next);
        console.log(err);
    }

    // make sure decrypted token exists
    if (!decryptedToken) skipAuth(req, next);

    // user is validated!
    req.isUserAuthorized = true;
    req.userId = decryptedToken.userId;
    next();
}