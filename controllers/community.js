const {
    user
} = require('../models/user');
const {
    market
} = require('../models/marketplace');


// GET USERS PAGE
const getUsers = (req, res, next) => {
    user.findById(req.session.user._id).then(el => {
        user.find().then(doc => {

            res.render('community/users', {
                path: '/users',
                users: doc,
                user: el
            });
        }).catch(err => {
            console.log('ne moze da se dobije stranica o korisnicima');
        });
    });

}


// GET MARKET PAGE
const getMarket = (req, res, next) => {

    market.find().then(doc => {
        user.findById(req.session.user._id).then(el => {

            res.render('community/market', {
                path: '/market',
                item: doc,
                error: req.flash('marketError'),
                success: req.flash('success'),
                user: el.skills.gold,
                users: el
            });
        });
    });


}


// POST MARKET
const postMarket = (req, res, next) => {
    var id = req.body.id;

    user.findById(req.session.user._id).then(doc => {
        market.findById(id).then(el => {

            if (doc.skills.gold >= el.price) {
                var search = doc.storge.items.find(p => p.item == id);
                if (search) {
                    search.quantity++;

                } else {
                    doc.skills.gold -= el.price;
                    doc.storge.items.push({
                        item: id,
                        quantity: 1
                    });
                }

                doc.save((err, data) => {
                    // req.session.reload(err => {
                    //     req.session.user = data;
                    //     req.session.save(err => {
                    req.flash('success', 'You have successfully purchased the product')
                    res.redirect('/market');
                    //     });
                    // });

                });
            } else {
                req.flash('marketError', 'You do not have enough money to buy a product');
                return res.redirect('/market');
            }

        });


    });

}


// GET STORAGE PAGE
const getStorge = (req, res, next) => {
    user.findById(req.session.user._id).populate('storge.items.item').then(doc => {

        res.render('community/storge', {
            path: '/storge',
            user: doc,
            users: doc.storge.items,
            success: req.flash('useItemSuccess'),
            error: req.flash('useItemErr')

        });

    });
}


// POST STORAGE PAGE
const postStorge = (req, res, next) => {
    var id = req.body.id;
    var index = req.body.index;

    user.findById(req.session.user._id).populate('storge.items.item').then(doc => {

        var search = doc.storge.items.find(p => p._id == id);
        console.log(search.item.tag);
        if (search.item.tag == 'energy') {
            if (search.quantity > 1) {
                if (doc.skills.energy == 100) {
                    req.flash('useItemErr', 'Your energy is full');
                    return res.redirect('/storge');
                } else {
                    search.quantity--;
                    doc.skills.energy = 100;
                }


            } else {
                if (doc.skills.energy == 100) {
                    req.flash('useItemErr', 'Your energy is full');
                    return res.redirect('/storge');
                } else {
                    doc.storge.items.splice(index, 1);
                    doc.skills.energy = 100;
                }


            }
        } else if (search.item.tag == 'strength') {
            if (search.quantity > 1) {
                search.quantity--;
                doc.specialItem.currentStr = doc.skills.strength.value;
                doc.skills.strength.value *= 2;
                doc.specialItem.duration = Date.now()+ (1000 * 20);
               
            } else {

                doc.storge.items.splice(index, 1);
                doc.specialItem.currentStr = doc.skills.strength.value;
                doc.skills.strength.value *= 2;
                doc.specialItem.duration = Date.now()+ (1000 * 20);
               

            }
        }

        doc.save((err, data) => {
            
            // req.session.reload(err=>{
            //     req.session.user = data;
            //     req.session.save(err=>{
            req.flash('useItemSuccess', 'You have successfully restored your energy');
            res.redirect('/battle');
            //     });
            // });
           
        });

    });

}


// POST FIGHT 
const postFight = (req, res, next) => {
    user.findById(req.session.user._id).then(doc => {
        if(doc.specialItem.duration <= Date.now()){
            doc.specialItem.duration = 0;
            doc.skills.strength.value = doc.specialItem.currentStr;
        }
        doc.battle.score += (doc.skills.level.lvl + 1) *(doc.skills.strength.value+1);
        doc.skills.energy -= 10;
        doc.save((err, data) => {

            res.json({
                battle: data,
                message: 'Udarac !'
            });
        });
    });
}

module.exports = {
    getUsers,
    getMarket,
    postMarket,
    getStorge,
    postStorge,
    postFight
}