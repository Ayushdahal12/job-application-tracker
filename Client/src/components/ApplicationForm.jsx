import { useState } from "react";

const STATUSES = ["Applied", "Interviewing", "Offer", "Rejected"];
const JOB_TYPES = ["Internship", "FullTime", "PartTime"];
const JOB_TYPE_LABELS = { Internship: "Internship", FullTime: "Full-time", PartTime: "Part-time" };

export default function ApplicationForm({ initialData = {}, onSubmit, isLoading, submitLabel = "Save" }) {
  const [form, setForm] = useState({
    company_name: initialData.company_name || "",
    job_title: initialData.job_title || "",
    job_type: initialData.job_type || "Internship",
    status: initialData.status || "Applied",
    applied_date: initialData.applied_date
      ? new Date(initialData.applied_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    notes: initialData.notes || "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.company_name.trim()) e.company_name = "Company name is required";
    if (!form.job_title.trim()) e.job_title = "Job title is required";
    if (!form.applied_date) e.applied_date = "Applied date is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Company Name */}
        <div>
          <label className="form-label">
            Company Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            placeholder="e.g. Google"
            className={`form-input ${errors.company_name ? "border-red-400 ring-1 ring-red-400" : ""}`}
          />
          {errors.company_name && (
            <p className="text-xs text-red-500 mt-1">{errors.company_name}</p>
          )}
        </div>

        {/* Job Title */}
        <div>
          <label className="form-label">
            Job Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="job_title"
            value={form.job_title}
            onChange={handleChange}
            placeholder="e.g. Software Engineer Intern"
            className={`form-input ${errors.job_title ? "border-red-400 ring-1 ring-red-400" : ""}`}
          />
          {errors.job_title && (
            <p className="text-xs text-red-500 mt-1">{errors.job_title}</p>
          )}
        </div>

        {/* Job Type */}
        <div>
          <label className="form-label">Job Type</label>
          <select name="job_type" value={form.job_type} onChange={handleChange} className="form-input">
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {JOB_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="form-label">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="form-input">
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Applied Date */}
        <div>
          <label className="form-label">
            Applied Date <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            name="applied_date"
            value={form.applied_date}
            onChange={handleChange}
            className={`form-input ${errors.applied_date ? "border-red-400 ring-1 ring-red-400" : ""}`}
          />
          {errors.applied_date && (
            <p className="text-xs text-red-500 mt-1">{errors.applied_date}</p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="form-label">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any notes about this application..."
          className="form-input resize-none"
        />
      </div>

      <div className="pt-2">
        <button type="submit" disabled={isLoading} className="btn-primary w-full sm:w-auto">
          {isLoading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
