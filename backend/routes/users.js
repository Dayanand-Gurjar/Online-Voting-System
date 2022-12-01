const router=require('express').Router();
let Users=require('C:/Users/pc/Desktop/E-Voting System/EVS/backend/models/user.model.js');
const multer=require("multer");
const path=require("path");


const Storage=multer.diskStorage({
    destination:"../public/userPhotos",
    filename:(req,file,cb)=>{
      cb(null,file.originalname)
    },
  });
  
  const upload=multer({
    storage:Storage
  });
router.get('/',(req,res)=>{
    Users.find()
    .then(users=>res.json(users))
    .catch(err=>res.status(400).json('Error'+err));
});

router.route('/add').post(upload.single('myFile'),(req,res)=>{
    const image=req.file;
    const imageName=image.originalname;
    const name=req.body.name;
    const password=req.body.password;
    const mobile=req.body.mobile;
    const email=req.body.email;
    const newUser=new Users({name,password,email,mobile,imageName});
    console.log(newUser);
    newUser.save()
    .then(()=>res.status(200).json(name,password,mobile,email))
    .catch(err=>res.status(400).json('Error:'+err));
});

module.exports=router;