const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    imageUrl: { type: String } ,
    country: { type: String, required: false },
    terms: { type: Boolean, required: true },
    nessages:[{type: Schema.Types.ObjectId, ref: 'Message'}],
});

module.exports = mongoose.model('User',schema);
