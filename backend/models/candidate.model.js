const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const CandidateSchema=new Schema({
    candidateName:{
        type:String,
        required:true,
        trim:true
    },
    candidateId:{
        type:String,
        trim:true,
        unique:true
    },
    candidateMobile:{
        type: Number,
        required:true
    },
    candidateBranch:{
        type:String,
        required:true
    },
    candidateVotes:{
        type:Number,
        default:0
    },
    candidateImageName:{
        type:String
    },
    electionId:{
        type:Number,
        required:true
    }
});

const Candidates=mongoose.model('candidates',CandidateSchema);

module.exports=Candidates;