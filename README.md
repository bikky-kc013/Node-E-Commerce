# E-Commerce Backend App

## Overview

This repository contains the backend implementation for an E-Commerce application, providing a RESTful API with authentication, authorization, and separate access for both admin and users. The backend facilitates user registration, authentication, product management, and order processing.

## Features of this application

- **Authentication and Authorization:**
  - Secure user registration and login.
  - Seperate admin token for admin access and seperate user token.
  - Token-based authentication using JSON Web Tokens (JWT).
  - Authorization middleware to ensure role-based access control.

- **User and Admin Access:**
  - Separate access for regular users and administrators.
  - Admins have additional privileges, including product management and order processing.

- **Product Management:**
  - Each product includes details such as name, price, and image (One can use the string   for image).

- **Order Management:**
  - Users can create and manage their orders.

- **Bugs:**
  - Special kind of headache for 404 status management.

## Technologies Used

- **Node.js:** Not a framework but a Run Time Environment.
- **Express:** Node.js framework.
- **MongoDB:** No SQL database.
- **JWT:** JSON Web Tokens for secure user authentication.
- **Other NPM packages:** bcrypt, nodemon, dotenv and more.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/bikky-kc013/Node-E-Commerce.git

 2. **Install Dependencies::**

    ```bash
    npm install

 3. **Environment Variables:**

    ```bash
    You should define your own env variables, your own MongoDB connection string and more 
    important is to consider the secure secret key.

 ## Note  

 - You can find many bug in the app do not try to debug.
