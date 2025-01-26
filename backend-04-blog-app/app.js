const express = require("express");
const app = express();


const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const jwt = require("jsonwebtoken");


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


app.get("/", (req, res) => {
    res.render("index");

})

app.post("/register", async (req, res) => {

    const { name, username, email, password, age } = req.body;

    let user = await userModel.findOne({
        email
    })

    if (user) return res.status(500).send("User Already Registered");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                name,
                email,
                username,
                password: hash,
                age
            })

            let token = jwt.sign({ email, userid: user._id }, "secret");
            res.cookie("token", token);

            res.redirect(`/profile/${user._id}`);
        })
    })
})

app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    let user = await userModel.findOne({
        email
    })

    if (!user) return res.status(500).send("Something went wrong");

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email, userid: user._id }, "secret");
            res.cookie("token", token);
            res.status(200).redirect(`/profile/${user._id}`);
        }
        else res.redirect("/login");
    })
})

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/login");
})

app.get("/login", (req, res) => {
    res.render("login");
})

function isLoggedIn(req, res, next) {
    if (req.cookies.token === "") return res.send("You must be logged in");
    else {
        let data = jwt.verify(req.cookies.token, "secret");
        req.user = data;
        next();
    }
    
}

app.get("/profile/:id", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({
        _id : req.params.id
    }) 

    if (!user) return res.redirect("/login");

    res.render("profile" , {user});
})

app.get("/profile", isLoggedIn, (req, res) => {
    res.redirect("/login");
})

app.get("/profile/:id/createPost", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({
        _id : req.params.id
    }) 

    if (!user) return res.redirect("/login");

    res.render("createPost", {user});
})

app.get("/profile/:id/posts", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({
        _id : req.params.id
    }) 

    if (!user) return res.redirect("/login");

    res.render("posts" , {user});
})

app.listen(3000);