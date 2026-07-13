#  Trello Clone - Full Stack Project

A full-stack task management application inspired by Trello, built with ReactJS, Node.js, ExpressJS, and MongoDB.

This project focuses on building a real-world collaborative workspace where users can manage boards, columns, and tasks through an intuitive drag-and-drop interface.

---

## 🔗 Project Links

### Frontend Repository

https://github.com/truong6243/trello-web

### Backend Repository

https://github.com/truong6243/trello-api

### Live Demo

Coming Soon

---

## Overview

Trello Clone is a Kanban-style project management application that helps users organize tasks visually.

The application supports board management, task organization, drag-and-drop interactions, authentication, and API-driven data management.

The goal of this project was to gain hands-on experience with modern frontend architecture, RESTful APIs, state management, database design, and full-stack application development.

---

## Key Features

### Authentication

* User registration
* User login
* Secure password handling
* Protected routes

### Board Management

* Create boards
* Update board information
* Delete boards
* View board details

### Column Management

* Create columns
* Update columns
* Delete columns
* Reorder columns

### Card Management

* Create cards
* Update cards
* Delete cards
* Move cards between columns

### Drag & Drop

* Drag cards within a column
* Move cards across columns
* Reorder columns
* Smooth user experience using DnD Kit

### User Experience

* Responsive interface
* Toast notifications
* Form validation
* Error handling
* Modern Material UI design

---

## Architecture

### Frontend

* React 18
* Vite
* Redux Toolkit
* React Router DOM
* React Hook Form
* Material UI
* DnD Kit
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Joi Validation
* bcryptjs
* RESTful API Architecture

---

## Project Structure

### Frontend

```bash
src/
├── components/
├── pages/
├── redux/
├── routes/
├── utils/
└── services/
```

### Backend

```bash
src/
├── controllers/
├── routes/
├── models/
├── validations/
├── services/
├── middlewares/
└── configs/
```

---

## Technical Highlights

### Frontend

* Component-based architecture
* Global state management with Redux Toolkit
* API integration using Axios
* Route protection and authentication flow
* Drag-and-drop implementation using DnD Kit
* Reusable UI components

### Backend

* RESTful API design
* Request validation using Joi
* MongoDB data modeling
* Password hashing with bcrypt
* Environment-based configuration
* Modular code organization

---

## Getting Started

### Clone Repositories

```bash
git clone https://github.com/truong6243/trello-web.git
git clone https://github.com/truong6243/trello-api.git
```

### Backend Setup

```bash
cd trello-api

npm install

npm run dev
```

### Frontend Setup

```bash
cd trello-web

npm install

npm run dev
```

---

## Screenshots

### Board Management

Add screenshot here

### Drag & Drop Cards

Add screenshot here

### Authentication

Add screenshot here

---

## What I Learned

During this project, I improved my skills in:

* React application architecture
* State management with Redux Toolkit
* REST API integration
* Backend development with ExpressJS
* MongoDB database design
* Drag-and-drop implementation
* Form validation and error handling
* Writing maintainable and scalable code

---

## Author

### Lam Ngoc Truong

Information Technology Student
Posts and Telecommunications Institute of Technology (PTIT)

GitHub:
https://github.com/truong6243

---

## Future Improvements

* Real-time collaboration using Socket.IO
* Board member invitations
* File attachments
* Activity logs
* Dark mode
* Mobile optimization
* Docker deployment
