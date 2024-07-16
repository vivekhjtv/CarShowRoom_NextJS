const mongoose = require('mongoose');
// Assuming the Product schema is already defined and exported
const Products = require('./Products');

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
