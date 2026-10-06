const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main().then( () => {console.log("connection successfull");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index route
app.get("/chats",async (req,res) => {
    let chats= await chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
});

//New Route
app.get("/chats/new", (req,res) => {
    res.render("new.ejs");
});

//Create Route
app.post("/chats" ,(req,res) => {
    let {from ,to ,msg} = req.body;
    let newChat = new chat({
        from : from,
        to: to,
        msg : msg,
        created_at : new Date()
    });

    newChat.save().then( res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });

    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit",async (req,res) => {
    let {id} = req.params;
    let fchat = await chat.findById(id);
    res.render("edit.ejs",{fchat});
});

//Update Route
app.put("/chats/:id" ,async (req,res) => {
    let {id} = req.params;
    let {msg :newMsg} = req.body;
    console.log(newMsg);
    let updatedChat = await chat.findByIdAndUpdate(
        id ,
        {msg :newMsg,updated_at: new Date()} ,
        {runValidators : true , new : true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
});

//Destoy route
app.delete("/chats/:id",async  (req,res) => {
    let {id} = req.params;
    let deleteChat = await chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats");
});

app.get("/", (req, res) => {
    res.send("server working well");
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});