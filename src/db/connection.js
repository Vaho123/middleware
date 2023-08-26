const { Sequelize } = require("sequelize")


// Use dialect:mysql  to overcome the dialect error which some students get
const connection = new Sequelize(process.env.MYSQL_URI, {
    dialect: 'mysql'
})    

connection.authenticate()

// To ensure the connection is working
// Helps with debugging too
console.log("DB is working")

module.exports = connection

