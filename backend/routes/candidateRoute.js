const router=require('express').Router();
const Candidates=require('../models/candidate.model.js');
const Votes=require('../models/votes.model.js');
const path=require("path");

router.route('/').get((req,res)=>{
    Candidates.find()
    .then(candidates=>res.json(candidates))
    .catch(err=>res.status(400).json('Error'+err));
});

router.route('/add/:id').post((req,res)=>{
    const candidateName=req.body.candidateName;
    const candidateId=req.body.candidateId;
    const candidateMobile=req.body.candidateMobile;
    const candidateBranch=req.body.candidateBranch;
    const candidateImageName=req.body.candidateImageName;
    const electionId=req.params.id;
    const newCandidate=new Candidates({candidateName,candidateId,candidateMobile,candidateBranch,candidateImageName,electionId});
    console.log(newCandidate)
    newCandidate.save()
    .then(()=>res.status(200).json(candidateName,candidateId,candidateMobile,candidateBranch))
    .catch(err=>res.status(400).json('Error:'+err));
});

router.route('/updateVote/:id/:eid/:uid').post((req,res)=>{
    const id=req.params.id;
    const eid=req.params.eid;
    const uid=req.params.uid;
    console.log(id)
    var candidateVote=0;
    Candidates.findOne({candidateId:id},(err,doc)=>{
        console.log(doc+"found the candidate");
        candidateVote=doc.candidateVotes+1;
        console.log("candidate votes are",candidateVote)
        Candidates.updateOne({candidateId:id},{candidateVotes:candidateVote},(err,doc)=>{
            if(err)
            console.log(err);
        });
    });
    const candidateId=id;
    const electionId=eid;
    const userId=uid;
    const newVote=new Votes({candidateId,electionId,userId});
    console.log(newVote);
    newVote.save()
    .then(()=>res.status(200).json(candidateId,electionId,userId))
    .catch(err=>res.status(400).json('Error:'+err));
})

router.route('/:id').get((req,res)=>{
    const id=req.params.id;
    console.log(id)
    Candidates.find({electionId:id},(err,doc)=>{
        if(err) console.log(err);
        else res.send(doc);
    });
})

module.exports=router;