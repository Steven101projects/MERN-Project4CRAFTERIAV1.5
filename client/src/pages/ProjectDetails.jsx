import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext.jsx";
import CraftSideBar from "../components/CraftSideBar";
import ProjectFeedback from "./ProjectFeedback.jsx";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);

  const [project, setProject] = useState(null);

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await api.get(`/api/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error("Failed to load project", err);
      }
    }

    loadProject();
  }, [id]);

  if (!project) {
    return <p className="p-10 text-white">Loading project...</p>;
  }

  return (
    <div className="flex">
      {loggedIn && <CraftSideBar />}

      <div className="flex-grow m-5 text-white">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* PROJECT BLOCK */}
          <div className="rounded-xl bg-[linear-gradient(90deg,#ff880c,#ef290e)] p-8">

            {/* Banner */}
            <div className="mb-8">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-[260px] object-cover rounded-xl shadow-lg"
                />
              ) : (
                <div className="w-full h-[160px] rounded-xl bg-black bg-opacity-30 flex items-center justify-center opacity-70">
                  No image available
                </div>
              )}
            </div>

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold">
                  {project.title}
                </h1>

                <p className="opacity-80 mt-2 max-w-3xl">
                  {project.description}
                </p>

                <p className="mt-3 text-sm opacity-80">
                  Crafted by{" "}
                  <span className="font-semibold">
                    {project.createdBy || "TheCreator"}
                  </span>
                </p>
              </div>

              <button
                onClick={() => navigate("/craftbook")}
                className="px-6 py-2 rounded-full bg-[linear-gradient(90deg,#d2541c,#8c2a0e)] hover:opacity-90"
              >
                Go back
              </button>
            </div>

            {/* Materials */}
            <div className="mb-8">
              <h2 className="text-2xl mb-3">Materials:</h2>
              <div className="flex flex-wrap gap-2">
                {(project.materials || []).map((mat, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm bg-[linear-gradient(90deg,#d2541c,#8c2a0e)]"
                  >
                    {typeof mat === "string" ? mat : mat.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div>
              <h2 className="text-2xl mb-4">Steps:</h2>

              <div className="space-y-4">
                {(project.steps || []).map((step, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-black bg-opacity-25 p-4"
                  >
                    {step.title && (
                      <p className="font-semibold mb-1">
                        Step {i + 1}: {step.title}
                      </p>
                    )}

                    <p className="text-sm opacity-90">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SAME LOCATION AS BEFORE */}
          <ProjectFeedback
            project={project}
            setProject={setProject}
            loggedIn={loggedIn}
          />

        </div>
      </div>
    </div>
  );
}
