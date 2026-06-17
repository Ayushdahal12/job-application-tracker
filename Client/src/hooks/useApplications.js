import { useState, useEffect, useCallback } from "react";
import { api } from "../api/applications.js";

export function useApplications(filters = {}) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getAll(filters);
      setApplications(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Optimistic delete — removes card instantly, rolls back if server fails
  const deleteApplication = async (id) => {
    const previous = applications;
    setApplications((prev) => prev.filter((a) => a.id !== id));
    try {
      await api.delete(id);
    } catch (err) {
      setApplications(previous);
      alert("Could not delete application. Please try again.");
    }
  };

  // Optimistic status update — updates badge instantly, rolls back if server fails
  const updateStatus = async (id, newStatus) => {
    const previous = applications;
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    try {
      await api.update(id, { status: newStatus });
    } catch (err) {
      setApplications(previous);
      alert("Could not update status. Please try again.");
    }
  };

  return { applications, loading, error, refetch: fetchAll, deleteApplication, updateStatus };
}