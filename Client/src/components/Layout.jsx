import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold text-sm">
              JT
            </div>
            <span className="font-semibold text-slate-800 text-sm tracking-tight">
              Job Tracker
            </span>
          </NavLink>

          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-brand-50 text-brand-600"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`
              }
            >
              Applications
            </NavLink>
            <button
              onClick={() => navigate("/add")}
              className="btn-primary text-sm ml-2"
            >
              + Add New
            </button>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
