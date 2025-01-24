const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

// creating of cookie

// app.use(cookieParser());

// app.get("/", (req, res)=>{

//     res.cookie("name", "Yuvraj");
//     res.send ("Hello");
// })

//reading cookie

app.get("/read", (req, res)=>{
    console.log(req.cookies);
    res.send("Read page");
})

// bcrypt concept 

const saltRounds = 10;
const myPlaintextPassword = 'yuvraj';
const hashedPass = "$2b$10$2CKC3HYgEnpcp3m5RWQj7OyUEV7Mpc6kS2uAqHiean8Va9U44ok9y" // yuvraj

// Encrypting a password

app.get("/hash", (req, res)=> {

    bcrypt.genSalt(saltRounds, function(err, salt) {
        console.log(salt);
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            console.log("Hashed password", hash);
        });
    });
    res.send("heyyy")
})

// decrypting or checking password is correct or not

app.get("/check", (req, res)=> {

    bcrypt.compare(myPlaintextPassword, hashedPass, function(err, result) {
        console.log("Comparison result : ", result);
    });
    res.send("checking");
})


// jwt concept

const jwt = require("jsonwebtoken");

app.get("/", (req, res)=>{

    let myToken = jwt.sign({email : "yuvraj@gmail.com"}, "secret");
    res.cookie("token", myToken);

    res.send("jwt page");

})

app.use(cookieParser());

app.get("/jwt-checking", (req, res)=>{

    console.log(req.cookies.token);

    let data = jwt.verify(req.cookies.token, "secret");
    console.log(data);  

    res.send("cheking jwt page");

})



app.listen(3000);