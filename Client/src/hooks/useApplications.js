import { useState, useEffect, useCallback } from "react";
import { api } from "../api/applications.js";

export function useApplications(filters = {}) {
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getAll({ ...filters, page, limit: 6 });
      setApplications(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters), page]);

  useEffect(() => {
    setPage(1);
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const deleteApplication = async (id) => {
    const previous = applications;
    setApplications((prev) => prev.filter((a) => a.id !== id));
    try {
      await api.delete(id);
      fetchAll();
    } catch (err) {
      setApplications(previous);
      alert("Could not delete application. Please try again.");
    }
  };

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

  return {
    applications,
    pagination,
    loading,
    error,
    page,
    setPage,
    refetch: fetchAll,
    deleteApplication,
    updateStatus,
  };
}