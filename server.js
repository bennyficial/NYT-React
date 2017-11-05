const express = require('express'),
colors = require("colors"),
bodyParser = require("body-parser"),
logger = require("morgan"),
mongoUrl = require("./client/keys"),
Article = require("./client/models/Article"),
SearchHistory = require("./client/models/History"),
mongoose = require("mongoose"),
dbURL = "mongodb://localhost/reactingtimes",
PORT = process.env.PORT || 3001;
app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(express.static("public"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect(mongoUrl);

// Query mongoDB for all saved articles
app.get("/api/saved", function (req, res) {

Article
    .find({})
    .exec(function (err, doc) {

        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });
});

// Save an article to the db
app.post("/api/saved", function (req, res) {
Article.create({title: req.body.title, url: req.body.url}),
function (err) {
    if (err) {
        console.log(err);
    } else {
        res.send("Saved Search");
    }
}
})

// Delete a saved article from db
app.delete("/api/saved/:id", (req, res) => {
Article
    .remove({"_id": req.params.id})
    .exec(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    })
})

// // get all searches
// app.get("/api/saved/history", function (req, res) {

// SearchHistory
//     .find({})
//     .exec((err, doc) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(doc);
//         }
//     });
// });

// // Save an search to the db
// app.post("/api/saved/history", function (req, res) {

// SearchHistory.create({title: req.body.title, startYear: req.body.startYear, endYear: req.body.endYear}),
// function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         res.send("Saved Search");
//     }
// }
// })

const db = mongoose.connection;

db.on("error", error => console.log("Database Error:", error));

db.once("open", () => console.log("Mongoose connection successful."));

app.use("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));

app.use((req, res) => res.status(404).send("Sorry can't find that!"));
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
