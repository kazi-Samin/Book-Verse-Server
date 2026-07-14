const mongoose = require('mongoose');
const { OrderModel } = require('./dist/features/orders/order.model.js');
require('dotenv').config();

async function test() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  try {
    const orderData = {
      orderNumber: "TEST-12345",
      userId: "647f2b9b9c9c9c9c9c9c9c9c",
      userEmail: "test@example.com",
      items: [{
        bookId: new mongoose.Types.ObjectId("647f2b9b9c9c9c9c9c9c9c9c"),
        title: "Test Book",
        price: 10,
        quantity: 1,
        coverImage: "url"
      }],
      totalAmount: 10,
      paymentMethod: 'Stripe',
      paymentStatus: 'Paid',
      shippingAddress: {
        fullName: "Test User",
        phone: "0123456789",
        streetAddress: "123 Test St",
        city: "Test City",
        state: "Test State",
        zipCode: "12345",
        country: "Bangladesh"
      }
    };
    
    const order = await OrderModel.create(orderData);
    console.log("Created successfully:", order._id);
  } catch (err) {
    console.error("Error creating order:", err);
  }
  process.exit(0);
}

test();
