const fs = require("fs");

const express = require("express");
const hbs = require("hbs");
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + "/views/partials")
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", (err) => {
    if(err) {
      console.log("unable to append to sever log");
    }
  });
  next();
})

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// })

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get("/", (req, res) => {
  // res.send("<h1>Hello Express!! O_o</h1>");
  res.render("home.hbs", {
    pageTitle: "Welcome to The Home Page",
    welcomeMessage: "You are a stupid head",
  })
});

app.get("/about", (req, res) => {
  res.render('about.hbs', {
    pageTitle: "About Page"
  });
});

// /bad
app.get("/bad", (req, res) => {
  res.send({
    error: "PAGE NOT FOUND"
  })
})

app.listen(port, () => {
  console.log(`Server started on ${port}`)
});
