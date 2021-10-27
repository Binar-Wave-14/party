const { Router } = require("express");
const controller = require("../controllers/user");

const routers = Router();

routers.get("/register", controller.viewRegister);
routers.get("/login", controller.viewLogin);

routers.post("/create-user", controller.createRegister);

module.exports = routers;
