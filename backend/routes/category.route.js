
// Post call to "0.0.0.0:8080/ecomm/api/v1/auth/categories" to create Category
category_controller = require("../controllers/category.controller")
auth_mw = require("../middlewares/auth.mw.js")

module.exports = (app)=> {
    app.post("/v1/auth/category/new", category_controller.createNewCategory),

    app.put("/v1/auth/category/:categoryId", [auth_mw.verifyToken, auth_mw.isAdmin], category_controller.updateCategory),

    app.delete("/v1/auth/category/:categoryId", [auth_mw.verifyToken, auth_mw.isAdmin], category_controller.removeCategory)

    app.get("/v1/auth/category/all", category_controller.listCategory),

    app.get("/v1/auth/category/:id", category_controller.readCategory)
}