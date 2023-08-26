// Import what is required
require("dotenv").config()
const express = require("express")

const userRouter = require ("./users/routes")
const User = require("./users/model")

// Set up port either from the .env file, or hard coded
const port = process.env.PORT || 5002

// Name express(), so it is easier to code
const app = express()

// Tell express to use json and userRouter
app.use(express.json())
app.use(userRouter)  // This line must be AFTER the above line

// To create/update the tables
const syncTables = () => {
    User.sync
}

// To test things are working
app.get("/health", (req, res) => {
    res.status(200).json({message: "API is working"})
}
)


//  Need to listen for changes
app.listen(port, () => {
    syncTables()
    console.log(`Server is running on port ${port}`)
})

