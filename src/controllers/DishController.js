const knex = require("../database/knex");
const DiskStorage = require("../provider/DiskStorage");
const AppError = require("../utils/AppError");
class DishController {
    
    async create(request, response) {
        const { name, description, price, category, ingredients } = request.body;
        const dishImage = request.file;
        const user_id = request.user.id;

       let dish_id;

        const diskStorage = new DiskStorage();
        
        if(dishImage){
            const filename = await diskStorage.saveFile(dishImage.filename);

            [dish_id] = await knex("dishes").insert({
                name,
                description,
                price,
                category,
                image: filename,
                user_id
            });
        } else {
            [dish_id] = await knex("dishes").insert({
                name,
                description,
                price,
                category,
                user_id
            });
    
        }
      
        if(ingredients){
            const dishIngredients = JSON.parse(ingredients).map( ingredient => {
                return {
                    name: ingredient,
                    dish_id
                }
            })

            await knex("ingredients").insert(dishIngredients);
        }

        return response.json();
        
    }

    async update(request, response) {
        const { name, description, price, category, ingredients } = request.body;
        const dishImage = request.file;
        const { id } = request.params;

        const dish = await knex("dishes").where({ id }).first();

        if(!dish) {
            throw new AppError("Prato não encontrado");
        }

        dish.name = name ?? dish.name;
        dish.description = description ?? dish.description;
        dish.price = price ?? dish.price;
        dish.category = category ?? dish.category;

        const diskStorage = new DiskStorage();

        if(dish.image) {
            await diskStorage.deleteFile(dish.image);
        }
        
        if(dishImage){
            const filename = await diskStorage.saveFile(dishImage.filename);

            dish.image = filename;

            await knex("dishes").update(dish).where({ id });
        } else {
            await knex("dishes").update(dish).where({ id });
    
        }
      
        if(ingredients){
            const dishIngredients = JSON.parse(ingredients).map( ingredient => {
                return {
                    name: ingredient,
                    dish_id: dish.id
                }
            })

            await knex("ingredients").where({ dish_id: dish.id }).delete();

            await knex("ingredients").insert(dishIngredients);
        }

        return response.json();
    }

    async show(request, response) {
        const { id } = request.params;
        const user_id = request.user.id;

        const dish = await knex("dishes").where({ id }).where({ user_id }).first();

        if(!dish) {
            throw new AppError("Prato não encontrado");
        }

        const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");

        const dishWithIngredients = {
            ...dish,
            ingredients
        }

        return response.json(dishWithIngredients);
    }

    async index(request, response) {
        const user_id = request.user.id;
        const { search } = request.query;

        let userDishes;

        if(search) {
            userDishes = await knex("ingredients")
            .select("dishes.name", "dishes.description", "dishes.price", "dishes.category", "dishes.image")
            .where("dishes.user_id", user_id)
            .where(function () {
                // Agrupando condições para busca por nome do prato OU ingrediente e não interferir na consulta por user_id.
                this.whereLike("dishes.name", `%${search}%`)
                .orWhereLike("ingredients.name", `%${search}%`);
            })
            .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
            .orderBy("dishes.name");
        } else {
            userDishes = await knex("dishes").where({ user_id }).orderBy("name");
        }

        return response.json(userDishes);
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("dishes").where({ id }).delete();

        return response.json();
    }

};

module.exports = DishController;