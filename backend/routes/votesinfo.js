const router=require('express').Router();
const { request } = require('express');
const Votes=require('../models/votes.model.js');

router.route('/:uid/:eid').get((req,res)=>{
    const uid=req.params.uid;
    Votes.find({$and:[{electionId:req.params.eid},{userId:uid}]},(err,doc)=>{
        if(err) console.log(err);
        else res.send(doc);
    })
})

module.exports=router;
