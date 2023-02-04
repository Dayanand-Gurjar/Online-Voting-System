const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const multer=require("multer");
require('dotenv').config();

const app=express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const usersRouter=require('./routes/users');
const electionRouter=require('./routes/electionsRoute');
const candidateRouter=require('./routes/candidateRoute');
const votesinfoRouter=require('./routes/votesinfo');
DATABASE=process.env.DATABASE;
mongoose.connect(DATABASE, {
   useNewUrlParser: true,
   useUnifiedTopology: true
},(err) =>
err ? console.log(err) : console.log(
  "Connected to database")
);



app.use('/users',usersRouter);
app.use('/elections',electionRouter);
app.use('/candidates',candidateRouter);
app.use('/votesinfo',votesinfoRouter);

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
});