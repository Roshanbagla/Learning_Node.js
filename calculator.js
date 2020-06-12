const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

// Calculator
app.get("/", function(req, res){
     res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){                // handle any post requests 
    var num1 = Number(req.body.number1)
    var num2 = Number(req.body.number2)
    var result = num1 +num2
    res.send("The resut of the calculation is " + result);  
})     

// BMI calculator
app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
})
app.post("/bmicalculator", function (req, res) {
    var num1 = Number(req.body.number1)
    var num2 = Number(req.body.number2)
    var result = num1/(num2*num2);
    res.send("Your BMI is " + result);  
  })

app.listen(3000, function(){
    console.log("The server is listening on 3000");
});


