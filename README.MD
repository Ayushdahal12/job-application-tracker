# 📋 Job Application Tracker

A modern, full-stack web application to organize, track, and manage your job applications in one place. Monitor application statuses, store interview notes, and visualize your job search progress with an intuitive dashboard.

![LinkedIn Blue Theme](https://img.shields.io/badge/Theme-LinkedIn%20Blue-0A66C2)
![Status](https://img.shields.io/badge/Status-Active-green)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

- 📊 **Dashboard Statistics** - Real-time count of applications by status
- 🔍 **Smart Search & Filter** - Find applications by company or job title
- 📝 **Application Management** - Add, edit, and delete applications easily
- 🏷️ **Status Tracking** - Applied, Interviewing, Offer, Rejected
- 💼 **Job Type Support** - Internship, Full-time, Part-time
- 📅 **Date Tracking** - Record when you applied
- 📌 **Notes & Details** - Store interview notes and salary info
- 🎨 **Beautiful UI** - Modern design with LinkedIn blue theme
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ☁️ **Cloud Ready** - Deploy to Vercel & Render

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js & Express** - Server framework
- **PostgreSQL** - Database
- **Prisma ORM** - Database toolkit
- **CORS** - Cross-origin requests

---

## 📸 Screenshots

> **Note:** Screenshots should be taken in the following order. Replace the placeholder image URLs with actual screenshots.

### 1️⃣ Dashboard (Home Page)
Shows all applications with statistics and filtering options
```
- Applications counter (Applied, Interviewing, Offer, Rejected)
- Search bar and status filters
- Grid of application cards
```
![Dashboard Screenshot - Add actual screenshot URL here]

### 2️⃣ Application Card
Individual application card showing details
```
- Company name and logo (initials)
- Job title
- Application status badge
- Job type (Internship/Full-time/Part-time)
- Applied date
- Notes preview
- Edit and Delete buttons
```
![Application Card - Add actual screenshot URL here]

### 3️⃣ Add New Application Page
Form to create a new application
```
- Company name autocomplete
- Job title autocomplete
- Applied date picker
- Job type selector (radio buttons)
- Application status selector
- Notes text area
- Save button
```
![Add Application Page - Add actual screenshot URL here]

### 4️⃣ Edit Application Page
Form to modify existing application
```
- Pre-filled form with current data
- All the same fields as Add page
- Update button
```
![Edit Application Page - Add actual screenshot URL here]

### 5️⃣ Status Filtering
Filter applications by status
```
- All / Applied / Interviewing / Offer / Rejected buttons
- Real-time filtering
```
![Filtering - Add actual screenshot URL here]

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL database
- Git

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/job-application-tracker.git
cd job-application-tracker
```

#### 2. Backend Setup
```bash
cd Server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your PostgreSQL database URL to .env
# DATABASE_URL=postgresql://user:password@localhost:5432/job_tracker

# Run migrations
npx prisma migrate dev --name init

# Seed sample data (optional)
npm run db:seed

# Start server
npm run dev
# Server runs on http://localhost:5001
```

#### 3. Frontend Setup
```bash
cd Client

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

#### 4. Access the Application
Open your browser and go to: **http://localhost:5173**

---

## 📖 Usage

### Adding a New Application
1. Click the **"+ Add new"** button in the navbar
2. Enter company name (with autocomplete suggestions)
3. Enter job title (with autocomplete suggestions)
4. Select application date
5. Choose job type (Internship/Full-time/Part-time)
6. Set application status
7. Add any notes (optional)
8. Click **"Save Application"**

### Viewing Applications
1. Applications appear in a grid on the home page
2. Use the **search bar** to find by company or job title
3. Click **filter buttons** to view by status
4. View statistics at the top showing counts by status

### Editing an Application
1. Click the **"Edit"** button on an application card
2. Modify any fields
3. Click **"Save Application"**

### Deleting an Application
1. Click the **"Delete"** button on an application card
2. Confirm in the popup dialog
3. Application is removed

---

## 🌐 Deployment

### Deploy Frontend to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Set root directory to `Client/`

3. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add: `VITE_API_BASE_URL = https://your-render-api.onrender.com/api`

4. **Deploy**
   - Click "Deploy"
   - Your site is live! 🎉

### Deploy Backend to Render

1. **Prepare Backend**
   ```bash
   # Ensure .env has DATABASE_URL for production
   ```

2. **Create Render Service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Set Build Command: `npm install && npx prisma migrate deploy`
   - Set Start Command: `node index.js`

3. **Add Environment Variables**
   - `DATABASE_URL` - Your PostgreSQL URL
   - `NODE_ENV` - Set to `production`
   - `CLIENT_URL` - Your Vercel frontend URL

4. **Deploy**
   - Click "Deploy"
   - Your API is live! 🎉

---

## 📁 Project Structure

```
job-application-tracker/
├── Client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ApplicationCard.jsx       # Card component
│   │   │   ├── ApplicationForm.jsx       # Form component
│   │   │   ├── Layout.jsx                # Layout wrapper
│   │   │   ├── StatusBadge.jsx           # Status badge
│   │   │   └── StatsBar.jsx              # Stats component
│   │   ├── hooks/
│   │   │   └── useApplications.js        # Custom hook for API
│   │   ├── pages/
│   │   │   ├── ApplicationsPage.jsx      # Home page
│   │   │   ├── AddApplicationPage.jsx    # Add page
│   │   │   └── EditApplicationPage.jsx   # Edit page
│   │   ├── api/
│   │   │   └── applications.js           # API calls
│   │   ├── App.jsx                       # Main app
│   │   └── main.jsx                      # Entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── Server/                          # Express Backend
    ├── controllers/
    │   └── applications.js               # Business logic
    ├── routes/
    │   └── applications.js               # API routes
    ├── prisma/
    │   ├── schema.prisma                 # Database schema
    │   ├── seed.js                       # Sample data
    │   └── migrations/                   # Database migrations
    ├── index.js                          # Server entry point
    ├── package.json
    └── .env.example

```

---

## 🔌 API Endpoints

### Applications
- `GET /api/applications` - Get all applications (with pagination, search, filter)
- `GET /api/applications/:id` - Get single application
- `POST /api/applications` - Create new application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

---

## 🎨 Color Scheme

The app uses a professional LinkedIn-inspired color scheme:
- **Primary Blue**: `#0A66C2` - Main actions and headers
- **Secondary**: Black - Secondary selections
- **Danger**: Red - Destructive actions
- **Amber**: Rejected status indicator
- **Background**: Slate shades - Clean, professional look

---

## 📦 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm run dev      # Start with nodemon
npm run start    # Start production server
npm run db:seed  # Seed database
```

---

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Check if backend server is running on port 5001
- Verify `VITE_API_BASE_URL` environment variable
- Check CORS settings in `Server/index.js`

### Database errors
- Ensure PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Run `npx prisma migrate dev --name init`

### Port already in use
```bash
# Kill process on port 5001 (backend)
lsof -ti:5001 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

---

## 📝 Environment Variables

### Frontend (`.env`)
```
VITE_API_BASE_URL=http://localhost:5001/api
```

### Backend (`.env`)
```
DATABASE_URL=postgresql://user:password@localhost:5432/job_tracker
NODE_ENV=development
PORT=5001
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

Created by **Ayush**

---

## 🙏 Acknowledgments

- React and Vite for amazing tools
- Tailwind CSS for utility-first styling
- Prisma for excellent ORM
- Express.js for backend framework
- LinkedIn for color inspiration

---

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an issue on GitHub
3. Contact via email

---

**Happy Job Hunting! 🚀**