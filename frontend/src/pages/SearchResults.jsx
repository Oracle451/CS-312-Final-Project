import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TaskItem from "../components/TaskItem";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const q = query.get("q") || "";
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!q) {
      setTasks([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/api/tasks/search?q=${encodeURIComponent(q)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => setTasks(data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div style={{ padding: 16 }}>
      <h2>Search Results for “{q}”</h2>
      {loading && <p>Loading results…</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <>
          {tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {tasks.map((t) => (
                <TaskItem
                  key={t.id}
                  id={t.id} // important for navigation
                  title={t.title}
                  owner={t.assigned_user_id || "Unassigned"}
                  date={t.due_date ? new Date(t.due_date).toLocaleString() : "N/A"}
                />
              ))}

            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SearchResults;
