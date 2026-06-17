import { STATUS_CONFIG } from "./StatusBadge.jsx";

const STATUS_ORDER = ["Applied", "Interviewing", "Offer", "Rejected"];

export default function StatsBar({ applications }) {
  const counts = STATUS_ORDER.reduce((acc, s) => {
    acc[s] = applications.filter((a) => a.status === s).length;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {STATUS_ORDER.map((status) => {
        const config = STATUS_CONFIG[status];
        return (
          <div key={status} className="card px-4 py-3 flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
            <div>
              <p className="text-2xl font-bold text-slate-800 leading-none">{counts[status]}</p>
              <p className="text-xs text-slate-500 mt-0.5">{config.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
