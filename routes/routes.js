const express = require('express')
const router = express.Router()
const firebase = require('../firebaseInit');
const ShoppingListItem = require('../models/ShoppingListItem');
const User = require('./../models/User')
const db = firebase.firestore()

router.post('/login', async (req, res) => {
    let user = null
    let userName = req.body.userName;
    let password = req.body.password;

    let querySnapshot = await db.collection('users').where('userName', '==', userName).get()

    querySnapshot.forEach(u => {
        user = u.data()
        user.password = u.data().password
    })

    if (user != null) {
        if (userName == user.userName && password == user.password) {
            var docRef = db.collection("users").doc(user.id);
            docRef.get().then((doc) => {
                user = new User(doc.data())
                setTimeout(() => {
                    res.status(200).send({
                        data: '/dashboard',
                        user,
                    });
                }, 2000)
            }).catch((error) => {
                res.status(200).send({ error: "loginError" })
            });
        } else {
            res.status(200).send({ error: "loginError" })
        }
    }
    else {
        res.send({ error: "loginError" })
    }
})

router.get('/shopping-list/:shoppingListId', async (req, res) => {
    let shoppingListItems = [];
    let shoppingListId = req.params.shoppingListId;
    let querySnapshot = await db.collection('shoppingLists').doc(shoppingListId).collection("shoppingListItems").get()

    querySnapshot.forEach((doc) => {
        let item = new ShoppingListItem(doc.data());
        shoppingListItems.push(item);
    })

    res.json(shoppingListItems);

})

router.delete('/delete-list-item/:shoppingListId/:shoppingListItemId', async (req, res) => {
    let shoppingListId = req.params.shoppingListId;
    let shoppingListItemId = req.params.shoppingListItemId;

    db.collection('shoppingLists').doc(shoppingListId).collection("shoppingListItems").doc(shoppingListItemId).delete().then(() => {
        res.send({ message: 'List item deleted.' });
    });
})

router.post('/add-list-item', async (req, res) => {
    let shoppingListId = req.body.shoppingListId;
    let querySnapshot = await db.collection('shoppingLists').doc(shoppingListId).collection("shoppingListItems").doc()

    let shoppingListItem = new ShoppingListItem({
        id: querySnapshot.id,
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        checked: false,
        shoppingListId: shoppingListId
    });

    let newShoppingListItem = shoppingListItem.toJSON();
    delete newShoppingListItem._id;

    querySnapshot.set(newShoppingListItem);
    res.json(shoppingListItem.id);
});

router.post('/check-list-item', async (req, res) => {
    let shoppingListId = req.body.shoppingListId;
    let shoppingListItemId = req.body.shoppingListItemId;
    db.collection('shoppingLists').doc(shoppingListId).collection("shoppingListItems").doc(shoppingListItemId).update({ checked: req.body.checked }).then(() => {
        res.send({ message: 'List item checked.' });
    })
});

router.post('/edit-list-item', async (req, res) => {
    let shoppingListId = req.body.shoppingListId;
    let shoppingListItemId = req.body.shoppingListItemId;
    db.collection('shoppingLists').doc(shoppingListId).collection("shoppingListItems").doc(shoppingListItemId).update({
        price: Number(req.body.updatedData.price),
        quantity: Number(req.body.updatedData.quantity)
    }).then(() => {
        res.send({ message: 'List item updated.' });
    })
});


module.exports = router;