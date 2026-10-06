# 💬 Mini Chat — Node.js, Express & MongoDB

A beginner-friendly **Mini Chat application** built using **Node.js, Express.js, MongoDB, Mongoose, and EJS**.

This project demonstrates how a backend application can connect to MongoDB and perform complete **CRUD operations** on chat messages through a simple web interface.

The application allows users to:

- View all chats
- Create a new chat
- Edit an existing chat
- Delete a chat
- Store chat data in MongoDB
- Render dynamic pages using EJS

---

## 🚀 Features

- 💬 Display all stored chat messages
- ➕ Create new chats
- ✏️ Edit existing messages
- 🗑️ Delete chats
- 🗄️ MongoDB database integration
- 🧩 Mongoose schema and model
- 🌐 Express.js routing
- 📄 EJS server-side rendering
- 🔄 PUT and DELETE support using Method Override
- 🎨 Custom CSS styling for chat cards
- 📅 Store chat creation timestamps
- 🕐 Store updated timestamps when messages are edited

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime for the backend |
| **Express.js** | Web server and routing |
| **MongoDB** | Database for storing chats |
| **Mongoose** | MongoDB ODM and schema management |
| **EJS** | Dynamic server-side HTML rendering |
| **Method Override** | Enables PUT and DELETE requests through HTML forms |
| **HTML/CSS** | User interface and styling |

The project's `package.json` includes Express, Mongoose, EJS, and Method Override as dependencies.

---

# 📂 Project Structure

```text
NODE-EXPRESS-MONGODB-BACKEND/
│
├── models/
│   └── chat.js
│
├── public/
│   └── style.css
│
├── views/
│   ├── index.ejs
│   ├── new.ejs
│   └── edit.ejs
│
├── .gitignore
├── index.js
├── init.js
├── package.json
├── package-lock.json
└── README.md
```

### File Description

| File / Folder | Purpose |
|---|---|
| `index.js` | Main Express server, MongoDB connection, and CRUD routes |
| `init.js` | Inserts sample chat data into MongoDB |
| `models/chat.js` | Defines the Mongoose chat schema and model |
| `views/index.ejs` | Displays all chats |
| `views/new.ejs` | Form for creating a new chat |
| `views/edit.ejs` | Form for editing an existing chat |
| `public/style.css` | Styling for the chat interface |
| `package.json` | Project metadata and dependencies |
| `.gitignore` | Files excluded from Git |

---

# 🗄️ MongoDB Database

The application connects to a local MongoDB database named:

```text
whatsapp
```

The connection is established using:

```javascript
mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
```

The database stores chat documents through a Mongoose model.

---

# 📋 Chat Schema

The chat model is defined in:

```text
models/chat.js
```

The schema contains the following fields:

| Field | Type | Description |
|---|---|---|
| `from` | String | Person sending the message |
| `to` | String | Person receiving the message |
| `msg` | String | Chat message |
| `created_at` | Date | Time when the chat was created |
| `updated_at` | Date | Time when the chat was last updated |

The `from` and `to` fields are required, while the message has a maximum length of 50 characters. `created_at` is also required.

Conceptually, a document looks like:

```javascript
{
    from: "neha",
    to: "priya",
    msg: "send me notes",
    created_at: new Date(),
    updated_at: new Date()
}
```

---

# 🔄 CRUD Operations

The project demonstrates the four fundamental database operations:

```text
CREATE
   ↓
READ
   ↓
UPDATE
   ↓
DELETE
```

---

## 1. 📖 Read — View All Chats

### Route

```http
GET /chats
```

The application retrieves all chat documents using:

```javascript
chat.find()
```

The results are then passed to:

```text
views/index.ejs
```

The page loops through the chats and displays the sender, message, receiver, creation time, edit option, and delete option.

---

## 2. ➕ Create — New Chat

### Route

```http
GET /chats/new
```

This displays the new-chat form.

The form contains:

- Sender
- Message
- Receiver

The form submits the data using:

```http
POST /chats
```

The server receives the form data:

