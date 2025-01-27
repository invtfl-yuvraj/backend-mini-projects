const express = require("express");
const app = express();


const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const postModel = require("./models/post");
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
    }).populate("posts");

    console.log(user)

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

app.post("/profile/:id/createpost", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({
        _id : req.params.id
    })
    if (!user) return res.redirect("/login");

    let {content, title} = req.body;
    let post = await postModel.create({
        user : user._id,
        content,
        title
    })

    user.posts.push(post._id);
    await user.save();

    res.redirect(`/profile/${user._id}`);
})

app.get("/posts", isLoggedIn, async (req, res) => {
    let posts = await postModel.find().sort({date : -1}).populate("user");

    console.log(posts);

    let currUser = req.user.userid;

    res.render("posts" , {posts, currUser});
})

app.get("/like/:id", isLoggedIn, async (req, res) => {

    let post = await postModel.findOne({
        _id : req.params.id
    }).populate("user");

    let index = post.likes.indexOf(req.user.userid);

    if (index === -1){
        post.likes.push(req.user.userid);
    } else {
        post.likes.splice(index , 1);
    }
    
    await post.save();

    res.redirect(`/profile/${req.user.userid}`);
})

app.get("/posts/like/:id", isLoggedIn, async (req, res) => {

    let post = await postModel.findOne({
        _id : req.params.id
    }).populate("user");

    let index = post.likes.indexOf(req.user.userid);

    if (index === -1){
        post.likes.push(req.user.userid);
    } else {
        post.likes.splice(index , 1);
    }
    
    await post.save();

    res.redirect(`/posts`);
})

app.listen(3000);
