import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function ProjectsContainer({
  sortBy,
  searchValue,
  craftedMaterials = []
}) {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await api.get("/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.log("Error loading projects", err);
      }
    }

    loadProjects();
  }, []);

  const crafted = craftedMaterials.map(m => m.toLowerCase());

  const terms = searchValue
    .split(",")
    .map(t => t.trim().toLowerCase())
    .filter(Boolean);

  const filteredProjects = projects.filter(project => {
    const title = (project.title || "").toLowerCase();
    const desc = (project.description || "").toLowerCase();
    const materials = (project.materials || [])
      .map(m => (typeof m === "string" ? m : m.name).toLowerCase());

    if (crafted.length > 0) {
      return crafted.every(mat => materials.includes(mat));
    }

    if (terms.length > 0) {
      return terms.some(term =>
        title.includes(term) ||
        desc.includes(term) ||
        materials.some(m => m.includes(term))
      );
    }

    return true;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "name") {
      return (a.title || "").localeCompare(b.title || "");
    }
    if (sortBy === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === "popular") {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  return (
    <div className="pl-5">
      <div className="mb-4">
        <p className="text-4xl font-semibold">Projects:</p>
        <hr className="border-t-2 mr-5 mt-2" />
      </div>

      {sortedProjects.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center text-center opacity-90">
          <p className="text-2xl font-semibold">
            No projects created with those materials yet
          </p>
          <p className="text-sm mt-2 opacity-80">
            Try adjusting your materials or search terms
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pr-5 mt-4 text-white">
          {sortedProjects.map(project => (
            <div
              key={project._id}
              onClick={() => navigate(`/projects/${project._id}`)}
              className="cursor-pointer rounded-xl bg-[linear-gradient(to_right,#d2541c,#8c2a0e)] shadow-lg transition hover:scale-105 overflow-hidden"
            >
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-36 w-full object-cover"
                />
              ) : (
                <div className="h-36 w-full bg-black bg-opacity-30 flex items-center justify-center text-sm opacity-70">
                  No image
                </div>
              )}

              <div className="p-4 flex flex-col gap-2">
                <p className="font-semibold text-lg leading-tight">
                  {project.title}
                </p>

                <p className="text-sm opacity-90 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-1">
                  {(project.materials || []).slice(0, 5).map((mat, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full text-xs bg-[linear-gradient(90deg,#ff880c,#ef290e)]"
                    >
                      {typeof mat === "string" ? mat : mat.name}
                    </span>
                  ))}
                </div>

                <div className="text-xs opacity-80 mt-1">
                  Rating: {project.rating || "Not rated"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
