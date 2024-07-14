// Logic to register a user

const bcrypt = require("bcryptjs")
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken")
const secret = require("../configs/auth.config")



// Function for creating user / signingUp
exports.signup = async (req, res)=>{
    //Logic to create the user
     

    //1. Read the request body
    const request_body = req.body

    //2. Insert the data in the Users collection in MongoDB
    const userObj = {
        name : request_body.name,
        userId : request_body.userId,
        email : request_body.email,
        password : bcrypt.hashSync(request_body.password,8)
    }

    try{

        const user_created = await user_model.create(userObj)
        
        //Return this user
         

        const res_obj = {
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType,
            createdAt : user_created.createdAt,
            updatedAt : user_created.updateAt
        }
        res.status(201).send(res_obj)

    }catch(err){
        console.log("Error while registering the user", err)
        res.status(500).send({
            message : "Some error happened while registering the user"
        })
    }

    //3. Return the response back to the user

}


exports.signin = async (req, res)=>{

    const user = await user_model.findOne({userId: req.body.userId})
    if (user == null){
        return res.status(400).send({
            message: "User is passed is not valid userId"
        })
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password) 

    if(!isPasswordValid){
        return res.status(400).send({
            message:"Invalid Password!"
        })
    }

    
    const token = jwt.sign({id : user.userId}, secret.secret, {
        expiresIn: 1200
    })
    
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        token: token
        
    })

}

exports.logout = async (req, res) => {
    res.cookie("jwt", "", {
        httyOnly: true,
        expires: new Date(0),
      });
    
      res.status(200).send({ message: "Logged out successfully" });
}

exports.updateProfile = async (req, res) => {
    const user = await user_model.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user_model.save();

    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,

    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
}

exports.getAllUsers = async(req, res) => {
    try {
        const users = await user_model.find()
        res.status(201).send(users)
    } catch (error) {
        console.log("Error Fetching Users ", error);
        return res.status(404).send({
            message: "Error fetching users"
        });
    }
}

exports.deleteUserById = async (req, res) => {
    const user = await user_model.findById(req.params.id);

  if (user) {
    if (user.userType == "ADMIN") {
      res.status(400).json({meggase: "Cannot delete ADMIN user"});
      
    }

    await user_model.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404).send({message: "User not found"});
    
  }
}

exports.updateUserById =async (req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email
    }
    try {
        const user = await user_model.findByIdAndUpdate(req.body.id, { ...userData}, {new: true});
        res.status(201).send(user);
    } catch (err) {
        console.log("Error while Updating the user:" ,err);
        return res.status(404).send({
            message: "Error updating  the user details."
        })
    }
}