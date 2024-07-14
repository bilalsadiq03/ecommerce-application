const authMw = require("../middlewares/auth.mw.js")

product_controller = require("../controllers/product.controller.js")
auth_mw = require("../middlewares/auth.mw.js")
formidable = require('express-formidable')

module.exports = (app) => {

    app.put("/v1/auth/product", formidable(),    product_controller.createNewProduct)

    app.post("/v1/auth/product/filtered",     product_controller.filterProducts)

    app.get("/v1/auth/product/new", product_controller.fetchNewProducts)

    app.get("/v1/auth/product/all", product_controller.fetchAllproducts)

    app.get("/v1/auth/products",  product_controller.fetchProducts);

    app.get("/v1/auth/product/top",  product_controller.fetchTopProducts);

    app.get("/v1/auth/product/:id" ,product_controller.fetchProductWithId);
 
    app.put("/v1/auth/product/:id", product_controller.updateProduct )

    app.post("/v1/auth/product/:id/review", [authMw.verifyToken], product_controller.addProductReview )

    app.delete("/v1/auth/product/:id/delete",  product_controller.deleteProduct)

    
}