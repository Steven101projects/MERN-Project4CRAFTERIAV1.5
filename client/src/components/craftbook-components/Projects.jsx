import { useEffect, useState } from "react";
import api from "../../api/api";

export default function ProjectsContainer({ sortBy }) {
  const [projects, setProjects] = useState([]);

  // load projects from backend
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

  // safe sorting logic
  const sortedProjects = [...projects].sort((a, b) => {
    if (sortBy === "name") return a.title.localeCompare(b.title);
    if (sortBy === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "popular") return (b.popular || 0) - (a.popular || 0);
    if (sortBy === "type") return (a.type || "").localeCompare(b.type || "");
    return 0;
  });

  return (
    <div className="pl-5">
      <div>
        <p className="text-4xl">Projects</p>
        <hr className="border-t-2 mr-5 mt-2" />
      </div>

      <div className="text-white grid grid-cols-4 gap-4 pr-5 mt-4">
        {sortedProjects.map((project, index) => (
          <div
            key={index}
            className="bg-[linear-gradient(to_right,#d2541c,#8c2a0e)] p-4 rounded-xl h-64 shadow"
          >

            {/* Placeholder image */}
            <div className="bg-white h-20 w-full rounded mb-2"></div>

            {/* Title */}
            <p className="font-semibold">{project.title}</p>

            {/* Description */}
            <p className="text-sm">{project.description}</p>

            {/* Materials */}
            <p className="mt-2">Materials:</p>

            <div className="flex flex-wrap gap-1 mt-2 ml-2">

              {(project.materials || []).map((mat, i) => (
                <p
                  key={i}
                  className="inline-block px-2 py-1 bg-[linear-gradient(90deg,#ff880c,#ef290e)] rounded-e-2xl"
                >
                  {typeof mat === "string" ? mat : mat.name}
                </p>
              ))}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
