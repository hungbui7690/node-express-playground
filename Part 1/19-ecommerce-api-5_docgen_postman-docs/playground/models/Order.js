const mongoose = require('mongoose')

// 1. pic -> fields that we need to cart
const SingleCartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
})

// 2.
const OrderSchema = new mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },

    // 3. In Product Schema -> colors : [String] -> here will be more complex -> we can setup directly, but in this case, we setup step 1 to make it less complex
    // cartItems: [],
    cartItems: [SingleCartItemSchema],

    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'cancel'],
      default: 'pending',
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // 4. use for stripe
    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentID: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema)
