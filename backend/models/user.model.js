const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    id:{
        type:String
    },
    imageName:{
        type:String
    }
},{
    timestamps:true,
});

const Users=mongoose.model('Users',userSchema);

module.exports=Users;