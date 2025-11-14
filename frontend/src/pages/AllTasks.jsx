import TaskList from "./TaskList";

export default function AllTasks() {
  return <TaskList title="All Tasks" fetchUrl="/api/tasks/AllTasks" />;
} 