import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext.jsx";
import CraftSideBar from "../components/CraftSideBar";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const profileRes = await api.get("/api/users/me");
        setUser(profileRes.data);

        const projectsRes = await api.get("/api/projects");

const myProjects = projectsRes.data.filter(
  p =>
    (p.userId && p.userId._id === profileRes.data._id) ||
    p.createdBy === profileRes.data.name
);
console.log(projectsRes.data)

        setProjects(myProjects);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-white">
        Profile not available.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">

      {loggedIn && <CraftSideBar />}

      <div className="flex-grow m-6 text-white">

        {/* PROFILE HEADER */}
        <div className="rounded-xl p-6 mb-10 bg-[linear-gradient(90deg,#ff880c,#ef290e)]">
          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-black bg-opacity-30 flex items-center justify-center text-3xl font-semibold">
              {user.name?.charAt(0)}
            </div>

            <div>
              <h1 className="text-3xl font-semibold">
                {user.name}
              </h1>

              <p className="text-sm opacity-80">
                {user.email}
              </p>

              <p className="text-xs opacity-70 mt-1">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

          </div>
        </div>

        {/* MY PROJECTS */}
        <div className="rounded-xl p-6 bg-[linear-gradient(90deg,#ff880c,#ef290e)]">

          <h2 className="text-2xl font-semibold mb-6">
            Your Projects
          </h2>

          {projects.length === 0 && (
            <p className="opacity-80">
              You have not created any projects yet.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.map(project => (
              <div
                key={project._id}
                onClick={() => navigate(`/projects/${project._id}`)}
                className="cursor-pointer rounded-xl bg-black bg-opacity-25 p-4 hover:bg-opacity-35 transition"
              >

                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="mb-3 h-40 w-full rounded object-cover"
                  />
                )}

                <h3 className="text-lg font-semibold mb-1">
                  {project.title}
                </h3>

                {project.description && (
                  <p className="text-sm opacity-80 mb-3 line-clamp-3">
                    {project.description}
                  </p>
                )}

                {project.materials?.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-xs">
                    {project.materials.map(mat => (
                      <span
                        key={mat._id}
                        className="px-3 py-1 rounded-full bg-[linear-gradient(90deg,#d2541c,#8c2a0e)]"
                      >
                        {mat.name}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}
