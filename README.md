# Student Job Tracker

A full-stack web application designed for students and job seekers to manage and track job applications with ease. From adding new entries to updating statuses and filtering by progress — this app has you covered.

---

## Live Demo

Here is the preview of the website which is initially designed with Local Storage API.

https://job-applications-manager-demo.netlify.app/

---

## Tech Stack

| Tech             | Description                    |
|------------------|--------------------------------|
| **React.js**     | Frontend library (with Hooks)  |
| **Node.js**      | JavaScript runtime             |
| **Express.js**   | Backend web framework          |
| **MongoDB**      | NoSQL database                 |

---

## Features

### Add Job Application  
Create a new job entry with the following fields:
- Company Name  
- Job Role  
- Application Status: `Applied`, `Interview`, `Offer`, `Rejected`  
- Date of Application    

### List All Applications  
- Displays all jobs in a clean and responsive layout  
- Supports **filtering** by status and date

### Update Status  
- Quickly update the status as your application progresses  

### Delete Application  
- Remove any job application from the list  


### Installation & Setup

```bash
git clone https://github.com/pippalla-sairam/Job-Applications-Manager.git
cd Job-Applications-Manager
```

### Setup backend
```bash
cd backend
npm install
node server.js
```

Add .env file with your MongoDB URI

### Setup frontend
```bash
npm install
npm run dev
```
