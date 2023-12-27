const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const location = require('./public/javascript/location');
const path = require('path');
const app = express();
const port = 3000;
const UserData = require('./public/javascript/userData'); // Import your MongoDB model

mongoose.connect('mongodb://127.0.0.1:27017/EVProject', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));

// GET routes
app.get('/', async (req, res) => {
    try {
        const data = await location.find({});
        res.render('index', { data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/map", async (req, res) => {
    try {
        res.render("map");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/index", async (req, res) => {
    try {
        res.render("index");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/contactUs", async (req, res) => {
    try {
        res.render("contactUs");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/blog", async (req, res) => {
    try {
        res.render("blog");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/login", async (req, res) => {
    try {
        res.render("login");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/register", async (req, res) => {
    try {
        res.render("register");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// POST routes
app.post('/addUserData', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new UserData({ username, password });
        await newUser.save();
        res.redirect('/register'); // Redirect after successful registration
    } catch (error) {
        res.status(500).redirect('/index'); // Redirect on error
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Here, you should create and save the user in your database
        // For example, using mongoose:

        // Create a new instance of UserData model
        const newUser = new UserData({ username, password });
        // Save the new user data to the database
        await newUser.save();

        // Return a success JSON response upon successful registration
        res.status(200).json({ success: true, message: 'Registration successful' });
    } catch (error) {
        // If an error occurs during registration, return a JSON response with an error message
        console.error(error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});

// app.get("/login/index",
// passport.authenticate('google',{failureRedirect:"login"}),
// function (req,res){
//   res.redirect('index');
// }
// )

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



// const express = require("express");
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const location = require('./public/javascript/location');
// const path = require('path');
// const app = express();
// const port = 3000;
// require("dotenv").config();
// const session = require('express-session');
// const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require("mongoose-findorcreate");

// app.use(express.static("public"));
// app.set("view engine", "ejs");
// app.set('views', path.join(__dirname, 'views'));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     secret: "Our Little Secret.",
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// mongoose.connect('mongodb://127.0.0.1:27017/EVProject');
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });

// const userSchema = new mongoose.Schema({
//     email: String,
//     password: String,
//     googleId: String,
// });

// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

// const User = mongoose.model("User", userSchema);
// passport.use(User.createStrategy());
// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(async function (id, done) {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });

// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET, // Corrected the property name
//     callbackURL: "http://localhost:3000/auth/google/blog",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
// }, (accessToken, refreshToken, profile, cb) => {
//     User.findOrCreate({ googleId: profile.id }, (err, user) => {
//         return cb(err, user);
//     });
// }));

// app.get("/", (req, res) => {
//     res.render("index");
// });

// app.get("/auth/google", passport.authenticate('google', { scope: ["profile"] }));

// app.get("/auth/google/blog",
//     passport.authenticate('google', { failureRedirect: "/login" }),
//     (req, res) => {
//         res.redirect('index');
//     }
// );

// app.get("/login", (req, res) => {
//     res.render("login");
// });

// app.get("/register", (req, res) => {
//     res.render("register");
// });


// app.get("/blog", (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render("blog");
//     } else {
//         res.redirect("index");
//     }
// });
// app.post("/",async(req,res)=>{
//     try{
//         res.render("/map");
//         res.render("/login");
//         res.render("/register");
//         res.render("/blog");
//     }
//     catch{
//         console.error(err);
//         res.status(500).send("Internal server Error");
//     }
// })
// app.get("/blog", (req, res) => {
//     res.render("blog");
// });

// app.post("/register", (req, res) => {
//     User.register({ username: req.body.username }, req.body.password, (err, user) => {
//         if (err) {
//             console.log(err);
//             res.redirect("index");
//         } else {
//             passport.authenticate("google")(req, res, () => {
//                 res.redirect("blog");
//             });
//         }
//     });
// });

// app.get("/map",(req,res)=>{
//         res.render("map");
// })
// app.get("/blog",(req,res)=>{
//         res.render("blog");
   
// })


// app.post("/login", (req, res) => {
//     const user = new User({
//         username: req.body.username,
//         password: req.body.password,
//     });

//     passport.authenticate("google", (err, user, info) => {
//         if (err || !user) {
//             console.log(err || "Invalid username or password");
//             return res.status(401).send("Authentication error");
//         }
//         req.login(user, (err) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(401).send("Authentication error");
//             }
//             return res.redirect("/blog");
//         });
//     })(req, res);
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