```javascript
let { from, to, msg } = req.body;
```

and creates a new Mongoose document.

The creation timestamp is stored using:

```javascript
created_at: new Date()
```

After saving the document, the application redirects to:

```text
/chats
```


---

## 3. ✏️ Update — Edit Chat

### Display Edit Page

```http
GET /chats/:id/edit
```

The chat ID is obtained from the URL:

```javascript
let { id } = req.params;
```

The corresponding document is retrieved using:

```javascript
chat.findById(id)
```

The document is then passed to:

```text
views/edit.ejs
```

The edit page displays the existing sender and receiver and provides a textarea containing the current message.

### Update Route

```http
PUT /chats/:id
```

The updated message is obtained from:

```javascript
let { msg: newMsg } = req.body;
```

The document is updated using:

```javascript
chat.findByIdAndUpdate()
```

The application also updates:

```javascript
updated_at: new Date()
```

This allows the project to keep track of when a message was last modified.

---

## 4. 🗑️ Delete — Destroy Chat

### Route

```http
DELETE /chats/:id
```

The chat ID is obtained from:

```javascript
let { id } = req.params;
```

The corresponding document is removed using:

```javascript
chat.findByIdAndDelete(id)
```

After deletion, the user is redirected to:

```text
/chats
```


---

# 🔄 Method Override

HTML forms traditionally support:

```text
GET
POST
```

However, this project also uses:

```text
PUT
DELETE
```

To enable these methods from HTML forms, the project uses:

```javascript
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
```

For example, the edit form sends:

```text
?_method=PUT
```

and the delete form sends:

```text
?_method=DELETE
```

This allows Express to handle the requests using:

```javascript
app.put()
```

and:

```javascript
app.delete()
```


---

# 🌱 Sample Data

The project contains an `init.js` file for inserting sample chat records into MongoDB.

The sample data contains conversations between users such as:

```text
Neha ↔ Priya
Rahul ↔ Arjun
Ananya ↔ Riya
Vishal ↔ Rohit
Megha ↔ Kiran
```

The data is inserted using:

```javascript
chat.insertMany(chats);
```

This makes it easier to populate the database while testing the application.

---

# 🎨 User Interface

The application uses EJS templates for rendering the interface.

The main page displays chats as individual cards containing:

- Sender
- Message
- Receiver
- Creation date/time
- Edit button
- Delete button

The styling is provided by:

```text
public/style.css
```

The current styling uses gray chat cards, rounded corners, spacing, and a darker message section.

---

# 🔌 Application Flow

The overall flow of the application is:

```text
                User
                  │
                  ▼
            Web Browser
                  │
                  │ HTTP Request
                  ▼
          ┌─────────────────┐
          │   Express.js    │
          │     Server      │
          └────────┬────────┘
                   │
                   ▼
             Mongoose ODM
                   │
                   │ MongoDB Query
                   ▼
          ┌─────────────────┐
          │     MongoDB     │
          │    whatsapp     │
          └────────┬────────┘
                   │
                   │ Query Result
                   ▼
              Mongoose
                   │
                   ▼
                EJS
                   │
                   ▼
             Web Browser
```

---

