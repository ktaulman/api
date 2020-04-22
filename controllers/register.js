    const handleRegister=(req,res,db,bcrypt)=>{
        //extract properties from the req.body
    let {name,email,password}=req.body;
  
    //register User
    const hash = bcrypt.hashSync(password);
    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        }).into('login').returning('email')
        .catch(err=>{
           return res.status(400).json('email already exist')
        })
   
        .then(loginEmail=>{
            console.log('loginEmail',loginEmail[0])
          return trx('users')
            
            .insert({
                email:loginEmail[0],
                name:name,
                joined:new Date()
            })
            .returning('*')
            .then(user=>res.json(user[0]))
        })
        .then(trx.commit)
        .then(trx.rollback)
        .catch(err=>{
            res.status(500).json('server unable to add')
        })
    })
    .catch(err=>res.status(400).json('unable to add'))
}

module.exports={
    handleRegister:handleRegister
}