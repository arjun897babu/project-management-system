# Project Management System

## Description

This is a project management system built with Node.js, Express, and Sequelize ORM and postgreSQL database. It allows users to manage projects, tasks, and users, and includes authentication and authorization mechanisms.

---

## [API Documentation](https://documenter.getpostman.com/view/30767357/2sAYQXoseT)

To run the API in Postman, replace variable `{{baseURL}}` with:
- `http://localhost:[your_port]`

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

# Database Schema and Relationships

This document outlines the database schema for the application and its relationships between different models.

---

## **User Model**

- **uId**: Primary key
- **name**: User's name
- **email**: User's email address (unique)
- **password**: Encrypted password for authentication

### Relationships:
- **User -> Project**: Many-to-many (A user can be part of multiple projects, and a project can have multiple users).
- **User -> Task**: One-to-many (A user can have multiple tasks ).

---

## **Project Model**

- **uId**: Primary key
- **name**: Project name
- **description**: A brief description of the project
- **userId**: Foreign key to the User model (project owner)

### Relationships:
- **Project -> Task**: One-to-many (A project can have multiple tasks).
- **Project -> User**: Many-to-many 

---

## **Task Model**

- **uId**: Primary key
- **name**: Task title
- **description**: Task description
- **status**: Current status of the task (e.g., `todo`, `in progress`, `done`)
- **projectId**: Foreign key to the Project model
- **userId**: Foreign key to the User model (task owner)

### Relationships:
- **Task -> Project**: Many-to-one (Each task belongs to one project).
- **Task -> User **: Many-to-one (Each task is created by one user).
---
