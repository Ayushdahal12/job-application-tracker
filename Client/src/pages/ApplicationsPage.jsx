import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApplications } from "../hooks/useApplications.js";
import ApplicationCard from "../components/ApplicationCard.jsx";
import StatsBar from "../components/StatsBar.jsx";

const STATUSES = ["", "Applied", "Interviewing", "Offer", "Rejected"];
const STATUS_LABELS = {
  "": "All Status",
  Applied: "Applied",
  Interviewing: "Interviewing",
  Offer: "Offer",
  Rejected: "Rejected",
};

export default function ApplicationsPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const { applications, loading, error, deleteApplication } = useApplications({
    status: statusFilter,
    search,
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Applications</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Track every opportunity in your pipeline
          </p>
        </div>
        <button onClick={() => navigate("/add")} className="btn-primary hidden sm:block">
          + Add Application
        </button>
      </div>

      {/* Stats */}
      {!loading && !error && <StatsBar applications={applications} />}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by company or job title..."
          className="form-input max-w-xs"
        />
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                statusFilter === s
                  ? "bg-brand-500 text-white border-brand-500"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-5 space-y-3 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3.5 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
              <div className="h-3 bg-slate-100 rounded w-1/3" />
              <div className="h-8 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <p className="text-red-700 font-medium">Could not load applications</p>
          <p className="text-red-500 text-sm mt-1">{error}</p>
          <p className="text-red-400 text-xs mt-2">
            Make sure the backend server is running on port 5000
          </p>
        </div>
      )}

      {!loading && !error && applications.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-5xl mb-4">📋</div>
          <p className="font-semibold text-slate-600 text-lg">No applications yet</p>
          <p className="text-sm mt-1">Add your first job application to get started</p>
          <button onClick={() => navigate("/add")} className="btn-primary mt-4">
            + Add Application
          </button>
        </div>
      )}

      {!loading && !error && applications.length > 0 && (
        <>
          <p className="text-xs text-slate-400">
            {applications.length} application{applications.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onDelete={deleteApplication}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
