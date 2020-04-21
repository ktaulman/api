var express = require('express');
var router = express.Router();
var pg =require('pg')
pg.defaults.ssl=true;

var bcrypt=require('bcrypt-nodejs');
var register=require('../controllers/register');
var signIn=require('../controllers/signin')
var image=require('../controllers/image')
var users=require('../controllers/users')
var profileID=require('../controllers/profileID')

const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString:process.env.DATABASE_URL
   }
});


router.get('/postman',(req,res)=>{
  // res.json("this API is working")
 db('test').select('*').then(data=>res.json(data)).catch(err=>console.error(err))
})

router.get('/',(req,res)=>{
  res.send('brain app API')
})
router.get("/users",(req,res)=>{users.handleUsers(req,res,db)})

router.get('/profile/:id',(req,res)=>{profileID.handleProfile(req,res,db)})

//POSTS
router.post('/testPost',(req,res)=>{res.send('/testPost working')});

router.post('/signin',(req,res)=>{signIn.handleSignIn(req,res,db,bcrypt)})//dependency injection

router.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

router.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

//PUTS
router.put('/image',(req,res)=>{image.handleImage(req,res,db)})

module.exports=router;