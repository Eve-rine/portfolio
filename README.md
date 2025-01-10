### My Portfolio
This is a portfolio web application built with Next.js and Firebase. It has the landing page with the bio, skills, and projects, and includes a admin dide for managing these elements. 
To access the admin side the ur is `/admin`

## Folder Structure

├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   ├── ProjectForm.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SkillForm.jsx
│   ├── config/
│   │   ├── firebase.js    # Firebase configuration
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
├── .env             # Environment variables
├── package.json     # Dependencies and scripts

## Features

**Skills Management:** Add, edit, and view skills.
**Project Management:** Add, edit, and display projects.
**Authentication:** Secure login functionality using Firebase.
**Protected Routes:** Ensures only authenticated users can access the dashboard.

### Technologies Used

**React:** Frontend framework for building the user interface.
**Firebase:** Backend for authentication and data storage.
**React Router:** For navigation and route management.
**Tailwind CSS:** Utility-first CSS framework for styling.

### Installation

Clone the repository:

`git clone https://github.com/Eve-rine/portfolio`
`cd portfolio`

Install dependencies:

`npm install`

### Set up Firebase:

Create a Firebase project at Firebase Console.

Start the development server:

`npm start`
### Usage

Dashboard: Manage skills and projects after logging in.
Home Page: View bio, skills, and projects.
Login Page: Authenticate users to access the dashboard.

Deployment

Build the project:

`npm run build`

Deploy to Firebase:

`firebase deploy`
