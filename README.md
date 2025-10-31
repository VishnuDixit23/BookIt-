BookIt - Fullstack Internship Assignment

This is a complete fullstack booking application built as a submission for an internship. The project includes a React frontend (using Vite and TypeScript) and a Node.js/Express backend with a MongoDB database.

The application allows users to browse travel experiences, view details and available slots, and complete a booking.

This project is 100% complete and meets all assignment requirements, including full deployment.

🔴 Live Demo Links

Live Frontend (Vercel): https://book-it-taupe.vercel.app/

Core Features

Browse Experiences: Home page fetches and displays all available experiences from the backend.

View Details: Details page fetches specific experience data and its available slots.

Dynamic Booking: Users can select a date and time from real database availability.

Checkout & Validation:

Collects user information.

Validates promo codes (SAVE10, FLAT100) against the backend API.

Calculates the final price with discounts.

Booking Confirmation: Submits the final booking to the backend and prevents double-booking.

Dynamic Success/Failure: Shows a proper confirmation or failure message on the result page.

Responsive Design: Fully responsive for mobile devices.

Tech Stack

Frontend: React, TypeScript, Vite, Axios

Backend: Node.js, Express, Mongoose

Database: MongoDB Atlas

Deployment: Vercel (Frontend) & Render (Backend)

How to Run Locally

Prerequisites

Node.js (v18 or newer)

npm

A free MongoDB Atlas account

1. Clone the Repository

git clone [https://github.com/VishnuDixit23/BookIt-.git](https://github.com/VishnuDixit23/BookIt-.git)
cd BookIt-


2. Setup Backend (Server)

Navigate to the server directory:

cd Server


Install dependencies:

npm install


Create a .env file in the /Server folder and add your MongoDB connection string:

MONGO_URI=mongodb+srv://<your_user>:<your_password>@<your_cluster>.../booklt?retryWrites=true&w=majority


Run the seed script to populate your database (only needs to be run once):

npm run seed


Start the server:

nodemon index.js
# Server will be running at http://localhost:5000


3. Setup Frontend (Client)

Open a new terminal and navigate to the client directory:

cd Client


Install dependencies:

npm install


Start the client:

npm run dev
# App will be running at http://localhost:5173
