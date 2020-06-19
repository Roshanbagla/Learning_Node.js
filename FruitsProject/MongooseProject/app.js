const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {
    useNewUrlParser: true
})                                          // creating a connection to mongodb server and Fruits DB.

//create a new schema for our DB
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);         //creating a model

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Great Fruit"
})

// const personSchema = new mongoose.Schema({

//     name: String,
//     age: Number
// })

// const Person = mongoose.model("Person", personSchema);          // also converts the singular person to plural.
// const person = new Person({
//     name :"John",
//     age : 37
// })

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "The best fruit!"
});

const banana = new Fruit({
    name: "banana",
    rating: 6,
    review: "Average fruit!"
});

// Fruit.insertMany([kiwi, banana], function(err){
//     if (err){
//         console.log("Error occured");
//     }else{
//         console.log("Successfully saved all fruits to FruitsDB");
//     }
// })

Fruit.find(function (err, fruits) {
    if (err) {
        console.log("Error occured");
    } else {
        fruits.forEach(element => {
            console.log(element["name"])
        });
        
    }
})