
// I need to intercept this
const authController = require("../controllers/auth.controller")
const authMW = require("../middlewares/auth.mw")


module.exports = (app) => {
    
    app.post("/v1/auth/signup",[authMW.verifySignUpBody], authController.signup )
    app.post("/v1/auth/signin", [authMW.verifySignInBody], authController.signin)
    app.post("/v1/auth/logout",  authController.logout)
    app.post("/v1/auth/profile",  authController.updateProfile)
    app.get("/v1/auth/users",  authController.getAllUsers)
    app.delete("/v1/auth/:id",  authController.deleteUserById)
    app.post("/v1/auth/:id",  authController.updateUserById)


}

