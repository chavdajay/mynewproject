# mynewproject
 
### **Project Structure**
- **Frontend**: Located in the `frontend` (D:\book-managment-mern\mynewproject\frontend) directory.
- **Backend**: Located in the `backend` (D:\book-managment-mern\mynewproject\backend) directory.
 
---
 
#### **Step 1: Install Dependency**
1. Navigate to the `backend` directory and install dependencies:
   ```bash
   cd backend
   npm install
 
   2. Navigate to the `frontend` directory and install dependencies:
   ```bash
   cd frontend
   npm install
 
2. Configure Environment Variables

### Backend
1. Go to the backend directory:
	```bash
	cd backend
	 
2. Create a .env file in the backend directory:
	```bash
	touch .env
 
3. Add the following variables to the .env file:
	For Ex.
	PORT=8080
	DB_URL="mongodb://localhost:27017/bookManagement"
	JWT_SECRET="secrect-123"
 
### Frontend
1. Go to the frontend directory:
	```bash
	cd ../frontend

2. Create a .env file in the frontend directory:
	touch .env
 
3. Add the following variables to the .env file:
	For Ex.
		REACT_APP_API_URL=http://localhost:3000
 
### Database Setup
1. Import the database dump:

- Run the following command to import the database:
 
	```bash
	mongoimport --uri <Your MongoDB URI> --collection <Collection Name> --db <Database Name> --file <Dump File Path> --jsonArray

- Example:
	mongoimport --uri mongodb://localhost:27017 --collection books --db bookManagement --file books.json --jsonArray
- Verify the data by accessing the database:
 
- mongo
	use bookManagement
	db.books.find()
 
 
## Start Application
 
1. For Backend 
- Start the backend:
	```bash
	cd backend
	npm start

- The backend server will run at http://localhost:8080.
 
2. For Frontend 
- Start the frontend:
	```bash
	cd frontend
	npm start

- The application will run at http://localhost:3000.

