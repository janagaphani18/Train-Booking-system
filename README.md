<<<<<<< HEAD
# Train-Booking-system
=======
# AI Train Booking System

A modern, AI-powered train booking platform built with the MERN stack (MongoDB, Express, React, Node.js) and Vite.

## Features
- **Modern UI**: Stunning, responsive frontend built with React and custom CSS.
- **AI Chatbot**: Built-in AI assistant to help users find trains and answer queries.
- **Smart Predictions**: AI-driven dynamic pricing prediction model for tickets.
- **Full Backend Setup**: Express server with MongoDB models for Users, Trains, and Bookings.

## Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB instance)
- API keys for your preferred AI provider (e.g., OpenAI or Google Gemini)

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   AI_API_KEY=your_ai_provider_api_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 3. Usage
- Open your browser and navigate to `http://localhost:5173`.
- The backend API runs on `http://localhost:5000`.
- Click the floating chatbot button on the bottom right to interact with the AI assistant!

## Notes for Future Development
- **Authentication**: Implementing user sign-up/login using the provided `User.js` model and JWT.
- **AI Integration**: Update the `aiController.js` in the backend to make actual API calls to Gemini/OpenAI instead of mock data.
- **Payment Gateway**: Integrate Stripe or Razorpay for actual ticket processing.
>>>>>>> 87dd680 (Initial comimit)
