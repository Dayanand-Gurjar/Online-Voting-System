const router=require('express').Router();
let Elections=require('../models/election.model.js');
const path=require("path");

router.route('/').get((req,res)=>{
    Elections.find()
    .then(elections=>res.json(elections))
    .catch(err=>res.status(400).json('Error'+err));
});

router.route('/add').post((req,res)=>{
    const electionName=req.body.electionName;
    const electionId=req.body.electionId;
    const endDate=req.body.endDate;
    const newElection=new Elections({electionName,electionId,endDate});
    console.log(newElection);
    newElection.save()
    .then(()=>res.status(200).json(electionName,electionId,endDate))
    .catch(err=>res.status(400).json('Error:'+err));
});



module.exports=router;