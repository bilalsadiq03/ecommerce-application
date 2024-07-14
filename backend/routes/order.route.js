const order_controller = require("../controllers/order.controller.js")
const authMw = require('../middlewares/auth.mw.js')

module.exports = (app) => {
    app.post("/v1/auth/order/new", [authMw.verifyToken], order_controller.createOrder);
    app.get("/v1/auth/order/all", order_controller.getAllOrders);
    app.get("/v1/auth/order/my", [authMw.verifyToken], order_controller.getUserOrders);
    app.get("/v1/auth/order/:id",  order_controller.getOrderById);
    app.put("/v1/auth/order/:id/pay", [authMw.verifyToken], order_controller.markOrderAsPaid);
    app.put("/v1/auth/order/:id/deliver", [authMw.verifyToken, authMw.isAdmin] , order_controller.markOrderAsDelivered);
    app.post("/v1/auth/order/total", order_controller.countTotalOrders);
    app.post("/v1/auth/order/total-sales", order_controller.calculateTotalSales);
    app.post("/v1/auth/order/totalSales-by-date", order_controller.calculateTotalSalesByDate);
}

