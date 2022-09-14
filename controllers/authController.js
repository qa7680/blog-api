const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.user_register = (req, res, next) => {
    //create new user
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return next(err);
        const user = new User(
            {
                username: req.body.username,
                password: hashedPassword
            }
        ).save((err) => {
            if(err) return next(err);
            res.send('user saved');
        });
    });
};

exports.user_login = (req, res, next) => {
    passport.authenticate('local', { session: false }, 
    (err, user, info) => {
        if(err || !user) {
            return res.status(400).json({
                message: 'Authorization Denied',
                user: user
            })
        }
        if(err) res.send(err);
        jwt.sign({_id: user._id, username: user.username}, process.env.JWT_KEY, { expiresIn: 1800 }, (err, token) => {
            if(err) return res.status(400).json(err);
            //successful generate token
            res.json({ token: token, user: { _id: user._id, username: user.username } });
        });
    })(req, res);
};

exports.api_posts = (req, res, next) => {
    res.send('all posts');
};