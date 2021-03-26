const LoginRegController = require("../controllers/loginReg.controller");
const UserController = require("../controllers/user.controller");
const ItemController = require("../controllers/items.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    app.post("/api/register", LoginRegController.register);
    app.post("/api/login", LoginRegController.login);
    app.get("/api/items", ItemController.findAll);
    app.post("/api/create/item", ItemController.create)
    app.get('/api/items/random', ItemController.randomItem)
    app.get("/api/oneItem/:id", ItemController.findOne)
    app.put("/api/update/:id", ItemController.updateItem)
    app.delete('/api/delete/:id', ItemController.deleteAnExistingItem)
    app.get("/api/users", authenticate, UserController.index); 
    app.get("/api/logout", authenticate, LoginRegController.logout);
}