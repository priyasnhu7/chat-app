# Full Stack Real-Time Chat App

A full-stack, real-time communicative web application built using the MERN stack (MongoDB, Express, React, Node.js) along with Socket.IO for real-time messaging capabilities. 

## Features

- **Real-Time Messaging:** Instant message delivery and reception using WebSockets (Socket.IO).
- **User Authentication:** Secure login and registration with JSON Web Tokens (JWT) and bcrypt password hashing.
- **Online Status:** Real-time visibility of online and offline users.
- **Profile Management:** Users can update their profiles, including uploading profile pictures powered by Cloudinary.
- **Responsive UI:** A modern and sleek user interface built with React and styled using TailwindCSS.

## Tech Stack

### Frontend (Client)
- **Framework:** React + Vite
- **Styling:** TailwindCSS
- **State Management / Context:** Context API (AuthContext, ChatContext)
- **HTTP Client:** Axios
- **Real-time Client:** Socket.IO-Client
- **Notifications:** React Hot Toast

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Real-time Communication:** Socket.IO
- **Image Storage:** Cloudinary
- **Security:** bcryptjs, jsonwebtoken, CORS

## Prerequisites

Before running the application locally, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas UI)
- [Cloudinary](https://cloudinary.com/) Account (for image uploads)
- [Git](https://git-scm.com/)

## Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

2. **Setup the Backend (Server):**
   ```bash
   cd chat-app/server
   npm install
   ```
   *Create a `.env` file in the `server` directory and add the following:*
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
   *Start the backend server:*
   ```bash
   npm run dev
   ```

3. **Setup the Frontend (Client):**
   Open a new terminal window.
   ```bash
   cd chat-app/client
   npm install
   ```
   *Create a `.env` file in the `client` directory and add your backend URL:*
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```
   *Start the frontend application:*
   ```bash
   npm run dev
   ```

4. **Open the Application:**
   Open your browser and navigate to the frontend URL (typically `http://localhost:5173`).

## Deployment Guidelines

### Frontend (Vercel recommended)
- Import the `chat-app/client` directory into Vercel.
- The build preset should be `Vite`.
- Add `VITE_BACKEND_URL` in the Vercel Environment Variables pointing to your deployed backend URL.

### Backend (Render, Railway, or Heroku recommended)
*Note: Due to WebSocket limitations on Serverless Platforms, it is recommended NOT to deploy the backend on Vercel.*
- Import the `chat-app/server` directory into a persistent hosting service like Render.
- Add your database and Cloudinary keys as Environment Variables securely in your hosting provider's dashboard.

## License

This project is open-source and available under the [ISC License](LICENSE).
