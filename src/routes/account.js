const router = require('express').Router();
const ensureAuthenticated = require('../middelware/authenticated');
const User = require('../models/User');

//////////////////////////  ACCOUNT STATUS

router.get('/account', ensureAuthenticated, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.redirect('/users/singin');
        }
        const { name, dateBirth, email, money } = user;
        res.render('../views/account/account.ejs', { name, dateBirth, email, money });
    }catch (error){
        console.log(error);
        res.redirect('/users/singin');
    }
});

//////////////////////////  ACCOUNT TRANSFER


const update = async (reason, amount, user, receiver) => {
    let name = receiver.name;
    let isSended = true;
    let date = new Date();

    user.money -= amount;  
    receiver.money += amount;  

    if(reason==null){
        reason = 'unspecified';
    }

    let newTransferForUser = {isSended, reason, name, date, amount};
    user.transfers.push(newTransferForUser);
    
    isSended = false;
    name = user.name;
    
    let newTransferForReciver = {isSended, reason, name, date, amount};
    receiver.transfers.push(newTransferForReciver);

    console.log("--------------------------------reason: " + reason);

    await user.save();
    await receiver.save();

}

router.post('/account/transfer', ensureAuthenticated, async (req, res)=>{

    const { reason, email } = req.body;
    let { amount } = req.body;
    amount = parseFloat(amount);
    const receiver = await User.findOne({ email }).catch();
    console.log(receiver);

    if(receiver){

        console.log('reciver exist');
        const user = await User.findById(req.user.id);

        if((amount <= user.money) && amount > 0){
            
            update(reason, amount, user, receiver);
            
            console.log("transfer possible ");
            res.redirect('/account');
        }
        else{
            console.log("transfer impossible ")
            res.redirect('/account/transfer');
        }
    }
    else{
        console.log('reciver doesnt exist');
        res.redirect('/account/transfer');
    }
});

router.get('/account/transfer', ensureAuthenticated, (req, res)=>{
    const error = req.query.error || null;
    res.render('../views/account/transfer.ejs', { error });
});

//////////////////////////  ACCOUNT HISTORY

router.get('/account/history', ensureAuthenticated, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.redirect('/users/singin');
        }
        else{
            const { transfers } = user;
            res.render('../views/account/history.ejs', { transfers });
        }
    }catch (error){
        console.log(error);
        res.redirect('/users/singin');
    }
});

module.exports = router;