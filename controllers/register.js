    const handleRegister=(req,res,db,bcrypt)=>{
    let {name,email,password}=req.body;
   
    //create new user 
    //check if they forgot to fill out forms
    if(!email||!name||!password){
        console.log('email , name , or password empty')
       return res.status(400).json('missing fields')
    }

    //register User
    const hash = bcrypt.hashSync(password);
    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        }).into('login').returning('email')

        .then(loginEmail=>{
            console.log('loginEmail',loginEmail)
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
        .catch(err=>res.json('user already registered'))
    })
    .catch(err=>res.status(400).json('unable to add'))
}

module.exports={
    handleRegister:handleRegister
}