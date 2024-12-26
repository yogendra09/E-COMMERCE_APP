const router = require('express').Router();
const auth = require('../middlewares/auth.js');
const userController = require('../controllers/user.controller.js')

router.post("/",auth.isAuthenticated,userController.currentUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);







module.exports = router;