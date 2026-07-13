# BookVerse Backend

This is the Express.js & TypeScript backend for the BookVerse application.

## Tech Stack
- Node.js
- Express.js
- TypeScript
- MongoDB & Mongoose
- Better Auth (MongoDB Adapter)
- Zod (Validation)
- Helmet, Cors, Compression, Rate Limit

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root of the server folder:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/bookverse
   BETTER_AUTH_SECRET=super_secret_better_auth_key_replace_in_prod
   BETTER_AUTH_URL=http://localhost:5000
   FRONTEND_URL=http://localhost:3000
   
   # Optional: Google OAuth
   # GOOGLE_CLIENT_ID=your_client_id
   # GOOGLE_CLIENT_SECRET=your_client_secret
   ```

3. **Running the Server**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production build
   npm run build
   npm start
   ```

## Folder Structure
- `src/config/`: Configuration for env variables, db, and better-auth.
- `src/features/`: Feature-based modules containing models, repositories, services, controllers, and routes.
- `src/middlewares/`: Express middlewares for security and auth.
- `src/types/`: Global TS types.
- `src/server.ts`: Entry point.
- `src/app.ts`: Express setup.

## Deployment
1. Ensure all `devDependencies` are skipped or build output is generated first (`npm run build`).
2. Provide a production MongoDB instance (e.g., MongoDB Atlas) in `MONGO_URI`.
3. Start the application via `node dist/server.js`.
