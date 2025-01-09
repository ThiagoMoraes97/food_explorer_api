const knex = require("../database/knex");
class DishController {
    
    async create(request, response) {
        const { name, description, price, category, ingredients } = request.body;
        const user_id = request.user.id;

        const [dish_id] = await knex("dishes").insert({
            name,
            description,
            price,
            category,
            user_id
        });

        if(ingredients){
            const dishIngredients = ingredients.map( ingredient => {
                return {
                    name: ingredient,
                    dish_id
                }
            })

            await knex("ingredients").insert(dishIngredients);
        }

        return response.json();
        
    }



};

module.exports = DishController;