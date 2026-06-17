import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApplications } from "../hooks/useApplications.js";
import ApplicationCard from "../components/ApplicationCard.jsx";

const STATUSES = ["", "Applied", "Interviewing", "Offer", "Rejected"];
const STATUS_LABELS = {
  "": "All",
  Applied: "Applied",
  Interviewing: "Interviewing",
  Offer: "Offer",
  Rejected: "Rejected",
};

const STATUS_DOT = {
  Applied: "bg-blue-400",
  Interviewing: "bg-amber-400",
  Offer: "bg-emerald-400",
  Rejected: "bg-red-400",
};

function StatsBar({ applications }) {
  const counts = ["Applied", "Interviewing", "Offer", "Rejected"].reduce((acc, s) => {
    acc[s] = applications.filter((a) => a.status === s).length;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {Object.entries(counts).map(([status, count]) => (
        <div
          key={status}
          className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3"
        >
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[status]}`} />
          <div>
            <p className="text-2xl font-semibold text-slate-900 leading-none">{count}</p>
            <p className="text-xs text-slate-400 mt-1">{status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ApplicationsPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const { applications, loading, error, deleteApplication } = useApplications({
    status: statusFilter,
    search,
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">My Applications</h1>
        <p className="text-sm text-slate-400 mt-1">Track every opportunity in your pipeline</p>
      </div>

      {/* Stats */}
      {!loading && !error && <StatsBar applications={applications} />}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative w-full sm:w-64">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company or role..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                statusFilter === s
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700"
              }`}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      {!loading && !error && applications.length > 0 && (
        <p className="text-xs text-slate-400 mb-4">
          {applications.length} application{applications.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100" />
                <div className="space-y-2 flex-1">
                  <div className="h-3 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
              <div className="h-3 bg-slate-100 rounded w-1/3" />
              <div className="h-8 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center">
          <p className="text-red-600 font-medium text-sm">Could not load applications</p>
          <p className="text-red-400 text-xs mt-1">{error}</p>
          <p className="text-slate-400 text-xs mt-3">Make sure the backend server is running on port 5001</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && applications.length === 0 && (
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4 text-2xl">📋</div>
          <p className="font-medium text-slate-700">No applications yet</p>
          <p className="text-sm text-slate-400 mt-1">Use the navbar to add your first application</p>
        </div>
      )}

      {/* Cards grid */}
      {!loading && !error && applications.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} onDelete={deleteApplication} />
          ))}
        </div>
      )}
    </div>
  );
}
