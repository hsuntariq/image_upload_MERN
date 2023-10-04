const User = require('../models/userModel')
const postUser = async(req, res) => {
    const { username, password, email, image } = req.body;

    if (!username || !password || !email || !image) {
        throw new Error('Please enter the fields');
    } 

    const findUser = await User.findOne({ email });
    if (!findUser) {  
        const newUser = await User.create({
            username,email,password,image
        })  
        res.send(newUser);

    } else {
        throw new Error('User already exists!')
    }

    




}

module.exports = {
    postUser
}