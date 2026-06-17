import { useNavigate } from "react-router-dom";

const JOB_TYPE_LABEL = {
  Internship: "Internship",
  FullTime: "Full-time",
  PartTime: "Part-time",
};
const STATUS_STYLES = {
  Applied: "bg-[#0A66C2] text-white",
  Interviewing: "bg-[#0A66C2] text-white",
  Offer: "bg-[#0A66C2] text-white",
  Rejected: "bg-slate-300 text-black",
};

export default function ApplicationCard({ application, onDelete }) {
  const navigate = useNavigate();

  const formattedDate = new Date(application.applied_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white border border-[#0A66C2]/20 rounded-xl p-4 flex flex-col gap-3 hover:border-slate-300 transition-colors">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-[#0A66C2]/2 flex items-center justify-center text-xs font-semibold text-[#0A66C2] flex-shrink-0 border border-slate-200">
            {application.company_name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-black text-sm truncate">{application.company_name}</p>
            <p className="text-xs text-slate-400 truncate mt-0.5">{application.job_title}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1  rounded-full flex-shrink-0 ${STATUS_STYLES[application.status]}`}>
          {application.status}
        </span>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-white bg-blue-600 px-2 py-0.5 rounded font-semibold">
          {JOB_TYPE_LABEL[application.job_type]}
        </span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {formattedDate}
        </span>
      </div>

      {/* Notes */}
      {application.notes && (
        <p className="text-xs text-slate-400 border-t border-slate-100 pt-3 line-clamp-2 leading-relaxed">
          {application.notes}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2 border-t border-slate-100 pt-3">
        <button
          onClick={() => navigate(`/edit/${application.id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-2 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit
        </button>
        <button
          onClick={() => {
            if (window.confirm(`Delete application to ${application.company_name}?`)) {
              onDelete(application.id);
            }
          }}
          className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="3,6 5,6 21,6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6M9 6V4h6v2" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}
