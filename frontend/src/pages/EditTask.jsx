import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditTask() {
  const { id } = useParams(); // get task id from URL
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/tasks/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => setTask(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading task...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!task) return <p>Task not found.</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Edit Task: {task.title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 500 }}>
        <label>
          Title
          <input type="text" value={task.title} readOnly style={{ width: "100%", padding: 6 }} />
        </label>
        <label>
          Description
          <textarea value={task.description} readOnly style={{ width: "100%", padding: 6 }} />
        </label>
        <label>
          Priority
          <input type="text" value={task.priority} readOnly style={{ width: "100%", padding: 6 }} />
        </label>
        <label>
          Status
          <input type="text" value={task.status} readOnly style={{ width: "100%", padding: 6 }} />
        </label>
        <label>
          Assigned User ID
          <input type="text" value={task.assigned_user_id || "N/A"} readOnly style={{ width: "100%", padding: 6 }} />
        </label>
        <label>
          Due Date
          <input type="text" value={task.due_date ? new Date(task.due_date).toLocaleDateString() : "N/A"} readOnly style={{ width: "100%", padding: 6 }} />
        </label>
        <label>
          Created By
          <input type="text" value={task.created_by || "N/A"} readOnly style={{ width: "100%", padding: 6 }} />
        </label>
      </div>

      <button
        style={{ marginTop: 16, padding: 10, backgroundColor: "#0ea5e9", color: "white", border: "none", borderRadius: 5 }}
        onClick={() => navigate(`/tasks/${id}`)} // optional: go to full editable form
      >
        Edit Task
      </button>

      <button
        style={{ marginTop: 16, marginLeft: 16, padding: 10, backgroundColor: "#0ea5e9", color: "white", border: "none", borderRadius: 5 }}
        onClick={() => navigate(`/tasks/${id}`)} // optional: go to full editable form
      >
        Delete Task
      </button>
    </div>
  );
}

export default EditTask;
