/**
 * Module dependencies
 */
var express = require("express")
  , experiments = require("./experiments");

/**
 * Expose app
 */
var app = module.exports = express();

/**
 * Features
 */
// Split/AB test (defaults to [false, true])
experiments
  .feature("validate")
  .wip() // Mark the code as unstable or incomplete
  .create();

// Multi-variant
experiments
  .feature("loginButtonColor")
  .variants(["red", "blue", "green", "yellow"])
  .create();

// Named AB
experiments
  .feature("welcomeMessage")
  .variants(["message1", "message2"])
  .create();

/**
 * Configure our app
 */
app.configure(function(){
  app.set("views", __dirname+"/views");
  app.set("view engine", "jade");

  app.use(express.favicon());
  app.use(express.cookieParser());
  app.use(function fakeUser(req, res, next) {
    // Create a fake user object
    if(req.query.user) req.user = {id: req.query.user};
    next();
  });
  app.use(experiments);
  app.use(app.router);
});

app.get("/", function(req, res, next){
  if(res.feature("validate")) {
    // Our validate feature is turned on
  }
  else {
    // It's turned off
  }

  res.render("view");
});

app.get("/test", function(req, res) {
  res.render("test");
});
