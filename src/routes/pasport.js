const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done)=>{
    //MTCH EMAIL'S USER
    const user = await User.findOne({email});
    if(!user){
        return done(null, false, {error: 'Not user found'})
    }
    else{
        //MATCH password ussers
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        }
        else{
            console.log('Incorrect Pasword');
            return done(null, false, {error: 'Incorrect pasword'})
        }
    }
}));

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) => {
        done(err, user);
    });
});