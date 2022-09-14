var express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('./models/user');
const path = require('path');
const cors = require('cors');

//Routers
const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

var app = express();

const PORT = process.env.PORT || 3000;

//mongo connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology:true });
//default connection
const db = mongoose.connection;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//set up passport user/password authentication
passport.use(new LocalStrategy (function verify(username, password, done) {
    User.findOne({ username: username }, (err, user) => {
        if (err) return done (err);
        //user not in databse
        if(!user) return done(null, false, { message: 'Incorrect username' })
        //user in db
        //check for matching passwords
        bcrypt.compare(password, user.password, (err, res) => {
            if(err) return done (err);
            //passwords match
            if(res) return done(null, user, { message: 'Successful login' });
            //passwords don't match
            else return done(null, false, { message: 'Incorrect password' });
        });
    });
}));

//set up token verification/authentication
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY    
    },
    function (jwtPayload, done) {
        return done(null, jwtPayload)
    }
));

//more middleware
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next)  {
    res.locals.currentUser = req.user;
    next();
});

//routes
app.use('/api/user', userRouter);
app.use('/api/posts', postsRouter);
app.use('/api/posts/', commentsRouter);
app.use('/', (req, res, next) => {
    res.redirect('/api/posts')
});


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});
