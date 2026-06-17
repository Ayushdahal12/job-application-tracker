import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm.jsx";
import { api } from "../api/applications.js";

export default function EditApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getById(id)
      .then((res) => setApplication(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setFetchLoading(false));
  }, [id]);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.update(id, formData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="max-w-2xl space-y-4 animate-pulse">
        <div className="h-6 bg-slate-100 rounded w-1/3" />
        <div className="card p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-3 bg-slate-100 rounded w-1/3" />
                <div className="h-10 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
          <div className="h-20 bg-slate-100 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-slate-500 hover:text-slate-800 mb-3 flex items-center gap-1 transition-colors"
        >
          ← Back to applications
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Edit Application</h1>
        {application && (
          <p className="text-sm text-slate-500 mt-0.5">
            {application.company_name} — {application.job_title}
          </p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-sm text-red-700">
          {error}
        </div>
      )}

      {application && (
        <div className="card p-6">
          <ApplicationForm
            initialData={application}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitLabel="Save Changes"
          />
        </div>
      )}
    </div>
  );
}
