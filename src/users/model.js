// Import what is required to set up the model/schema
const { DataTypes } = require("sequelize")
const connection = require("../db/connection")

// Create the model/schema
// Use a capital letter e.g. User
const User = connection.define("User", {

    username: {
        type: DataTypes.STRING,
        allowNull: false

    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull:false
    }

},
   // This is the same as adding unique:true to username and email above
   {indexes:[{unique: true, fields:["username", "email"]}]}

)

// Export User so it can be used in controllers.js
module.exports = User
  