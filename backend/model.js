// const mongoose =require('mongoose');
// const Schema = mongoose.Schema;
// const UrlSchema = new Schema({
//     url:{type:String,required:true},
//     token:{type:String,required:true,unique:true},
// });
// module.exports =mongoose.model('Url',UrlSchema);    


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    url: { type: String, required: true },
    token: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Url', UrlSchema);
