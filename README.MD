# Job Application Tracker

A full-stack web application to organize and track job applications. Monitor application statuses, store interview notes, and manage your job search pipeline.

---

## Features

- Dashboard with application statistics
- Search and filter applications by status
- Add, edit, and delete applications
- Track application status: Applied, Interviewing, Offer, Rejected
- Job type support: Internship, Full-time, Part-time
- Store notes and application dates
- Responsive design for desktop and mobile
- Modern UI with LinkedIn blue theme

---

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios
**Backend:** Node.js, Express, PostgreSQL, Prisma ORM

---

---

## Installation

### Prerequisites
- Node.js 16+
- PostgreSQL
- Git

### Backend Setup
```bash
cd Server
npm install
cp .env.example .env
# Add DATABASE_URL to .env
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

### Frontend Setup
```bash
cd Client
npm install
npm run dev
```



---

## Usage

1. **Add Application** - Click "Add new" button
2. **Enter Details** - Company name, job title, date, job type, status, notes
3. **Save** - Click "Save Application"
4. **Edit** - Click "Edit" on any card to modify
5. **Delete** - Click "Delete" to remove
6. **Search** - Use search bar to find applications
7. **Filter** - Click status buttons to filter

---

## Deployment

### Frontend to Vercel
1. Push to GitHub
2. Connect repository to Vercel
3. Set root directory to `Client/`
4. Add environment variable: `VITE_API_BASE_URL`
5. Deploy

### Backend to Render
1. Create Render Web Service
2. Connect GitHub repository
3. Build Command: `npm install && npx prisma migrate deploy`
4. Start Command: `node index.js`
5. Add environment variables (DATABASE_URL, NODE_ENV)
6. Deploy

---

## Project Structure

```
job-application-tracker/
├── Client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── api/
│   └── package.json
├── Server/
│   ├── controllers/
│   ├── routes/
│   ├── prisma/
│   └── index.js
└── README.MD
```

---

## API Endpoints

- `GET /api/applications` - Get all applications
- `GET /api/applications/:id` - Get single application
- `POST /api/applications` - Create application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

---

## Environment Variables

**Frontend (.env)**
```
VITE_API_BASE_URL=http://localhost:5001/api
```

**Backend (.env)**
```
DATABASE_URL=postgresql://user:password@localhost:5432/job_tracker
NODE_ENV=development
PORT=5001
```

---

## Troubleshooting

- Backend not connecting: Check if server runs on port 5001
- Database errors: Verify DATABASE_URL and run migrations
- Port in use: Kill process on port 5001 or 5173

---

## License

MIT
