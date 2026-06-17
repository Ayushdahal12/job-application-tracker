import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm.jsx";
import { api } from "../api/applications.js";

export default function AddApplicationPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.create(formData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-2xl">
        
        {/* Navigation & Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="group mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-200">
              &larr;
            </span>
            Back to dashboard
          </button>
          
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0A66C2] sm:text-4xl">
              Add New Application
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Keep your job hunt organized. Fill out the details below to track this opportunity.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 shadow-sm animate-fade-in">
            <svg className="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <span className="font-semibold">Submission failed:</span> {error}
            </div>
          </div>
        )}

        {/* Form Container Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm ring-1 ring-slate-900/5 sm:p-8">
          <ApplicationForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitLabel="Create Application"
          />
          
        </div>
         <footer className="mt-50 pt-6 border-t border-slate-200 text-center">
      <p className="text-sm text-blue-600">
        Job Application Tracker © {new Date().getFullYear()}
      </p>

      <p className="text-xs text-blue-400 mt-1">
        Built by Ayush
      </p>
    </footer>
      </div>
      
    </div>
  );
}