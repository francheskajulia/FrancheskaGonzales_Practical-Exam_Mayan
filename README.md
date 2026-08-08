# FrancheskaGonzales_Practical-Exam_Mayan
Practical Exam for Mayan Junior Tech Associate (Fullstack)

Fullstack Task Management Application

## FEATURES
- Add, edit, delete tasks
- Mark tasks as Complete/Incomplete
- Search tasks by title
- Filter tasks by status (All, Active, Completed, Incomplete)
- Combined search and filter functionality

## TECH STACK
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express
- Database: PostgreSQL

## PREREQUISITES
- Node.js v24.16.0
- PostgreSQL installed and running

## SETUP INSTRUCTIONS
1. Clone the repository
git clone https://github.com/francheskajulia/FrancheskaGonzales_Practical-Exam_Mayan
cd FrancheskaGonzales_Practical-Exam_Mayan

2. Database Setup
cd backend
a. Create a PostgreSQL database
b. Run the schema file to create  the tasks table:
psql -U [username] -d [database_name] -f schema.sql
**Replace [username] and [database_name] with your own PostgreSQL username and database name.

3. Backend Setup
npm install
npm run dev

4. Frontend Setup
cd ../frontend
npm install
npm run dev

The app will be running at `http://localhost:5173/`

## NOTES
- For simplicity in setup and configuration of this application, the `.env` file was intentionally not added to `.gitignore` so you can run the project immediately without needing to create your own environment variables. In a production environment, I would exclude `.env` from version control and instead provide a `.env.example` file with placeholder values, as committing environment files is a security risk.