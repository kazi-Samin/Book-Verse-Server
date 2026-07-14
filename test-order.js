const http = require('http');

async function testOrder() {
  const data = JSON.stringify({
    orderNumber: "TEST-123",
    items: [{
      bookId: "647f2b9b9c9c9c9c9c9c9c9c",
      title: "Test",
      price: 10,
      quantity: 1,
      coverImage: "url"
    }],
    totalAmount: 10,
    paymentMethod: "Stripe",
    paymentStatus: "Paid",
    shippingAddress: {
      fullName: "Test", phone: "123", streetAddress: "test", city: "test", state: "test", zipCode: "123", country: "test"
    }
  });

  const response = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: data
  });

  const text = await response.text();
  console.log("Status:", response.status);
  console.log("Body:", text);
}

testOrder();
