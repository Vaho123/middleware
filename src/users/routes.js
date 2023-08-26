// Import what is required
const { Router } = require("express")
const { hashPass, comparePass } = require ("../middleware")

// Name the router from express
const userRouter = Router()

// Import all required controllers
const { registerUser, getAllUsers, login, updateUser, deleteUser } = require ("./controllers")

// hashPass is middleware so is added 'in the middle'
// The next() statement in hashPass will 'move it on' to registerUser
userRouter.post("/users/register", hashPass, registerUser)

userRouter.get("/users/getAllUsers",  getAllUsers)
userRouter.put("/users/updateUser", updateUser)
userRouter.delete("/users/deleteUser", deleteUser)

// comparePass is middleware so is added 'in the middle'
// The next() statement in comparePass will 'move it on' to login
userRouter.post("/users/login", comparePass, login)

// Export userRouter so it can be used in server.js
module.exports = userRouter