# 🌐 Application Routes

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/` | Check whether the server is working |
| `GET` | `/chats` | Display all chats |
| `GET` | `/chats/new` | Display new chat form |
| `POST` | `/chats` | Create a new chat |
| `GET` | `/chats/:id/edit` | Display edit form |
| `PUT` | `/chats/:id` | Update a chat |
| `DELETE` | `/chats/:id` | Delete a chat |

These routes are implemented in `index.js`.

---

# ⚙️ Installation

## Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB Community Server
- MongoDB Shell (`mongosh`)
- Git

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

Check MongoDB Shell:

```bash
mongosh --version
```

---

# 📥 Clone the Repository

```bash
git clone https://github.com/Syed-mohammad-wasique-Junaid/NODE-EXPRESS-MONGODB-BACKEND.git
```

Move into the project directory:

```bash
cd NODE-EXPRESS-MONGODB-BACKEND
```

---

# 📦 Install Dependencies

Run:

```bash
npm install
```

The project uses:

```text
express
mongoose
ejs
method-override
```

as its main dependencies.

---

# ▶️ Run MongoDB

Make sure your local MongoDB server is running.

The application expects MongoDB at:

```text
mongodb://127.0.0.1:27017
```

The application uses the database:

```text
whatsapp
```

---

# 🌱 Insert Sample Data

To populate the database with the sample chats from `init.js`, run:

```bash
node init.js
```

This executes:

```javascript
chat.insertMany(chats);
```

and inserts the sample chat records into MongoDB.

---

# 🚀 Start the Application

Run:

```bash
node index.js
```

Or, if you have configured a development runner such as Nodemon:

```bash
nodemon index.js
```

The server runs on:

```text
http://localhost:8080
```

Open:

```text
http://localhost:8080/chats
```

to view the chat application.

---

# 🧪 Example Workflow

### Step 1 — View Chats

Visit:

```text
/chats
```

The application retrieves all chat documents from MongoDB.

### Step 2 — Create Chat

Visit:

```text
/chats/new
```

Enter:

```text
From: Junaid
Message: Hello everyone!
To: Rahul
```

Click **Create Chat**.

The new chat is saved to MongoDB.

### Step 3 — Edit Chat

Click **Edit** on a chat.

Change the message and submit the form.

The application updates the MongoDB document and records the update time.

### Step 4 — Delete Chat

Click **Delete chat**.

The selected document is removed from MongoDB.

---

# 🧠 Concepts Learned

This project demonstrates several important backend development concepts.

### Node.js

- Running JavaScript on the server
- Working with npm packages
- Creating backend applications

### Express.js

- Creating a web server
- Routing
- Handling HTTP requests
- Handling form data
- Middleware

### MongoDB

- NoSQL database concepts
- Documents
- Collections
- Storing application data
- CRUD operations

### Mongoose

- Creating schemas
- Creating models
- Connecting to MongoDB
- Finding documents
- Creating documents
- Updating documents
- Deleting documents

### EJS

- Server-side rendering
- Dynamic HTML
- Passing data from Express to templates
- Looping through MongoDB results

### REST-style HTTP Methods

Understanding:

```text
GET
POST
PUT
DELETE
```

### Async Programming

The project uses:

```javascript
async / await
```

and Promises for MongoDB operations.

---

# 📚 What This Project Demonstrates

The main learning flow of the project is:

```text
HTML Form
     ↓
Express Route
     ↓
req.body / req.params
     ↓
Mongoose Model
     ↓
MongoDB
     ↓
Query Result
     ↓
EJS Template
     ↓
HTML Response
```

This gives a practical introduction to how a **Node.js backend communicates with a MongoDB database**.

---

# 🔮 Possible Future Improvements

The current project is primarily a learning CRUD application. It can be extended with:

- 🔐 User authentication
- 👤 Individual user accounts
- 💬 Private conversations
- 📱 Responsive chat UI
- 🔎 Search messages
- 🕐 Better date/time formatting
- 📷 Image/file sharing
- 😀 Emoji support
- 🔔 Notifications
- ⚡ Real-time messaging using Socket.IO
- 🔒 Password hashing
- 🛡️ Input validation
- 🌐 REST API endpoints
- ☁️ MongoDB Atlas deployment
- 🚀 Cloud deployment

---

# ⚠️ Current Project Scope

This repository is a **learning-focused Mini Chat application**.

It demonstrates backend fundamentals such as:

```text
Express
   +
MongoDB
   +
Mongoose
   +
EJS
   +
CRUD
```

It is not intended to be a production-ready messaging platform.

---

# 👨‍💻 Author

**Syed Mohammad Wasique Junaid**

GitHub:  
https://github.com/Syed-mohammad-wasique-Junaid

---

# ⭐ Acknowledgement

This project was created as part of learning and practicing:

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- Backend CRUD operations

---

## 📄 License

This project is created for educational and learning purposes.