const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv/config");
const bcrypt = require('bcrypt');
const nanoid = require("nanoid");
const jwt = require("jsonwebtoken");
const User = require("./models/User");


const app = express();

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, {
    autoIndex: true,
});

const formatUserToBeSent = (user) => {
    //require('crypto').randomBytes(64).toString('hex') ---> in the terminal after 'node'
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY)
    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname,
    }
}

const generateUsername = async (email) => {
    let username = email.split('@')?.[0];

    const isUsernameExists = await User.exists({"personal_info.username": username}).then(result => result);

    isUsernameExists ? username += nanoid().substring(0,6) : "";

    return username;
}

app.post("/signup", (req, res) => {
    const { fullname, email, password } = req.body;

    if(fullname.length < 3) {
        return res.status(403).json({"error": "Fullname must be at least 3 letters long"})
    }
    if(!email.length) {
        return res.status(403).json({"error": "Enter email"})
    }
    if(!emailRegex.test(email)) {
        return res.status(403).json({"error": "Email is invalid"})
    }
    if(!passwordRegex.test(password)) {
        return res.status(403).json({"error": "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters"})
    }

    bcrypt.hash(password, 10, async (err, hashed_password) => {
        const username = await generateUsername(email);

        const user = new User({
            personal_info: {
                fullname,
                email,
                password: hashed_password,
                username
            }
        })

        user.save().then(u => res.status(200).json(formatUserToBeSent(u)))
        .catch(err => {
            if(err.code === 11000) {
                return res.status(500).json({"error": "Email already exists"})
            }
            return res.status(500).json({"error": err.message})
        })
    })

})

app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    User.findOne({"personal_info.email": email}).then((user) => {
        if(!user) {
            return res.status(403).json({ "error": "Email not found" })
        }

        bcrypt.compare(password, user.personal_info.password, (err, result) => {
            if(err) return res.status(403).json({ "error": "Error occured while logging in, please try again." });
            if(!result) {
                return res.status(403).json({ "error": "Incorrect password" })
            } else return res.status(200).json(formatUserToBeSent(user))
        })
    })
    .catch(err => {
        return res.status(500).json({ "error": err.message })
    })
})

app.listen(process.env.PORT || 8000, () => {
    console.log('listenning on port: ' + process.env.PORT);
})