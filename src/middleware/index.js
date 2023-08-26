// Import User and bcrypt
const User = require ("../users/model")
const bcrypt = require ("bcrypt")

// Import SALT_ROUNDS from .env file
const saltRounds = process.env.SALT_ROUNDS

// To hash a password - used in the registerUser route
const hashPass = async (req, res, next) => {

    try {

        // Hash the password
        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds))
        console.log("Hashed password = ", req.body.password)// For demonstration purposes, can be taken out to clean up code

        // To call the next function in the chain - in routes
        next()
        
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error:error})
    }
}


// To compare passwords
// Used in the login route
// Ensure the user being used has been created using hashPass, or this compare won't work
// i.e. if a console.log of the 2 passwords shows them looking the same, ensure the one on the database has been hashed
// i.e. create a new user, which will use hashPass, then use that to login
const comparePass = async (req, res, next) => {
    try {
      // Get user
      // username has been set up as unique, therefore there should only be one user with that usernme
      req.user = await User.findOne({ where: { username: req.body.username } })

      // If the username does not exist on the database, it will return null
      // Therefore, if the returned user is null, it means the username is invalid, therfore throw an error
      if (req.user === null) {
        throw new Error("Username or password does not match")
      }
  
      // Compare passwords - plain text then hashed
      // Plain text comes from what has been entere by the user in either front end or thunderclient
      // Hashed password comes from what has been returned from the database
      const match = await bcrypt.compare(req.body.password, req.user.password)
  
      // If no match - it means the password is incorrect
      // respond with 500 error message "passwords do not match"
      if (!match) {
        throw new Error("Username or password does not match")
      }
  
      // Because invalid user and invalid password have been checked for, above
      // The user and password must be valid
      console.log("********* Passwords match *********")


      //Check to see there is an email
      // Email is part of what is returned from the database for the valid user
      if (req.email === null) {
        throw new Error("Email incorrect format")
      }

      // Check email format is correct
      // Check the pattern is correct
      // Only go through the spcifics of regex with more advanced students
      formatEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      // If the format of the entered email does not match the regex pattern,
      // the email has an invalid format, therefore the email is invalid
      // (NOTE: there is more than one correct format, only one is used here for demonstration and to avoid confusion)
      if (!formatEmail.test(req.body.email)) {
        throw new Error("Email incorrect format");
      }

      // Now checks have been completed, can move on to the net one in the chaing in routes
      next();

    } catch (error) {
      res.status(501).json({ errorMessage: error.message, error: error });
    }
  };

// Must export the functions so they can be use elsewhere in the project
  module.exports = {
    hashPass,
    comparePass

  };