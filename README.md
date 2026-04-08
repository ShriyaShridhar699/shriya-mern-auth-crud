
MERN Stack Authentication & CRUD with MySQL

Project Description

This is a full-stack MERN application built using React.js, Node.js, Express.js, and MySQL.

The project includes:
	•	User Registration
	•	Login Authentication
	•	Forgot Password
	•	Reset Password
	•	JWT Token Authentication
	•	Protected Dashboard
	•	Full CRUD Operations
	•	Statistics Cards
	•	Search and Filter
	•	Pagination
	•	Dark Mode Toggle
	•	Export Items to CSV
	•	Profile Update Page

This project was developed as part of the CampusPe Full Stack Development Assignment.

Tech Stack
Frontend
	•	React.js
	•	React Router DOM
	•	Axios
	•	CSS

Backend
	•	Node.js
	•	Express.js
	•	MySQL
	•	mysql2
	•	bcryptjs
	•	jsonwebtoken
	•	dotenv
	•	cors

 Database

Database Name:mern_auth_db

Tables:
	•	users
	•	items

Backend Setup
cd backend
npm install
npm run dev
Runs on :
http://localhost:5000

Authentication Routes

POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/me
PUT  /api/auth/profile

DASBOARD ROUTES
GET    /api/items
POST   /api/items
PUT    /api/items/:id
DELETE /api/items/:id
GET    /api/items/stats/all

Features Implemented

Authentication
	•	User Registration
	•	Login
	•	Forgot Password
	•	Reset Password
	•	JWT Authentication
	•	Protected Routes

Dashboard
	•	Add New Items
	•	Edit Items
	•	Delete Items
	•	Statistics Cards
	•	Search and Filter
	•	Pagination
	•	Dark Mode
	•	Export CSV
	•	Profile Update

SCREENSHOTS

LOGIN PAGE
![Login](./screenshots/LoginPage.png)
REGISTER PAGE
![Register](./screenshots/Registerpg.png)
FORGOT PASSWORD
![Forgot Password](./screenshots/Forgotpwdpg.png)
RESET PASSWORD
![Reset Password](./screenshots/Resetpwdpg.png)
DASHBOARD PAGE 
![Dashboard](./screenshots/Dashboardpg.png)
CRUD OPERATIONS
ITEM CREATE
![Item Add](./screenshots/itemcreate.png)
EDIT ITEM
![Edit Item](./screenshots/edititem.png)
ITEM DELETE
![Item Delete](./screenshots/itemdelete.png)
BONUS FEATURES
EXPORT CSV
![Export CSV](./screenshots/exportcsv.png)
PAGINATION
![Pgination](./screenshots/paginaton.png)

MYSQL DATABASE
![Database Sql](./screenshots/mernauthtb.png)
MYSQL ITEMS
![Items Sql](./screenshots/sqlitem.png)
MYSQL USERS
![Users Sql](./screenshots/sqlusers.png)

FOLDER STRUCTURE
mern-project
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── src
│   └── public
│
├── screenshots
├── database.sql
└── README.md

Developed by 
Shriya Shridhar
