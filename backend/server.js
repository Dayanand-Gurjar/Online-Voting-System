const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const multer=require("multer");
require('dotenv').config();

const app=express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/votingmachine", {
   useNewUrlParser: true,
   useUnifiedTopology: true
},(err) =>
err ? console.log(err) : console.log(
  "Connected to database")
);



const usersRouter=require('./routes/users');
const electionRouter=require('./routes/electionsRoute');
const candidateRouter=require('./routes/candidateRoute');
const votesinfoRouter=require('./routes/votesinfo');


// app.post("/add",upload.single('myFile'),(req,res)=>{
//   const image=req.file.myFile;
//   const name=req.body.name;
//   const password=req.body.password;
//   const mobile=req.body.mobile;
//   const email=req.body.email;
//   const newUser=new Users({name,password,email,mobile});
//   newUser.save()
//   .then(()=>res.status(200).json(name,password,mobile,email))
//   .catch(err=>res.status(400).json('Error:'+err));
// });

app.use('/users',usersRouter);
app.use('/elections',electionRouter);
app.use('/candidates',candidateRouter);
app.use('/votesinfo',votesinfoRouter);

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})