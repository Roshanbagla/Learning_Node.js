const express = require('express');                                     // importing express module
const https = require('https');
const bodyParser = require('body-parser')

const app = express();                                                  // initialising new express
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', function (req, res) {                                      //user tries to go to home page, added a call back function.

    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {

    //using API,  we are going to request to another server for weather data. 
    const query = req.body.city;
    const apiKey = " "
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units

    https.get(url, function (response) {                                   // getting a response back from the weather server.
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const countryName = weatherData.name;
            const weatherImageData = weatherData.weather[0].icon
            const image = "http://openweathermap.org/img/wn/" + weatherImageData + "@2x.png"

            res.write("<p> The weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The temperatue in " + query+ " is " + temperature + " degree Celicus. </h1>")
            res.write("<img src =" + image + ">");

            // sending response to the get request.
            res.send();

        })
    });
})

// opening a port.
app.listen(3000, function () {
    console.log("Server is running on 3000..")
})