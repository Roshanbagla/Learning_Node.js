// Creating my first RESTful API

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.set('view change', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/WikiDB", {
    useNewUrlParser: true
}) //connecting to local mongoDB instance

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

// get request to fetch all the articles. (GET)
app.get('/articles', function (req, res) {
    //query our database
    Article.find(function (error, foundArticles) {
        if (error) {
            res.send(error);
        } else {
            res.send(foundArticles);
        }
    })
});

//Sending a POST request using POSTMAN  (Create)

app.post('/articles', function (req, res) {
    console.log(req.body.title)
    console.log(req.body.content)

    //insert the post request data into MongoDB database
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function (err) {
        if (err) {
            console.log("Error occured");
        } else {
            res.send("Article has been inserted successfully");
        }
    });
});

// deleting data from our database

app.delete("/articles", function (req, res) {
    Article.deleteMany(function(err) {
        if (!err) {
            res.send("Successfully deleted all the articles");  
        } else {
            res.send(err);
        }
    });
});

app.listen(3000, function (res, req) {
    console.log("Server is running on port 3000");
});