const { Router } = require('express');
const { app } = require('firebase-admin');
const router = Router();
var admin = require("firebase-admin");


admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://aplinprueba-default-rtdb.firebaseio.com/'
});

const db = admin.database()


router.get('/', (req, res) => {
    db.ref('ordenes').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index', { ordenes: data });
    });
});

router.post('/nuevaorden', (req,res)=>{
    console.log(req.body);
    const newOrden = {
        id: req.body.id,
        sku: req.body.sku,
        cantidad: req.body.cantidad
    };
    db.ref('ordenes').push(newOrden);
    res.redirect('/');
});

router.get('/delete-orden/:id', (req, res) => {
    db.ref('ordenes/' + req.params.id).remove();
    res.redirect('/');
});

module.exports = router;

