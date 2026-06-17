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

  const deleteApplication = async (id) => {
    await api.delete(id);
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  return { applications, loading, error, refetch: fetchAll, deleteApplication };
}
