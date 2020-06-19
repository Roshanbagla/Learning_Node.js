const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');   // start using ejs


app.get('/', function (req, res) {
    var weekdays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday'];

    var currentDay = new Date().getDay();
    var currentDayOfTheWeek = weekdays[currentDay];
    
    
    if (currentDay === 6 || currentDay === 0){
        day = currentDayOfTheWeek;
    }
    else{
        day = currentDayOfTheWeek;
    }
    res.render('list', {'kindofDay': day});
});

app.listen(3000, function (req, res) {
    console.log("Server is running on 3000");
})