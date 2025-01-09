const AppError = require("../utils/AppError");

function verifyUserAuthorization(role) {
    return (request, response, next) => {

        const userRole = request.user.role;

        if(!role.includes(userRole)) {
            throw new AppError("Usuário não autorizado", 401);
        }

        next();
    }
}

module.exports = verifyUserAuthorization;