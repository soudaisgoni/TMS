const express = require("express");
const mongoose = require("mongoose");
const TMSdb1 = require("./models/TMSdb.model");
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World I am soudaisgoni!');
  })

  app.get("/api/Users", async (req,res) => { 
    const Users = await TMSdb1.find();
    TMSdb1.find().then((Users) => {
      res.status(200).send(Users);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error Occurred while retrieving students.",
      });
    });
   });
  
app.post("/api/User", async(req,res) => {
    const User = new TMSdb1(req.body);
    await User.save();
    TMSdb1.create(req.body).then((User) => {
      res.status(201).send(User);
    }).catch((err) =>{
      res.status(500).send({
        message: err.message || "Some error occured while creating new student.",
      });
    });
  });
  

  app.listen(3000, ()=> {

    console.log("Server is run on port 3000")
});





mongoose.connect(
    "mongodb+srv://soudaisgoni:Soudaysi@cluster0.ngfn5.mongodb.net/TMS?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
    console.log("Connected to MongoDB");
  
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB",err);
  });