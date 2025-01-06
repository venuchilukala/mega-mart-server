const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  photoURL : String,
  role: {
    type: String,
    enum: ['customer', 'admin', 'storeOwner'],
    default: 'customer',
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
