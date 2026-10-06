const mongoose = require("mongoose");
const chat = require("./models/chat.js");

main().then( () => {console.log("connection successfull");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chats = [
    {
        from: "neha",
        to: "priya",
        msg: "send me notes",
        created_at: new Date()
    },
    {
        from: "priya",
        to: "neha",
        msg: "sure, I'll send them in a few minutes",
        created_at: new Date()
    },
    {
        from: "rahul",
        to: "arjun",
        msg: "are you coming to college today?",
        created_at: new Date()
    },
    {
        from: "arjun",
        to: "rahul",
        msg: "yes, I'll be there by 10",
        created_at: new Date()
    },
    {
        from: "ananya",
        to: "riya",
        msg: "did you complete the assignment?",
        created_at: new Date()
    },
    {
        from: "riya",
        to: "ananya",
        msg: "almost done, just one question is left",
        created_at: new Date()
    },
    {
        from: "vishal",
        to: "rohit",
        msg: "can you send me the project files?",
        created_at: new Date()
    },
    {
        from: "rohit",
        to: "vishal",
        msg: "yeah, I'll send them tonight",
        created_at: new Date()
    },
    {
        from: "megha",
        to: "kiran",
        msg: "what time is the meeting?",
        created_at: new Date()
    },
    {
        from: "kiran",
        to: "megha",
        msg: "it's at 3 PM",
        created_at: new Date()
    }
];

chat.insertMany(chats);
