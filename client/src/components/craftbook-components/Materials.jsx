import { useEffect, useState } from "react";
import api from "../../api/api";

export default function MaterialsContainer({ sortBy }) {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    async function loadMaterials() {
      try {
        const res = await api.get("/api/materials");
        setMaterials(res.data);
      } catch (err) {
        console.log("Error loading materials", err);
      }
    }

    loadMaterials();
  }, []);

  const sortedMaterials = [...materials].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "popular") return (b.popular || 0) - (a.popular || 0);
    if (sortBy === "type") return (a.type || "").localeCompare(b.type || "");
    return 0;
  });

  return (
    <div className="pl-5">
      <div>
        <p className="text-4xl">Materials:</p>
        <hr className="border-t-2 mr-5 mt-2" />
      </div>

      <div className="text-white grid grid-cols-4 gap-4 pr-5 mt-4">
        {sortedMaterials.map((material, index) => (
          <div
            key={index}
            className="bg-orange-600 p-4 rounded-xl h-64 shadow"
          >
            <div className="bg-white h-20 w-full rounded mb-2"></div>

            <p className="font-semibold">{material.name}</p>

            <p className="text-sm">{material.description}</p>

            <p className="mt-2">Projects</p>

            <div className="flex flex-wrap gap-1 mt-2 ml-2">

              {(material.projects || []).map((proj, i) => (
                <p
                  key={i}
                  className="inline-block px-2 py-1 bg-[linear-gradient(90deg,#ff880c,#ef290e)] rounded-e-2xl"
                >
                  {typeof proj === "string" ? proj : proj.title}
                </p>
              ))}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
