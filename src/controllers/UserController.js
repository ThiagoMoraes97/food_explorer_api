class UserController {

    async create(req, res) {
        const { name, email, password } = req.body;
        return res.json();
    }

};

module.exports = UserController;