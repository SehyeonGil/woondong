var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Shop = new Schema({
    text:{type:String},
    shopName:{type:String},
    address: {type:String},
    location : {
        type : {
            type: String,
            default: 'Point'
        },
        coordinates: [{type:Number}]
    },
    imageStore:[{
        image_name:{type:String},
        image_url:{type:String},
        image_size:{type:String}
    }],
    shoptype:{type:Number}
});

module.exports = mongoose.model('shop', Shop);