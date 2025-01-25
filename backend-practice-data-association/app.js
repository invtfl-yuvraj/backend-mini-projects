const express = require("express");
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/post");


app.get("/", (req, res)=>{
    res.send("Hello");
})

app.get("/create", async (req,res) => {
    let user = await userModel.create({
        username : "Yuvraj Singh",
        email : "yuvraj@gmail.com",
        age : 21,
    })

    res.send(user);
})

app.get("/post/create" , async (req, res) => {
    let post = await postModel.create({
        postData : "This is my first post",
        user : "6794bc7c95368959c7f73c3d"
    })

    let user = await userModel.findOne({
        _id : "6794bc7c95368959c7f73c3d"
    });

    user.posts.push(post._id);
    await user.save();

    res.send({
        user, post
    })
})

app.listen(3000);