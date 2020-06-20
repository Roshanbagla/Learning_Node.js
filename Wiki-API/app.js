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

// ********************* Request targetting ALL Articles**************************************

// chaining all my methods using route 
app.route("/articles")

    // get request to fetch all the articles. (GET)
    .get(function (req, res) {
        //query our database
        Article.find(function (error, foundArticles) {
            if (error) {
                res.send(error);
            } else {
                res.send(foundArticles);
            }
        })
    })

    //Sending a POST request using POSTMAN  (Create)
    .post(function (req, res) {

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
    })

    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("Successfully deleted all the articles");
            } else {
                res.send(err);
            }
        });
    });

// ********************* Request targetting a specific Article**************************************

//localhost:3000/articles/Jack-Bauer


app.route("/articles/:articleTitle")
    .get(function (req, res) {
        console.log("You are looking for:", req.params.articleTitle);
        Article.findOne({
            title: req.params.articleTitle
        }, function (err, foundArticles) {
            if (foundArticles) {
                res.send(foundArticles);
            } else {
                res.send("No  articles found");
            }
        })
    })

    // update the enitre field in DB.
    .put(function (req, res) {
        Article.update({
                title: req.params.articleTitle // look for the title 
            }, { // replace the title with the req data
                title: req.body.title,
                content: req.body.content
            }, {
                overwrite: true
            },
            function (err) {
                if (!err) {
                    res.send("Successfully updated articles");
                } else {
                    res.send(err);
                }
            }
        );
    })
    // update a specific field in DB
    .patch(function (req, res) {
        Article.update({
                title: req.params.articleTitle
            }, {
                $set: req.body
            },
            function (err) {
                if (!err) {
                    res.send("Sucessfully updated the data");
                } else {
                    res.send(err);
                }
            }
        );
    })

    .delete(function (req, res) {
        Article.deleteOne({
            title: req.params.articleTitle
        }, function (err) {
            if (!err) {
                res.send("Data has been deleted");
            } else {
                res.send(err);
            }
        })
    });

app.listen(3000, function (res, req) {
    console.log("Server is running on port 3000");
});