import React, { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";

function TaskList({ title, fetchUrl }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fetchUrl) return;

    setLoading(true);
    setError(null);

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => setTasks(data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [fetchUrl]);

  return (
    <div style={{ padding: 16 }}>
      <h2>{title}</h2>
      {loading && <p>Loading…</p>}
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
                  id={t.id}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TaskList;
