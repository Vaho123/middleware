const User = require("./model")

//    req = request, res = response
const registerUser = async (req, res) => {

    // Just to test the function is being called, before adding the detail.  This line can be taken out to clean up the code.
    console.log("Next called and now inside controller registerUser")

    // try block to catch any errors
    try {
        // create a new user - long hand - for clarity and consistency with what the students already know
        // user is never used, because we are adding details to the DB, but not doing anything with those details
        const user = await User.create ({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password

     })

        // The DRYer way of doing the above
        // If used, take out the const user above
           // const user = await User.create(req.body)

        // Let the user know their registration has been successful, and confirm the registratin details (no password as this needs to be secure)  
        res.status(201).json({
            message: "Successfully registered",
            user: {username: req.body.username, email:req.body.email}
        })
        
    // Catch part of the try block to output any errors which have been encountered    
    } catch (error) {
        res.status(501).json({errorMessage:error.message, error:error})
        
    }
}

// To get all users which have been added to the DB i.e. users which have been registered
const getAllUsers = async (req, res) => {

    // Use a try/catch block to catch any errors
    try {

        // Find all users in the DB
        const users = await User.findAll();

        // remove passwords from users object to keep them secure
        for (let user of users) {
            user.password = "";
        }

        // Return a success message
        res.status(200).json({ message: "success", users: users });

    // Retun any errors which may have occurred    
    } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
    }
};

// Enable an already registered user to login
const login = async (req, res) => {

    // Use a try/catch block to catch any errors which may occur
    try {

        // Only need to pass a success message i.e. we are not 'doing' anything with the data
        res.status(200).json ({
            message: "success",
            user: {
                username: req.body.username,
                email: req.body.email
            }
        })
        
    // Catch any errors which may have occurred    
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error:error})
        
    }
}

// Example test in Thunderclient
// Uses dynamic variables therefore can change whatever we want 
// without needing to change the code
// {
//     "username": "user1", 
//     "updateKey": "email",
//     "updateValue": "user111@email.com"
//   }
const updateUser = async (req, res) => {
    try {
      console.log  ("Key = ",req.body.updateKey )
      console.log ("Value = ", req.body.updateValue)
      const updateResult = await User.update(
        { [req.body.updateKey]: req.body.updateValue },
        { where: { username: req.body.username } }
      );
  
      res.status(201).json({ message: "success", updateResult: updateResult });
    } catch (error) {
      res.status(501).json({ errorMessage: error.message, error: error });
    }
};

const deleteUser = async (req, res) => {
    try {
      const result = await User.destroy({
        where: {
          username: req.body.username,
        },
      });
      res.status(202).json({ message: "success", result });
    } catch (error) {
      res.status(501).json({ errorMessage: error.message, error: error });
    }
  }; 

// Export the above so they can be used in routes.js
module.exports = {
    registerUser,
    getAllUsers,
    updateUser,
    deleteUser,
    login
}