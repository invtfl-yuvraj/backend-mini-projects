const express = require("express");
const app = express();
const userModel = require("./usermodel");
const usermodel = require("./usermodel");

app.get("/", (req, res) => {
    res.send("hey");
});

// NOTE : more methods available for creation, updation

app.get("/create", async (req, res) => {

    let createdUser = await userModel.create({
        name: "Yuvraj Singh",
        username: "yuvraj123",
        email: "yuvraj@gmail.com",
        contact: 1234567
    })
    res.send(createdUser);

});

app.get("/create/:username", async (req, res) => {

    let createdUser = await userModel.create({
        name: `${req.params.username.replace(/([A-Z])/g, " $1" ).trim()}`,
        username: `${req.params.username.toLowerCase()}`,
        email: `${req.params.username.toLowerCase()}@gmail.com`,
        contact: 123456789
    })
    res.send(createdUser);

});

app.get("/update", async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate(
        {
            username: "yuvraj123" // findOne
        },
        {
            email: "yuvrajnew@gmail.com" // what to update
        },
        {
            new: true
        }
    )

    res.send(updatedUser);
});

app.get("/read", async (req, res) => {
    let users = await userModel.find(); // find all and return array
    // let users = await userModel.find({username : "yuvraj123"}); // find all with specific cond., and return array
    // let users = await userModel.findOne({username : "yuvraj123"}); // find first with specific cond., and return an object
    res.send(users);
})

app.get("/delete", async (req, res) => {
    let deletedUser = await userModel.findOneAndDelete({
        username: "yuvraj123",
    })
    res.send(`Good bye ${deletedUser.name} and Best of luck!!`); // gives one time functionality to use this variable/data.
})

app.listen(3000);