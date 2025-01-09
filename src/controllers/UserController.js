const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash } = require("bcryptjs");
class UserController {

    async create(request, response) {
        const { name, email, password } = request.body;

        const adminExists = await knex("users");

        const checkIfUserExists = await knex("users").where({ email }).first();

        if(checkIfUserExists) {
            throw new AppError("E-mail já cadastrado.", 401);
        }

        const hashedPassword = await hash(password, 8);

        if(adminExists.length === 0){
            await knex("users").insert({
                name,
                email,
                password: hashedPassword,
                role: "admin",
            });
        } else {
            await knex("users").insert({
                name,
                email,
                password: hashedPassword,
            });
        }
        return response.json();
    }

};

module.exports = UserController;