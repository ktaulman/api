const handleSignIn=(req,res,db,bcrypt)=>{
    console.log('**************')
    console.log('handleSignIn')
    const {email,password}=req.body;
    console.log(email,password)
    
    //edge cases, missing email or password
    if(!email||!password){
        res.status(400).json('missing fields')
    }
    // db('login').select('email','hash').where('email',email).then(res=>{res})
    db.select('email','hash').from('login')
    .where('email',email)
    .then(data=>{
        console.log('data=',data)
        const isValid=bcrypt.compareSync(password,data[0].hash);
         if(isValid){
             console.log('isValid',isValid)
             db
                .select('*')
                .from('users')
                .where({email:email})
             .then(user=>{
                 console.log('LINE 24 HIT',user)
                 res.status(200).json(user[0])
             })
             .catch(err=>{
                 return res.status(400).json(err)
             })
         }
     })
     .catch(err=>{
         console.log(err)
         res.status(400).json(err)
     })

    }

module.exports={
    handleSignIn:handleSignIn
}