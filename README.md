# Hotel Hanuman – Cash Flow Management System

A full-stack MERN application designed to manage the daily financial activities of Hotel Hanuman.

## Project Overview

Hotel Hanuman Cash Flow Management System helps manage daily sales, expenses, cash flow, customer credit (Udhar), staff, and monthly reports through a single application.

## Features

- Secure Login and Authentication
- Dashboard with financial summary
- Daily Sales Management
- Daily Expenses Management
- Cash Book Management
- Customer Udhar Management
- Monthly Reports
- Staff Management
- Hotel Settings
- Marathi and English Language Support
- Responsive Mobile-Friendly Design

## Tech Stack

**Frontend**
- React.js
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB

**Other Tools**
- Git and GitHub
- JWT Authentication
- Axios

## Project Structure

```text
Hotel_Hanuman/
├── client/
│   ├── src/
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── package.json
├── .gitignore
└── README.md
```

## How to Run the Project

### 1. Clone Repository

```bash
git clone https://github.com/rushikeshkute/hotel-hanuman-cashflow.git
```

### 2. Install Backend Dependencies

```bash
cd hotel-hanuman-cashflow/server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `server` folder and configure the MongoDB connection and JWT secret using the variable names required by the backend code.

Never upload your `.env` file to GitHub.

### 4. Start Backend

```bash
npm run dev
```

### 5. Install Frontend Dependencies

Open another terminal:

```bash
cd hotel-hanuman-cashflow/client
npm install
```

### 6. Start Frontend

```bash
npm run dev
```

## Project Purpose

This project was developed to solve real-world financial management challenges in a small hotel business while demonstrating practical full-stack web development skills.

## Developer

Developed as a real-world MERN Stack portfolio project.

**GitHub:** https://github.com/rushikeshkute