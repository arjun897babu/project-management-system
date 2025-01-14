# Project Management System

## Description

This is a project management system built with Node.js, Express, and Sequelize ORM and postgreSQL database. It allows users to manage projects, tasks, and users, and includes authentication and authorization mechanisms.

---



## Setup Instructions

### Clone the Repository

Clone the repository and install the dependencies:

```bash
git clone https://github.com/arjun897babu/project-management-system.git

npm install
```

### Create and Configure .env File
Create a .env file in the root of your project directory and add the following environment variables

```bash
PORT = 3001
JWT_SECRET = jwt_secret_value
JWT_EXPIRE = jwt_expire_time
BCRYPT_SALT = bcrypt_salt_value
DB_NAME = database_name
DB_USER_NAME = database_user_name
DB_PASSWORD = database_password
DB_HOST = localhost
DB_PORT = database_port
process.env.NODE_ENV = development
```

### Run the server 
```
npm run dev
```