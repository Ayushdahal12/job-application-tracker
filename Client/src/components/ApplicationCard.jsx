import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge.jsx";

const JOB_TYPE_LABEL = {
  Internship: "Internship",
  FullTime: "Full-time",
  PartTime: "Part-time",
};

export default function ApplicationCard({ application, onDelete }) {
  const navigate = useNavigate();

  const formattedDate = new Date(application.applied_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        {/* Company initials avatar */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500 shrink-0">
            {application.company_name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">{application.company_name}</h3>
            <p className="text-sm text-slate-500 truncate">{application.job_title}</p>
          </div>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="bg-slate-100 px-2 py-1 rounded font-medium">
          {JOB_TYPE_LABEL[application.job_type] || application.job_type}
        </span>
        <span>Applied {formattedDate}</span>
      </div>

      {application.notes && (
        <p className="text-xs text-slate-500 line-clamp-2 border-t border-slate-100 pt-3">
          {application.notes}
        </p>
      )}

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => navigate(`/edit/${application.id}`)}
          className="btn-secondary text-xs py-1.5 px-3 flex-1"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (window.confirm(`Delete application to ${application.company_name}?`)) {
              onDelete(application.id);
            }
          }}
          className="btn-danger text-xs py-1.5 px-3"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
