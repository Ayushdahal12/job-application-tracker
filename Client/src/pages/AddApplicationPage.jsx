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
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-slate-500 hover:text-slate-800 mb-3 flex items-center gap-1 transition-colors"
        >
          ← Back to applications
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Add Application</h1>
        <p className="text-sm text-slate-500 mt-0.5">Track a new job opportunity</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="card p-6">
        <ApplicationForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitLabel="Add Application"
        />
      </div>
    </div>
  );
}
