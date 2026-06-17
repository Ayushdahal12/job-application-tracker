const STATUS_CONFIG = {
  Applied: {
    label: "Applied",
    dot: "bg-blue-400",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  Interviewing: {
    label: "Interviewing",
    dot: "bg-amber-400",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  Offer: {
    label: "Offer",
    dot: "bg-green-400",
    className: "bg-green-50 text-green-700 border border-green-200",
  },
  Rejected: {
    label: "Rejected",
    dot: "bg-red-400",
    className: "bg-red-50 text-red-700 border border-red-200",
  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG["Applied"];
  return (
    <span className={`status-badge ${config.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

export { STATUS_CONFIG };
