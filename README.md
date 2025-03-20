#  Task Management System

##  Overview
The **Task Management System** is designed to help users create, update, and track their tasks efficiently. It provides **real-time notifications** for upcoming deadlines, ensuring timely task completion. 

---

##  Tech Stack & Choices
###  **Architecture**
- **Frontend**: [React.js](https://react.dev/) – Interactive UI for seamless user experience
- **Backend**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/) – Efficient API handling
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) – Scalable and secure cloud-based storage
- **Authentication**: [JWT](https://jwt.io/) for secure authentication & [Google Auth](https://developers.google.com/identity) for easy login/signup
- **Notifications**: [Nodemailer](https://nodemailer.com/) – Sends task deadline reminders via email
- **Real-time Updates**: [Socket.io](https://socket.io/) – Enables instant task updates & notifications

---

##  Data Flow
###  **1. Task Creation**
✅ User creates a task via the frontend form
✅ Data is sent to the backend API and stored in MongoDB Atlas

###  **2. Task Updates & Tracking**
✅ Users can update task details, status, and deadlines
✅ The system tracks deadlines to keep tasks up to date

###  **3. Notifications**
✅ Email notifications for upcoming deadlines using **NodeMailer**
✅ Real-time notifications pushed via **Socket.io**

###  **4. User Authentication**
✅ Users sign up/log in using **Google Auth**
✅ A **JWT token** is generated for secure API requests

---

##  API Design
###  **1. Authentication APIs**
```http
POST /api/userRoutes/signup    # Registers a new user
POST /api/userRoutes/login     # Logs in the user and returns a JWT token
GET  /api/userRoutes/user      # Fetches authenticated user details
```

###  **2. Task Management APIs**
```http
POST   /savethread        # Create a new task
GET    /verifyToken        # Retrieve all tasks for the logged-in user
PUT    /updatethread/:content    # Update a task
DELETE /deletethread/:content    # Delete a task
```

###  **3. Notification APIs**
```http
POST /emailSend   # Trigger a notification manually
```

---

**How to Run Locally**

🔹 Prerequisites

* Install Node.js (LTS version)
* Install MongoDB (local or use MongoDB Atlas)

  
🔹 Setup Instructions

**Clone the repository**
```ruby
git clone https://github.com/your-username/taskmanager2.git
cd taskmanager2
```

**Install Backend Dependencies**
```ruby
npm install
```


**Start MongoDB (if running locally)**
```ruby
mongod
```


**Run the Backend Server**
```ruby
npm run dev
```


**Install Frontend Dependencies**

```ruby
cd frontend
npm install
```


**Start the Frontend**
```ruby
npm start
```


###  Scalability & Performance

✅ **Database Optimization** – Indexing to speed up queries in MongoDB Atlas

✅ **Load Balancing** – Scalable deployment using cloud hosting for handling multiple users

✅ **Efficient WebSockets** – Optimized **Socket.io** for real-time communication

✅ **Task Queueing** – Background jobs handle email notifications to prevent delays

✅ **Security Measures** – **JWT authentication, HTTPS encryption, and input validation** to prevent attacks

---

##  Future Enhancements

🔹 **Push Notifications** – Integrate Firebase for in-app notifications

🔹 **AI-Based Task Prioritization** – Smart scheduling based on deadlines

🔹 **Team Collaboration** – Shared task lists and team management features

---

##  Conclusion
This **Task Management System** ensures seamless task tracking, **timely notifications**, and a **smooth user experience**. With **real-time updates** and **email alerts**, it serves as a powerful tool for productivity and efficiency. 

---
