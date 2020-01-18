var express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');

var app = express();

var fileUpload = require('express-fileupload');
app.use(fileUpload());

const storage = multer.diskStorage({
  destination: function(req, file, cb){
     cb(null, '../public/uploads');
  },
  filename: function(req, file, cb){
     cb(null,file.fieldname + Date.now() + 
     path.extname(file.originalname));
  }
});   

const upload = multer({
  Storage: storage
});

const New = require('../models/claimDetailQuery');

router.post('/employees', function(req, res) {
       console.log("its working");
      
        const claimId = req.body.id
        const claimName = req.body.claimName
        const claimDate = req.body.claimDate
        const claimAmount = req.body.claimAmount
        
        New.employees(claimId,claimName,claimDate,claimAmount, (err,result)=>{
            if(err){
              console.log(err);
            }else{
              console.log("insert claim successfully");
              return  res.status(200).json({message:"insert claim successfully"});
            }
          });
  });


  router.post('/login', verifytoken, function(req, res){

         jwt.verify(req.token, 'secretKey', (err, authData) => {
           if(err)
           {
             res.sendStatus(403)
             console.log("user not recognized");
             
           } else{
             res.json({
               message: 'post created',
               authData
             })
           }
         })
         
  })


  router.post('/register', function(req, res){
    console.log("regitration successfully");
    
    const id = req.body.userId
    const name = req.body.userName
    const email = req.body.userEmail

    const register = {
      userId : req.body.userId,
      userName : req.body.userName,
      userEmail : req.body.userEmail
    }



    New.userCredentials(id, name, email, (err, result) =>{
      if(err){
        console.log(err);
      } else{
        console.log("insert user details successfully");
        return  res.status(200).json({message:"insert user details successfully"});
      }
    })

    jwt.sign({register}, 'secretkey', (err, token) => {
      res.json({
        token
      })
  });
})


function verifytoken(req, res, next) {
  const bearerHeader = req.headers['authorization']

  if(typeof bearerHeader !== 'undefined')
  {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    req.token = bearerToken
    next();
  } else{
    res.sendStatus(403)
  }
}
//////////////////////////////////////////////////////////  

//my code...  
router.post('/fileUpload', upload.single('myFile'), (req, res, next) => {
  const file = req.files.myImage
  const fileName = file.name
  if (!file) {
    return next(error)
  }
    console.log(file);
    New.fileUploads(fileName, (err, result) => {
      if(err){
        console.log(err);
      } else{
        console.log("Saved image to mysql database");
      }
    })
    file.mv('./public/uploads/'+file.name, function(err, result){
        if(err){
          console.log(err);
        } else{
          console.log("saved");
          
        }
    }) 
  
})


  router.get('/getFiles', function(req, res){
    
    New.getFiles((err, result) => {
      if(err){
        console.log(err);
      } else{
        console.log(result[0], " get files successfully");
        return res.status(200).json(result);
      }
    })

  })

////////////////////////////////////////////////////////

  router.get('/getClaims', function(req, res){
    console.log("get Claims successfully"); 
    
    New.myClaims((err,result) =>{
      if(err){
        console.log("sorry");
      }
      else{
        console.log(result[0]);
        return res.status(200).json(result);
      }
  });
})





module.exports = router;


