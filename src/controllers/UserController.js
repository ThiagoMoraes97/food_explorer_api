const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash } = require("bcryptjs");
class UserController {

    async create(request, response) {
        const { name, email, password } = request.body;

        if(!name || !email || !password) {
            throw new AppError("Preencha todos os campos.", 401);
        }

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
        return response.status(201).json();
    }

};

module.exports = UserController;