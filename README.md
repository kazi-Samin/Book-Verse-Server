# BookVerse API - Backend Server

This is the robust backend server that powers **BookVerse**, a premium digital library and bookstore application. It provides all the necessary RESTful APIs to handle authentication, book management, user profiles, order processing, and secure payments.

## Live Website
🌍 **[Visit BookVerse Live](https://book-verse-lyart.vercel.app/)**

## ✨ Core Backend Features

- **Secure Authentication:** Implements `better-auth` for industry-standard session management, email verifications, and seamless Google OAuth integration.
- **RESTful API Architecture:** Clean, feature-based folder structure (e.g., `/books`, `/users`, `/orders`, `/payments`) for high maintainability.
- **MongoDB Integration:** Robust data modeling using Mongoose, handling complex schemas for Users, Books, Orders, Wishlists, and Addresses.
- **Stripe Payments Integration:** A dedicated payment endpoint that generates secure Stripe Payment Intents for frictionless checkout on the frontend.
- **Role-Based Access Control:** Secure routes ensuring that only administrators can add, update, or delete books, while users can securely manage their own profiles and orders.

## 🚀 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js (TypeScript)
- **Database:** MongoDB (Mongoose)
- **Authentication:** Better-Auth
- **Payment Processing:** Stripe Node SDK

---
*Built with ❤️ to power the BookVerse ecosystem.*
