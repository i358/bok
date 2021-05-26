var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/send", (req, res, next)=>{
  var token = JSON.parse(req.headers["authorization"])
 if(!token) return res.statusCode(200).json({code:502, message:"Required a TOKEN"})
  var [ tokenType, tokenContent ] = token.split(" ")
  if(tokenType!=="Bearer") return console.error("Bearer değil");
  jwt.verify(tokenContent, "secret31", (err, decoded)=>{
    if(err) return console.error(err)
    next()
  })
}, (req, res, next)=>{
  var token = JSON.parse(req.headers["authorization"]);
  console.log(token)
   var [ tokenType, tokenContent ] = token.split(" ")
  jwt.verify(tokenContent, "secret31", (err, data)=>{
    if(err) return console.error(err)
    console.log(data)
    res.status(200).send(data)
  })
})

router.post("/getToken", (req, res)=>{
  var username = req.headers["data"]
  var token = jwt.sign(username, "secret31")
  res.status(200).json({Authorization:"Bearer "+token})
  
})

module.exports = router;
