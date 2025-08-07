# FluxBuy

FluxBuy is a full-stack eCommerce web application built with React (Vite) for the frontend and Node.js/Express/MongoDB for the backend.

## Features

- User authentication (register/login)
- Product browsing, search, and category filtering
- Flash sales and featured products
- Product details with reviews and ratings
- Cart management (add, remove, update quantity)
- Wishlist functionality
- Responsive UI with Tailwind CSS
- Brand exploration section

## Project Structure

```
Backend/
  ├── src/
  │   ├── config/
  │   ├── controllers/
  │   ├── models/
  │   ├── routes/
  │   ├── seed/
  │   └── services/
  ├── .env
  ├── package.json
  └── server.js
Frontend/
  └── FluxBuy/
      ├── public/
      ├── src/
      ├── .env
      ├── package.json
      └── vite.config.js
```

## Getting Started

### Backend

1. **Install dependencies:**
   ```sh
   cd Backend
   npm install
   ```
2. **Configure environment variables:**  
   Create a `.env` file with your MongoDB connection string and JWT secret:
   ```
   mongo_db_connection_string=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
3. **Seed products (optional):**
   Run the seeder in `src/seed/seedProducts.js` to populate the database.
4. **Start the server:**
   ```sh
   npm run dev
   ```
   The backend runs on `http://localhost:3000`.

### Frontend

1. **Install dependencies:**
   ```sh
   cd Frontend/FluxBuy
   npm install
   ```
2. **Configure environment variables:**  
   Create a `.env` file with:
   ```
   VITE_BACKEND_URL=http://localhost:3000
   ```
3. **Start the frontend:**
   ```sh
   npm run dev
   ```
   The frontend runs on `http://localhost:5173`.

## Usage

- Register or login to start shopping.
- Browse products by category or search.
- Add products to your cart or wishlist.
- View product details and reviews.
- Manage your cart and proceed to checkout.

## Tech Stack

- **Frontend:** React, Redux Toolkit, React Router, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## License

MIT

---

Made with ❤️ by 