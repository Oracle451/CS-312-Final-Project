import React, { useState, useEffect } from "react";
import "./styles.css";

function CreateTask() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "Medium",
    status: "Open", // NEW
    assigned_user_id: "",
  });
  const [success, setSuccess] = useState(false);

  // Fetch users for the assignment dropdown
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(console.error);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...form,
      assigned_user_id:
        form.assigned_user_id === "" ? null : Number(form.assigned_user_id),
    };

    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) setSuccess(true);
        else alert("Error creating task!");
      })
      .catch(() => alert("Network error"));
  }

  if (success)
    return <div style={{ padding: 32 }}>Task created successfully!</div>;

  return (
    <div
      className="create-task-container"
      style={{ maxWidth: 500, margin: "0 auto", padding: 32 }}
    >
      <h2 style={{ marginBottom: 20 }}>Create New Task</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 1 }}
      >
        <p>Title</p>
        <input
          name="title"
          type="text"
          required
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <p>Description</p>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <p>Due Date</p>
        <input
          name="due_date"
          type="date"
          value={form.due_date}
          onChange={handleChange}
        />

        <p>Priority</p>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* --- STATUS FIELD --- */}
        <p>Status</p>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
          <option value="Closed">Closed</option>
        </select>

        <p>Assigned User (optional)</p>
        <select
          name="assigned_user_id"
          value={form.assigned_user_id}
          onChange={handleChange}
        >
          <option value="">Unassigned</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>

        <button
          type="submit"
          style={{
            background: "#38bdf8",
            color: "#fff",
            padding: "12px",
            borderRadius: 5,
            border: "none",
          }}
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
