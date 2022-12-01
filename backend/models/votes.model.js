const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const VotesSchema=new Schema({
    candidateId:{
        type:String,
        trim:true
    },
    electionId:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
});

const Votes=mongoose.model('votesinfo',VotesSchema);

module.exports=Votes;