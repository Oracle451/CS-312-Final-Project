import React from "react";
import { useLocation } from "react-router-dom";
import TaskList from "./TaskList";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const q = query.get("q") || "";

  return (
    <TaskList
      title={`Search Results for "${q}"`}
      fetchUrl={`/api/tasks/search?q=${encodeURIComponent(q)}`}
    />
  );
}

export default SearchResults;
