import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function ManageProjectsPanel({ onClose }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchProjects() {
    try {
      const res = await api.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(projectId) {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await api.delete(`/api/projects/${projectId}`);
      setProjects(prev =>
        prev.filter(project => project._id !== projectId)
      );
    } catch (err) {
      console.error("Failed to delete project", err);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6 rounded bg-[linear-gradient(90deg,#ff880c,#ef290e)] text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Manage Projects
        </h2>

        <button
          onClick={onClose}
          className="px-4 py-1 rounded bg-black bg-opacity-30 hover:bg-opacity-50"
        >
          Close
        </button>
      </div>

      {/* Loading states */}
      {loading && (
        <p className="text-sm opacity-80">
          Loading projects...
        </p>
      )}

      {!loading && projects.length === 0 && (
        <p className="text-sm opacity-80">
          No projects found.
        </p>
      )}

      {/* Project list */}
      <div className="space-y-4 text-sm mt-4">
        {projects.map(project => (
          <div
            key={project._id}
            className="rounded bg-black bg-opacity-20 p-4 flex flex-col gap-3"
          >
            <span className="font-semibold text-base">
              {project.title || "Untitled Project"}
            </span>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  navigate(`/craftor/projects/edit/${project._id}`)
                }
                className="px-4 py-1.5 rounded bg-black bg-opacity-30 hover:bg-opacity-50"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(project._id)}
                className="px-4 py-1.5 rounded bg-red-700 hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
