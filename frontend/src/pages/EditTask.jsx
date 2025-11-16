import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
    assigned_user_id: "",
    due_date: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load users for dropdown
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  // Load task data
  useEffect(() => {
    fetch(`/api/tasks/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTask({
          ...data,
          due_date: data.due_date ? data.due_date.split("T")[0] : "",
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...task,
        assigned_user_id:
          task.assigned_user_id === "" ? null : Number(task.assigned_user_id),
      };

      const res = await fetch(`/api/tasks/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Update failed: ${res.status}`);

      alert("Task updated successfully!");
      navigate("/AllTasks");
    } catch (err) {
      alert("Failed to update task: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`/api/tasks/delete/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);

      alert("Task deleted.");
      navigate("/AllTasks");
    } catch (err) {
      alert("Failed to delete task: " + err.message);
    }
  };

  if (loading) return <p>Loading task...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Edit Task: {task.title}</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 500,
        }}
      >
        <label>
          Title
          <input
            name="title"
            type="text"
            value={task.title}
            onChange={handleChange}
            style={{ width: "100%", padding: 6 }}
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            style={{ width: "100%", padding: 6 }}
          />
        </label>

        <label>
          Priority
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            style={{ width: "100%", padding: 6 }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Status
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            style={{ width: "100%", padding: 6 }}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
            <option value="Closed">Closed</option>
          </select>
        </label>

        <label>
          Assigned User
          <select
            name="assigned_user_id"
            value={task.assigned_user_id || ""}
            onChange={handleChange}
            style={{ width: "100%", padding: 6 }}
          >
            <option value="">Unassigned</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>
        </label>

        <label>
          Due Date
          <input
            name="due_date"
            type="date"
            value={task.due_date}
            onChange={handleChange}
            style={{ width: "100%", padding: 6 }}
          />
        </label>
      </div>

      <button
        style={{
          marginTop: 16,
          padding: 10,
          backgroundColor: "#059669",
          color: "white",
          border: "none",
          borderRadius: 5,
        }}
        onClick={handleSave}
      >
        Save Changes
      </button>

      <button
        style={{
          marginTop: 16,
          marginLeft: 16,
          padding: 10,
          backgroundColor: "#dc2626",
          color: "white",
          border: "none",
          borderRadius: 5,
        }}
        onClick={handleDelete}
      >
        Delete Task
      </button>
    </div>
  );
}

export default EditTask;
