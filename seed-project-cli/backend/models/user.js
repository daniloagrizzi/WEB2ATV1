const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImageUrl: { type: String },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Método para comparar senha
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

// Exporta o model
module.exports = mongoose.model('User', userSchema);
