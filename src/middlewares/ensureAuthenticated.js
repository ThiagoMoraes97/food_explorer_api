const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const { verify } = require("jsonwebtoken");

function ensureAuthenticated(request, response, next) {

    const requestHeader = request.headers.cookie;

    const [, token] = requestHeader.split("token=");

    if(!token) {
        throw new AppError("JWT Token não informado", 401);
    }

    const verifyToken = verify(token, authConfig.jwt.secret);

    if(!verifyToken) {
        throw new AppError("JWT Token inválido", 401);
    }

    const { role, sub } = verifyToken;

    request.user = {
        role,
        id: Number(sub)
    }
    
    next();
}

module.exports = ensureAuthenticated;