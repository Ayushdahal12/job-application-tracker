import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">JT</span>
            </div>
            <span className="font-semibold text-slate-900 text-sm">Job Tracker</span>
          </NavLink>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm px-3 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-slate-100 text-slate-900 font-medium"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`
              }
            >
              Applications
            </NavLink>

            <button
              onClick={() => navigate("/add")}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium px-3.5 py-1.5 rounded-lg transition-colors ml-1"
            >
              <span className="text-base leading-none">+</span>
              Add new
            </button>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
