const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');
require('./passport');

///////////////////////////////////////////SING IN

router.get('/users/singin', (req, res)=>{
    const error = req.query.error || null;
    res.render('../views/users/sing_in.ejs', { error });
});

router.post('/users/singin', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            return next(err);
        }
        else if(!user){
            return res.redirect(`/users/singin?error=${info.message}`);
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            else{
                return res.redirect('/account');
            }
        });
    })(req, res, next);
}); 

//////////////////////////////////////////SING UP

router.get('/users/singup', (req, res)=>{
    res.render('../views/users/sing_up.ejs');
});

function isValidEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

router.post('/users/singup', async (req,res)=>{

    const {name, dateBirth, email, money, password, confirm_password} = req.body;
    
    console.log(req.body);
    console.log('\n');

    const errors = [];
    if(name == null){
        errors.push({text: 'there are not a name'});
        console.log('there are not a name');
    }
    if(dateBirth == null){
        errors.push({text: 'there are not a date of birth'});
        console.log('there are not a date of birth');
    }
    if(!email || !isValidEmail(email)){
        errors.push({text: 'there are not a valid email'});
        console.log('there are not a valid email');
    }
    if(money == null){ 
        errors.push({text: 'there are not money'});
        console.log('there are not money');
    }
    if(password == null){
        errors.push({text: 'There is not a password'});
        console.log('there are not a password');
    }
    if(password != confirm_password){
        errors.push({text: 'Passwords doesnt match'});
        console.log('Passwords doesnt match');
    }
    
    if(errors.length > 0){
        res.render('../views/users/sing_up.ejs', {errors, name, email, money, password, confirm_password});
    }
    else{
        console.log('Looking for the email');
        const emailUser = await User.findOne({ email }).catch();
        console.log('Done');
        if(emailUser){
            console.log('Email alredy exists');
            
            res.redirect('/users/singup');
        }
        else{
            console.log('No errors');
            const newUser = new User({name, dateBirth, email, money, password});
            newUser.password = await newUser.encryptPassword(password).catch();
            await newUser.save();
            console.log('registered');
            res.redirect('/users/singin');
        }
    }
});

router.get('/users/logout', (req, res)=>{
    req.logOut();
    res.redirect('/');
});

module.exports = router;