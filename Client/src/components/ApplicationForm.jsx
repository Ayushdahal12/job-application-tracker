import { useState, useRef, useEffect } from "react";

const STATUSES = ["Applied", "Interviewing", "Offer", "Rejected"];
const JOB_TYPES = ["Internship", "FullTime", "PartTime"];
const JOB_TYPE_LABELS = { Internship: "Internship", FullTime: "Full-time", PartTime: "Part-time" };

// Sample preset lists - you can also pass these down as props from your database!
const SUGGESTED_COMPANIES = ["Google", "Microsoft", "Apple", "Amazon", "Netflix", "Meta", "Stripe", "Airbnb"];
const SUGGESTED_TITLES = ["Software Engineer", "Frontend Engineer", "Backend Engineer", "Fullstack Engineer", "Product Manager", "UI/UX Designer", "Data Scientist"];

const STATUS_COLORS = {
  Applied: "peer-checked:bg-[#0A66C2]/10 peer-checked:text-[#0A66C2] peer-checked:ring-[#0A66C2]/20 text-slate-600 hover:bg-slate-50",
  Interviewing: "peer-checked:bg-amber-50 peer-checked:text-amber-700 peer-checked:ring-amber-600/20 text-slate-600 hover:bg-slate-50",
  Offer: "peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:ring-emerald-600/20 text-slate-600 hover:bg-slate-50",
  Rejected: "peer-checked:bg-amber-50 peer-checked:text-amber-700 peer-checked:ring-amber-600/20 text-slate-600 hover:bg-slate-50",
};

export default function ApplicationForm({ initialData = {}, onSubmit, isLoading, submitLabel = "Save Application" }) {
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
  
  // Dropdown visibility states
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);

  const companyRef = useRef(null);
  const titleRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (companyRef.current && !companyRef.current.contains(event.target)) setShowCompanyDropdown(false);
      if (titleRef.current && !titleRef.current.contains(event.target)) setShowTitleDropdown(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    
    // Open respective dropdown on type
    if (name === "company_name") setShowCompanyDropdown(true);
    if (name === "job_title") setShowTitleDropdown(true);
  };

  const handleSelectOption = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (name === "company_name") setShowCompanyDropdown(false);
    if (name === "job_title") setShowTitleDropdown(false);
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

  // Filter lists based on what user has typed
  const filteredCompanies = SUGGESTED_COMPANIES.filter(c => 
    c.toLowerCase().includes(form.company_name.toLowerCase())
  );

  const filteredTitles = SUGGESTED_TITLES.filter(t => 
    t.toLowerCase().includes(form.job_title.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* Company Name with Autocomplete/Custom Entry */}
        <div className="relative" ref={companyRef}>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            onFocus={() => setShowCompanyDropdown(true)}
            placeholder="e.g. Google"
            autoComplete="off"
            className={`w-full px-3.5 py-2.5 text-sm bg-slate-50/50 rounded-xl border transition-all placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2
              ${errors.company_name 
                ? "border-red-300 bg-red-50/30 focus:ring-red-500/20 focus:border-red-500" 
                : "border-slate-200 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2]"}`}
          />
          {errors.company_name && (
            <p className="text-xs font-medium text-red-500 mt-1.5">⚠ {errors.company_name}</p>
          )}

          {/* Company Dropdown Menu */}
          {showCompanyDropdown && (filteredCompanies.length > 0 || form.company_name.trim()) && (
            <div className="absolute z-10 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto p-1.5 space-y-0.5">
              {filteredCompanies.map((company) => (
                <button
                  key={company}
                  type="button"
                  onClick={() => handleSelectOption("company_name", company)}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                >
                  {company}
                </button>
              ))}
              {/* Custom Value Indicator */}
              {form.company_name && !SUGGESTED_COMPANIES.includes(form.company_name) && (
                <button
                  type="button"
                  onClick={() => setShowCompanyDropdown(false)}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg bg-indigo-50/50 text-indigo-600 font-semibold border border-dashed border-indigo-200"
                >
                  Plus: Add "{form.company_name}" as custom company
                </button>
              )}
            </div>
          )}
        </div>

        {/* Job Title with Autocomplete/Custom Entry */}
        <div className="relative" ref={titleRef}>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="job_title"
            value={form.job_title}
            onChange={handleChange}
            onFocus={() => setShowTitleDropdown(true)}
            placeholder="e.g. Software Engineer"
            autoComplete="off"
            className={`w-full px-3.5 py-2.5 text-sm bg-slate-50/50 rounded-xl border transition-all placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2
              ${errors.job_title 
                ? "border-red-300 bg-red-50/30 focus:ring-red-500/20 focus:border-red-500" 
                : "border-slate-200 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2]"}`}
          />
          {errors.job_title && (
            <p className="text-xs font-medium text-red-500 mt-1.5">⚠ {errors.job_title}</p>
          )}

          {/* Job Title Dropdown Menu */}
          {showTitleDropdown && (filteredTitles.length > 0 || form.job_title.trim()) && (
            <div className="absolute z-10 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto p-1.5 space-y-0.5">
              {filteredTitles.map((title) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => handleSelectOption("job_title", title)}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                >
                  {title}
                </button>
              ))}
              {/* Custom Value Indicator */}
              {form.job_title && !SUGGESTED_TITLES.includes(form.job_title) && (
                <button
                  type="button"
                  onClick={() => setShowTitleDropdown(false)}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] font-semibold border border-dashed border-[#0A66C2]/20"
                >
                  Plus: Add "{form.job_title}" as custom role
                </button>
              )}
            </div>
          )}
        </div>

        {/* Applied Date */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Applied Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="applied_date"
            value={form.applied_date}
            onChange={handleChange}
            className={`w-full sm:w-1/2 px-3.5 py-2.5 text-sm bg-slate-50/50 rounded-xl border transition-all focus:outline-none focus:bg-white focus:ring-2
              ${errors.applied_date 
                ? "border-red-300 bg-red-50/30 focus:ring-red-500/20 focus:border-red-500" 
                : "border-slate-200 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2]"}`}
          />
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Job Type Selectors */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">Job Type</label>
        <div className="grid grid-cols-3 gap-2">
          {JOB_TYPES.map((type) => (
            <label key={type} className="cursor-pointer">
              <input
                type="radio"
                name="job_type"
                value={type}
                checked={form.job_type === type}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-full text-center py-2.5 text-xs font-semibold rounded-xl border border-slate-200 text-slate-600 transition-all bg-white peer-checked:bg-[#0A66C2] peer-checked:text-white peer-checked:border-[#0A66C2] hover:bg-slate-50">
                {JOB_TYPE_LABELS[type]}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Status Selectors */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">Application Status</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STATUSES.map((status) => (
            <label key={status} className="cursor-pointer">
              <input
                type="radio"
                name="status"
                value={status}
                checked={form.status === status}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className={`w-full text-center py-2.5 text-xs font-bold rounded-xl border border-slate-200 ring-offset-1 transition-all bg-white peer-checked:ring-2 ${STATUS_COLORS[status]}`}>
                {status}
              </div>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Notes */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Add interview notes, referrals, or salary details..."
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 rounded-xl border border-slate-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2] transition-all resize-none placeholder:text-slate-400"
        />
      </div>

      {/* Action Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-xl text-white bg-[#0A66C2] hover:bg-[#0A66C2]/90 focus:ring-4 focus:ring-[#0A66C2]/10 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-sm"
        >
          {isLoading && (
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {isLoading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}