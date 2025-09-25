# FoodApp - A Manifest-Powered Application

This is a complete, production-ready food app built with React and a Manifest-powered backend. It allows customers to browse restaurants and restaurant owners to manage their menus.

## Features

- **User Authentication**: Secure login for customers, restaurant owners, and admins.
- **Role-Based Access Control**: 
  - **Customers**: Can view all restaurants and menus.
  - **Owners**: Can manage their own restaurant profile and menu items.
  - **Admins**: Have full access via the Admin Panel.
- **Restaurant & Menu Management**: Full CRUD functionality for restaurants and menu items, secured by ownership policies.
- **Auto-Generated Admin Panel**: A complete admin dashboard available at `/admin` for managing all data.
- **File Uploads**: Support for restaurant logos and menu item images.

## Getting Started

### Prerequisites

- Node.js and npm
- Manifest CLI

### 1. Backend Setup

1.  **Save the `manifest.yml`** file to your project root.
2.  **Run the Manifest backend**:
    ```bash
    mnfst start
    ```
    This will start the backend server, create the database, and make the API and Admin Panel available.

3.  **Create Demo Users**:
    - Visit the Admin Panel at [http://localhost:3000/admin](http://localhost:3000/admin).
    - Log in with `admin@manifest.build` / `admin`.
    - Go to the 'Users' section and create two new users:
      - **Customer**: `customer@example.com` / `password` (role: `customer`)
      - **Owner**: `owner@example.com` / `password` (role: `owner`)

4.  **Create a Restaurant for the Owner**:
    - In the Admin Panel, go to 'Restaurants'.
    - Create a new restaurant and assign the 'owner@example.com' user as the owner.

### 2. Frontend Setup

1.  **Unpack the frontend files** into your `src/` directory.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set the App ID**:
    - In `src/constants.js`, change `food-app-placeholder` to the `App ID` shown when you run `mnfst start`.
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Your React application will be available at [http://localhost:5173](http://localhost:5173).

## How to Use

- Visit the application and use the 'Demo as Customer' or 'Demo as Owner' buttons to log in with the pre-configured accounts.
- As an owner, you can add/remove menu items for your restaurant directly from the dashboard.
- As a customer, you can browse all available restaurants.