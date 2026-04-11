# Pizza Delivery

A full-stack pizza ordering web app built with **Next.js 16 (App Router)**, **React 19**, **Material UI** and **MongoDB**.

Built for the *Secure Full-stack Web Development* module (BSc in Computing, TU Dublin, 2026).

## Features

- Product menu and single-product pages (pizzas, sides, desserts)
- User registration and login
- Shopping cart: add, view and remove items
- Checkout with order saved to the database, plus a thank-you page
- Customer dashboard
- Light/dark theme via MUI `ThemeProvider`

## Tech stack

| Layer    | Tech                                   |
|----------|----------------------------------------|
| Frontend | Next.js, React, Material UI, Tailwind  |
| Backend  | Next.js API routes (`src/app/api/*`)   |
| Database | MongoDB (`app` database: `products`, `users`, `cart`, `orders`) |

## Running locally

1. Start MongoDB, for example with Docker:

   ```bash
   docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example mongo
   ```

2. Add some documents to the `products` collection of the `app` database.
3. Install and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open <http://localhost:3000>.

## Project structure

```
src/app/
  api/            REST endpoints (login, register, cart, checkout, products)
  cart/ checkout/ dashboard/ login/ register/ thankyou/ viewCart/ viewSingleProduct/
public/images/    product images
```
