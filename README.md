# JobSeeker Project Documentation

## Overview
**JobSeeker** is a MERN (MongoDB, Express, React, Node.js) web application designed to connect job seekers with employers. This project includes user registration, login, job posting, job search, profile management, and job management features. Authentication and authorization are enforced to ensure data security and role-based access control.

---

## Project Structure

- **Frontend Directory**: `frontend`
- **Backend Directory**: `backend`

---

## API Routes

### User Routes
These routes handle user authentication, profile management, and password updates.

| Route              | Method | Protected | Role       | Description                        |
|--------------------|--------|-----------|------------|------------------------------------|
| `/register`        | POST   | No        | Any        | Register a new user               |
| `/login`           | POST   | No        | Any        | Log in a user                     |
| `/logout`          | GET    | Yes       | Any        | Log out the current user          |
| `/profile`         | POST   | Yes       | Any        | Get the logged-in user's profile  |
| `/update/profile`  | PUT    | Yes       | Any        | Update the logged-in user's profile |
| `/update/password` | PUT    | Yes       | Any        | Update the logged-in user's password |
| `/forgotpassword`  | GET    | No        | Any        | Initiate password reset process   |

#### Import Path
```javascript
import { userRouter } from "./routes/userRoutes.js";
```

### Job Routes
These routes handle job postings, searching, and managing job listings, with access restricted to authorized users.

| Route                 | Method | Protected | Role        | Description                        |
|-----------------------|--------|-----------|-------------|------------------------------------|
| `/postjob`            | POST   | Yes       | Employer    | Post a new job                    |
| `/delete/:id`         | DELETE | Yes       | Employer    | Delete an existing job by ID      |
| `/update/:id`         | PUT    | Yes       | Employer    | Update an existing job by ID      |
| `/getalljobs`         | GET    | No        | Any         | Retrieve all job listings         |
| `/getmyjobs`          | GET    | Yes       | Employer    | Get jobs posted by the logged-in employer |
| `/getsinglejob/:id`   | GET    | No        | Any         | Retrieve a single job by ID       |
| `/searchalljobs`      | GET    | No        | Any         | Search for jobs by criteria       |

#### Import Path
```javascript
import { jobRouter } from "./routes/jobRoutes.js";
```

---

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/JobSeeker.git
   cd JobSeeker
   ```

2. **Install Dependencies**
   - Backend
     ```bash
     cd backend
     npm install
     ```
   - Frontend
     ```bash
     cd ../frontend
     npm install
     ```

3. **Environment Variables**
   In `backend/.env` file, add necessary environment variables for your setup.

4. **Start the Development Servers**
   - Backend: Open a terminal, navigate to the `backend` folder, and run:
     ```bash
     npm run dev
     ```
     The backend should start at [http://localhost:4000](http://localhost:4000).

   - Frontend: Open a separate terminal, navigate to the `frontend` folder, and run:
     ```bash
     npm run dev
     ```
     The frontend should start at [http://localhost:3000](http://localhost:3000).

---

## Running the Project

1. **Start Backend Server**
   - In the `backend` folder:
     ```bash
     npm run dev
     ```

2. **Start Frontend Server**
   - In the `frontend` folder:
     ```bash
     npm run dev
     ```

   Once both servers are running, you can access the application by navigating to [http://localhost:3000](http://localhost:3000) in your browser.

---

## Additional Notes

- **Authentication Middleware**: `isAuthenticated` is used to protect routes that require a logged-in user. `isAuthorized` additionally checks for user roles.
- **Controllers**: The logic for each route is handled in separate controller files to maintain clean, modular code.

For more details, check the `controllers` and `middlewares` folders for route-specific logic and the authentication implementation.
