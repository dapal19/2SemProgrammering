const express = require('express');
const userRouter = express.Router();
const userController = require('../Controllers/userControllers')

// Routes 
userRouter.get('/', function(req, res) {
    res.send('Welcome to the API/Back-end')
})
//USER CRUD ROUTES
//userRouter.post('api/users', userController.createUser);
userRouter.get('api/users', userController.getAllUsers)
   
//userRouter.get('api/users:id', userController.createUser);
//userRouter.put('api/users', userController.updateUser);
//userRouter.delete('api/users:id', userController.deleteUser);

//Login routes ROUTES
module.exports = userRouter;

