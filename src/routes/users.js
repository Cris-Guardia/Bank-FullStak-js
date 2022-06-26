const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

/////////////////////////////////////////////////////////////////////////SING IN

router.get('/users/singin', (req, res)=>{
    res.render('../views/users/sing_in.ejs');
});

router.post('/users/singin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/singin',
    failureFlash: true
}));

/////////////////////////////////////////////////////////////////////SING UP

router.get('/users/singup', (req, res)=>{
    res.render('../views/users/sing_up.ejs');
});

router.post('/users/singup', async (req,res)=>{

    const {name, dateBirth, email, money, password, confirm_password} = req.body;
    
    console.log('\n');
    console.log(req.body);
    console.log('\n');
    console.log(name);
    console.log(dateBirth);
    console.log(email);
    console.log(money);
    console.log(password);
    console.log(confirm_password);
    console.log('\n');

    const errors = [];
    if(name.length <= 0 ){
        errors.push({text: 'there are not a name'});
    }
    if(dateBirth == null){
        errors.push({text: 'there are not a date of birth'});
    }
    if(email.length <= 0 ){
        errors.push({text: 'there are not an email'});
    }
    if(money == null){
        errors.push({text: 'there are not an initial money'});
    }
    if(password != confirm_password){
        errors.push({text: 'Passwords dont match'});
    }
    
    if(errors.length > 0){
        res.render('../views/users/sing_up.ejs', {errors, name, email, money, password, confirm_password});
    }
    else{
        console.log('The email will be finded\n');
        const emailUser = await User.findOne({ email }).catch();
        console.log('The find ends\n');
        if(emailUser){
            console.log('Email repetido\n');
            //req.flash('error_msg', 'the email is already registered');
            res.redirect('/users/singup');
        }
        else{
            console.log('Sin errores\n');
            const newUser = new User({name, dateBirth, email, money, password});
            newUser.password = await newUser.encryptPassword(password).catch();
            await newUser.save();
            console.log('registered\n');
            res.redirect('/users/singin');
        }
    }
});

router.get('/users/logout', (req, res)=>{
    req.logOut();
    res.redirect('/');
});

module.exports = router;