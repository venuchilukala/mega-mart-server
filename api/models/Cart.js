const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartSchema = new Schema({
  email: {
    type: String,
    required: true, // Stores the user's email
    ref: 'User', // Reference to the User model by email
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Cart', cartSchema);

