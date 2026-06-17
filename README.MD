 1. Create the database in pgAdmin or psql
CREATE DATABASE job_tracker;

 2. Backend
cd server
cp .env.example .env        # fill in your DB credentials
npm install
npx prisma migrate dev --name init
npm run db:seed             # optional sample data
npm run dev                 # runs on :5000

 3. Frontend (new terminal)
cd client
npm install
npm run dev                 # runs on :5173