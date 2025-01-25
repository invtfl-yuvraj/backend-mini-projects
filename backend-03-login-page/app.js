const express = require("express");
const app = express();

const path = require("path");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let loggedin = false;


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());


app.get("/", (req, res) => {
    res.render("index");

})

app.post("/create", (req, res) => {

    let { name, email, password, age } = req.body;

    // password encryption and user creation

    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(password, salt, async (err, hash) => {

            let createdUser = await userModel.create({
                username: name,
                email,
                password: hash,
                age
            })

            // login a user using jwt authentication

            let token = jwt.sign({ email }, "secret");
            res.cookie("token", token);
            loggedin = true;

            res.redirect(`/profile/${createdUser._id}`);

        })
    })


});

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {

    let user = await userModel.findOne({
        email: req.body.email
    })

    if (!user) return res.send("Something Went Wrong");

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: req.body.email }, "secret");
            res.cookie("token", token);
            loggedin = true;
            res.redirect(`/profile/${user._id}`);
        }
        else res.send("Something Went Wrong");
    })

})

app.get("/profile/:id", async (req, res) => {

    let user = await userModel.findOne({
        _id: req.params.id
    });

    console.log(user);
    res.render("profile", { user, loggedin });

})

app.listen(3000);