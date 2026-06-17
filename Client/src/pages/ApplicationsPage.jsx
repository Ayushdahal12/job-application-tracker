import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApplications } from "../hooks/useApplications.js";
import ApplicationCard from "../components/ApplicationCard.jsx";
import { Send, Users, BadgeCheck, XCircle } from "lucide-react";

const STATUSES = ["", "Applied", "Interviewing", "Offer", "Rejected"];
const STATUS_LABELS = {
  "": "All",
  Applied: "Applied",
  Interviewing: "Interviewing",
  Offer: "Offer",
  Rejected: "Rejected",
};

const STATUS_ICON = {
  Applied: <Send className="w-4 h-4 text-black-500" />,
  Interviewing: <Users className="w-4 h-4 text-black-500" />,
  Offer: <BadgeCheck className="w-4 h-4 text-black-500" />,
  Rejected: <XCircle className="w-4 h-4 text-black-500" />,
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
          <div className="flex-shrink-0">
            {STATUS_ICON[status]}
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-900 leading-none">{count}</p>
            <p className="text-xs text-slate-400 mt-1">{status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Pagination({ pagination, page, setPage }) {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200">
      <p className="text-xs text-slate-400">
        Showing {(page - 1) * pagination.limit + 1}–
        {Math.min(page * pagination.limit, pagination.total)} of {pagination.total}
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={!pagination.hasPrev}
          className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Prev
        </button>

        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-8 h-8 text-xs font-medium rounded-lg border transition-colors ${p === page
                ? "bg-[#0A66C2] text-white border-[#0A66C2]"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!pagination.hasNext}
          className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default function ApplicationsPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const {
    applications,
    pagination,
    loading,
    error,
    page,
    setPage,
    deleteApplication,
  } = useApplications({ status: statusFilter, search });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#0A66C2]">My Applications</h1>
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
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${statusFilter === s
                  ? "bg-[#0A66C2] text-white border-[#0A66C2]"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700"
                }`}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      {!loading && !error && pagination && (
        <p className="text-xs text-slate-400 mb-4">
          {pagination.total} application{pagination.total !== 1 ? "s" : ""}
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
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((app) => (
              <ApplicationCard key={app.id} application={app} onDelete={deleteApplication} />
            ))}
          </div>

          <Pagination pagination={pagination} page={page} setPage={setPage} />
        </>
      )}

      <footer className="mt-50 pt-6 border-t border-slate-200 text-center">
      <p className="text-sm text-slate-500">
        Job Application Tracker © {new Date().getFullYear()}
      </p>

      <p className="text-xs text-slate-400 mt-1">
        Built by Ayush
      </p>
    </footer>
    </div>
  );
}
