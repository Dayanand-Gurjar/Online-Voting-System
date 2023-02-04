const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const ElectionsSchema=new Schema({
    electionName:{
        type:String,
        required:true,
        trim:true
    },
    electionId:{
        type:Number,
        required:true,
        unique:true,
        trim:true
    },
    endDate:{
        type: String,
        required:true
    }
});

const Elections=mongoose.model('Elections',ElectionsSchema);

module.exports=Elections;