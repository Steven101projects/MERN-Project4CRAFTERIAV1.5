import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import api, { uploadImage } from "../api/api";
import { ToastContext } from "../context/ToastContext";
import CraftSideBar from "../components/CraftSideBar";

export default function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const [project, setProject] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [materials, setMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const [steps, setSteps] = useState([]);
  const [stepTitle, setStepTitle] = useState("");
  const [stepDescription, setStepDescription] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const projectRes = await api.get(`/api/projects/${id}`);
        const materialsRes = await api.get("/api/materials");

        const p = projectRes.data;

        setProject(p);
        setTitle(p.title || "");
        setDescription(p.description || "");
        setImageUrl(p.imageUrl || "");
        setSelectedMaterials(p.materials?.map(m => m._id) || []);
        setSteps(p.steps || []);
        setMaterials(materialsRes.data);
      } catch {
        showToast("Failed to load project", "error");
      }
    }

    loadData();
  }, [id]);

  function handleMaterialSelect(e) {
    const value = e.target.value;
    if (!value || selectedMaterials.includes(value)) return;
    setSelectedMaterials(prev => [...prev, value]);
  }

  function removeMaterial(id) {
    setSelectedMaterials(prev => prev.filter(m => m !== id));
  }

  function addStep() {
    if (!stepDescription.trim()) {
      showToast("Step description is required", "error");
      return;
    }

    setSteps(prev => [
      ...prev,
      { title: stepTitle.trim(), description: stepDescription.trim() }
    ]);

    setStepTitle("");
    setStepDescription("");
  }

  function removeStep(index) {
    setSteps(prev => prev.filter((_, i) => i !== index));
  }

  async function handleSave(e) {
    e.preventDefault();

    if (!title.trim()) {
      showToast("Title is required", "error");
      return;
    }

    if (selectedMaterials.length === 0) {
      showToast("Select at least one material", "error");
      return;
    }

    if (steps.length === 0) {
      showToast("Add at least one step", "error");
      return;
    }

    try {
      setSaving(true);

      let finalImageUrl = imageUrl;
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      await api.put(`/api/projects/${id}`, {
        title,
        description,
        imageUrl: finalImageUrl,
        materials: selectedMaterials,
        steps
      });

      showToast("Project updated", "success");
      navigate("/craftor");
    } catch {
      showToast("Failed to update project", "error");
    } finally {
      setSaving(false);
    }
  }

  if (!project) {
    return <p className="p-8 text-white">Loading project...</p>;
  }

  return (
    <div className="flex min-h-screen">
      {loggedIn && <CraftSideBar />}

      <div className="flex-grow m-6 text-white bg-[linear-gradient(to_right,#d2541c,#8c2a0e)] p-8 rounded-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-semibold">
            Project Editor:
          </h1>

          <button
            onClick={() => navigate("/craftor")}
            className="px-6 py-2 rounded-lg bg-orange-700 hover:bg-red-800 transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Editor card */}
        <div className="max-w-4xl bg-gradient-to-br from-orange-400 to-orange-600 p-6 rounded-xl shadow-lg">

          <form onSubmit={handleSave} className="space-y-5 text-sm">

            {/* Title */}
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded text-black"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded text-black"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block mb-1 font-medium">Project Image</label>
              {imageUrl && (
                <img
                  src={imageUrl}
                  className="mb-2 max-h-48 rounded object-cover"
                />
              )}
              <input
                type="file"
                onChange={e => setImageFile(e.target.files[0])}
              />
            </div>

            {/* Materials */}
            <div>
              <label className="block mb-1 font-medium">Materials</label>
              <select
                onChange={handleMaterialSelect}
                defaultValue=""
                className="w-full px-3 py-2 rounded text-black"
              >
                <option value="" disabled>
                  Add material
                </option>
                {materials.map(mat => (
                  <option key={mat._id} value={mat._id}>
                    {mat.name}
                  </option>
                ))}
              </select>

              <div className="mt-2 flex flex-wrap gap-2">
                {selectedMaterials.map(id => {
                  const mat = materials.find(m => m._id === id);
                  return (
                    <span
                      key={id}
                      className="px-3 py-1 rounded bg-black bg-opacity-30 text-xs flex gap-2"
                    >
                      {mat?.name}
                      <button type="button" onClick={() => removeMaterial(id)}>
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Steps */}
            <div className="rounded bg-black bg-opacity-25 p-4">
              <label className="block mb-2 font-medium">Steps</label>

              <input
                value={stepTitle}
                onChange={e => setStepTitle(e.target.value)}
                placeholder="Step title optional"
                className="w-full mb-2 px-3 py-2 rounded text-black"
              />

              <textarea
                value={stepDescription}
                onChange={e => setStepDescription(e.target.value)}
                placeholder="Step description"
                rows={2}
                className="w-full mb-2 px-3 py-2 rounded text-black"
              />

              <button
                type="button"
                onClick={addStep}
                className="px-4 py-1 rounded bg-black bg-opacity-30 hover:bg-opacity-50"
              >
                Add Step
              </button>

              <div className="mt-3 space-y-2">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="p-2 rounded bg-black bg-opacity-30 flex justify-between"
                  >
                    <div>
                      {step.title && (
                        <p className="font-medium">{step.title}</p>
                      )}
                      <p className="text-xs opacity-80">
                        {step.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeStep(i)}
                      className="text-xs opacity-80"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/craftor")}
                className="px-4 py-2 rounded bg-black bg-opacity-30"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 rounded bg-black bg-opacity-50 hover:bg-opacity-70 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
