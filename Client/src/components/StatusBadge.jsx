const STATUS_CONFIG = {
  Applied: {
    label: "Applied",
    dot: "bg-[#0A66C2]",
    className: "bg-[#0A66C2]/10 text-[#0A66C2] border border-[#0A66C2]/20",
  },
  Interviewing: {
    label: "Interviewing",
    dot: "bg-[#0A66C2]",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  Offer: {
    label: "Offer",
    dot: "bg-[#0A66C2]",
    className: "bg-green-50 text-green-700 border border-green-200",
  },
  Rejected: {
    label: "Rejected",
    dot: "bg-[#0A66C2]",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
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
