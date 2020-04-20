var express = require('express');
var router = express.Router();
var axios =require('axios')
var NEWS_API_KEY =  process.env.NEWS_API_KEY;
var FOOD_API_KEY = process.env.FOOD_API_KEY;

console.log(NEWS_API_KEY);
console.log(FOOD_API_KEY)


router.get('/', function(req, res, next) {
    res.send('flavortown')
  });
 
  //Using a News API 
  router.get('/news',(req,res)=>{
      let queryString=querystring.stringify({
          q:"food",
          apiKey:NEWS_API_KEY,
      })
      console.log('/news,pinged')
      axios.get(`https://newsapi.org/v2/everything?${queryString}`).then(data=>res.json(data.data.articles[Math.floor(Math.random()*6)]))
  })
  
  
  
  //For Trending Recipes 
  router.get('/trending',(req,res)=>{
      console.log("/trending PINGED");
      let queryString=querystring.stringify({
          apiKey:FOOD_API_KEY,
          query:'fried chicken',
          number:10
      })
      console.log("created queryString",queryString);
     
     axios.get(`https://api.spoonacular.com/recipes/search?${queryString}`)
     .then(data=>res.json(data.data.results))
  })
  
  
  //For Random Recipes
  router.get('/random',(req,res)=>{
      console.log("/trending PINGED");
      let queryString=querystring.stringify({
          apiKey:FOOD_API_KEY,
          tags:'meat',
          number:1
      })
      console.log("created queryString",queryString);
     
     axios.get(`https://api.spoonacular.com/recipes/random?${queryString}`)
     .then(data=>{
         console.log(data);
         console.log("************")
         console.log(data.data)
         res.json(data.data.recipes[0])
      })
  })
  
  router.get('/carousel',(req,res)=>{
      let queryString=querystring.stringify({
          q:"guy fieri",
          apiKey:NEWS_API_KEY,
      })
      console.log('/news,pinged')
      axios.get(`https://newsapi.org/v2/everything?${queryString}`).then(data=>res.json(data.data.articles))
  })
  
  
  
  
  //For Random Clicking 
  router.post('/searchbar',(req,res)=>{
      console.log(req.body,"/searchbar")
      let queryString=querystring.stringify({
          apiKey:FOOD_API_KEY,
          query:req.body.input,
      })
      
      axios.get(`https://api.spoonacular.com/recipes/autocomplete?${queryString}`)
      .then(data=>res.json(data.data))
  })
  
  router.post('/trending/handleclick',(req,res)=>{
      console.log(req.body,"/trending/handleclick")
      axios.get(`https://api.spoonacular.com/recipes/${req.body.id}/information?apiKey=${FOOD_API_KEY}`)
      .then(data=>res.json(data.data))
  })
  
  router.post('/highest/handleclick',(req,res)=>{
      console.log(req.body,"/highest/handleclick")
      axios.get(`https://api.spoonacular.com/recipes/${req.body.id}/information?apiKey=${FOOD_API_KEY}`)
      .then(data=>res.json(data.data))
  })
  
  
  
  router.get('/highest',(req,res)=>{
      console.log("/trending PINGED");
      let queryString=querystring.stringify({
          apiKey:FOOD_API_KEY,
          query:'french fries',
          number:10
      })
      console.log("created queryString",queryString);
     
     axios.get(`https://api.spoonacular.com/recipes/search?${queryString}`).then(data=>res.json(data.data.results))
  
  })

  module.exports=router;