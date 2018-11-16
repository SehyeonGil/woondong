var express = require('express');
var router = express.Router();
var Shop = require("../models/shop");
var bodyParser = require('body-parser');

var multer=require('multer');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
var Seller_storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./public/img/shopImg/'+file.fieldname);
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+"!"+file.originalname);
    }
});
var uploadShop=multer({storage:Seller_storage});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
    const query=new RegExp(req.query.address);
    Shop.find({address:query},function (err,shop) {
        Shop.find({address:query},{text:false},function (err,shop2) {
            res.render('search', { shop: shop, shop2:shop2, add:req.query.address });
        });
    });
});

router.get('/register', function(req, res, next) {

    res.render('register');
});
router.post('/register',uploadShop.fields([{name:'imageShop'}]), function(req, res, next) {
    var text= req.body.text;
    var shopName=req.body.shopName;
    var address=req.body.address;
    var location={type:'Point',coordinates:[req.body.x,req.body.y]};
    var shoptype=req.body.type;
    var upFile = req.files;

    var imageStore = [];
    var imageStore_name = [];
    var imageStore_size = [];
    for(var i=0;i<upFile['imageShop'].length; i++){
        imageStore.push("./img/shopImg/imageShop/" + upFile['imageShop'][i].filename);
        imageStore_name.push(upFile['imageShop'][i].filename);
        imageStore_size.push(upFile['imageShop'][i].size);
    }
    var newShop=new Shop();
    newShop.text=text;
    newShop.shopName=shopName;
    newShop.address=address;
    newShop.location=location;
    newShop.shoptype=shoptype;
    for(i=0;i<imageStore.length;i++) {
        newShop.imageStore.push({image_url:imageStore[i],image_size:imageStore_size[i], image_name:imageStore_name[i]});
    }
    newShop.save(function (err) {
        if (err)
            throw err;
        res.redirect('/register');
    });

});
module.exports = router;
