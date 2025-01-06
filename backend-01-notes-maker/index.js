const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    fs.readdir("./files", (err, files) => {
        res.render("index", { files: files});
        
    })

})

app.get('/file/:fileName', (req, res) => {
    fs.readFile(`./files/${req.params.fileName}`, "utf-8", (err, fileData) => {

        if (err) {
            console.log(err);
        }

        res.render("show", { fileName: req.params.fileName, fileData: fileData });
    })

})

app.get('/edit/:fileName', (req, res) => {
    fs.readFile(`./files/${req.params.fileName}`, "utf-8", (err, fileData) => {

        if (err) {
            console.log(err);
        }

        res.render("edit", { fileName: req.params.fileName, fileData: fileData });
    })

})

app.get('/deleteFile/:fileName', (req, res) => {
    fs.unlink(`./files/${req.params.fileName}`, (err) => {
        if (err) {
            console.log(err);
        }

        res.redirect("/");
    })

})

app.post('/create', (req, res) => {

    fs.writeFile(`./files/${req.body.title.trim().split(" ").map((word) => {
        if (word.charAt(0) == " "){
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join("")}.txt`,
        req.body.content,
        (err) => {
            res.redirect("/");
        })
})

app.post('/modify', (req, res) => {

    fs.unlink(`./files/${req.body.previous}`, (err) => {
        if (err) {
            console.log(err);
        }
    })

    fs.writeFile(`./files/${req.body.title.trim().split(" ").map((word) => {
        if (word.charAt(0) == " "){
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join("")}.txt`,
        req.body.content,
        (err) => {
            res.redirect("/");
        })


    
})

app.listen(3000);