# E-Commerce Application

This is a full-stack e-commerce application built using the MERN stack (MongoDB, Express, React, Node.js). The application offers features like product listing, user authentication, shopping cart, and order management. The back end uses Node.js and Express, while the front end is built with React.

## Features

- **User Authentication:** Sign up, log in, and manage user sessions with JWT tokens.
- **Product Management:** Browse products with filtering options for categories, pricing, and availability.
- **Shopping Cart:** Add products to the cart and manage quantities.
- **Checkout Process:** Securely place orders and make payments.
- **Order Management:** Users can view their past orders.
- **Admin Dashboard:** Manage products, orders, and users from the admin panel.

## Tech Stack

- **Front End:**
  - React.js
  - Tailwind CSS for UI
  - Redux for state management
- **Back End:**
  - Node.js
  - Express.js
  - MongoDB for the database
  - JWT for authentication
- **Other:**
  - Payment integration (e.g., Stripe/PayPal)
  - Cloudinary for image uploads

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ecommerce-app.git

2. Install Dependencies:
     - Navigate to frontend folder and install frontend dependencies:
     ```bash
       cd frontend
       npm install

     - Navigate to backend folder and install backend dependencies:
     ```bash
       cd backend
       npm install

3. Start the application:
   - Start the backend:
     ```bash
       cd backend
       node server.js
     
   - Start the frontend:
     ```bash
       cd frontend
       npm run dev

The application will be available at http://localhost:3000 for the front end and http://localhost:5000 for the back end.
