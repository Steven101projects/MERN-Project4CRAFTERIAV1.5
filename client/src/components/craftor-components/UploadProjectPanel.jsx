import { useEffect, useState, useContext } from "react";
import api, { uploadImage } from "../../api/api";
import { ToastContext } from "../../context/ToastContext";

export default function UploadProjectPanel({ onClose }) {
  const { showToast } = useContext(ToastContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [steps, setSteps] = useState([]);
  const [stepTitle, setStepTitle] = useState("");
  const [stepDescription, setStepDescription] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [materials, setMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const [loadingMaterials, setLoadingMaterials] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function fetchMaterials() {
    try {
      const res = await api.get("/api/materials");
      setMaterials(res.data);
    } catch (err) {
      console.error("Failed to load materials", err);
      showToast("Failed to load materials", "error");
    } finally {
      setLoadingMaterials(false);
    }
  }

  function handleMaterialSelect(e) {
    const value = e.target.value;
    if (!value) return;

    if (!selectedMaterials.includes(value)) {
      setSelectedMaterials(prev => [...prev, value]);
    }
  }

  function removeMaterial(id) {
    setSelectedMaterials(prev =>
      prev.filter(matId => matId !== id)
    );
  }

  function addStep() {
    if (!stepDescription.trim()) {
      showToast("Step description is required", "error");
      return;
    }

    setSteps(prev => [
      ...prev,
      {
        title: stepTitle.trim(),
        description: stepDescription.trim()
      }
    ]);

    setStepTitle("");
    setStepDescription("");
  }

  function removeStep(index) {
    setSteps(prev => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Project title is required");
      showToast("Project title is required", "error");
      return;
    }

    if (selectedMaterials.length === 0) {
      setError("At least one material is required");
      showToast("Select at least one material", "error");
      return;
    }

    if (steps.length === 0) {
      setError("At least one step is required");
      showToast("Add at least one step", "error");
      return;
    }

    try {
      setSubmitting(true);

      let imageUrl = "";

      if (imageFile) {
        setImageUploading(true);
        imageUrl = await uploadImage(imageFile);
        setImageUploading(false);
      }

      await api.post("/api/projects", {
        title,
        description,
        imageUrl,
        materials: selectedMaterials,
        steps
      });

      showToast("Project uploaded successfully", "success");
      onClose();
    } catch (err) {
      console.error("Failed to create project", err);
      setError("Failed to create project");
      showToast("Failed to upload project", "error");
    } finally {
      setSubmitting(false);
      setImageUploading(false);
    }
  }

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div className="p-6 rounded bg-[linear-gradient(90deg,#ff880c,#ef290e)] text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Upload Project</h2>

        <button
          onClick={onClose}
          className="px-4 py-1 rounded bg-black bg-opacity-30 hover:bg-opacity-50"
        >
          Close
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Project Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded text-black"
            placeholder="Enter project title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded text-black"
            rows={3}
            placeholder="Describe the project"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Project Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImageFile(e.target.files[0])}
            className="w-full text-sm"
          />
        </div>

        {/* Materials */}
        <div>
          <label className="block mb-1 font-medium">Materials</label>

          {loadingMaterials ? (
            <p className="opacity-80">Loading materials...</p>
          ) : (
            <select
              onChange={handleMaterialSelect}
              className="w-full px-3 py-2 rounded text-black"
              defaultValue=""
            >
              <option value="" disabled>
                Select a material
              </option>
              {materials.map(mat => (
                <option key={mat._id} value={mat._id}>
                  {mat.name}
                </option>
              ))}
            </select>
          )}

          <div className="mt-2 flex flex-wrap gap-2">
            {selectedMaterials.map(matId => {
              const mat = materials.find(m => m._id === matId);
              return (
                <span
                  key={matId}
                  className="px-3 py-1 rounded bg-black bg-opacity-30 text-xs flex items-center gap-2"
                >
                  {mat?.name || "Material"}
                  <button
                    type="button"
                    onClick={() => removeMaterial(matId)}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        {/* Steps */}
        <div className="bg-black bg-opacity-25 rounded p-4">
          <label className="block mb-2 font-medium">Steps</label>

          <input
            value={stepTitle}
            onChange={e => setStepTitle(e.target.value)}
            className="w-full px-3 py-2 rounded text-black mb-2"
            placeholder="Step title (optional)"
          />

          <textarea
            value={stepDescription}
            onChange={e => setStepDescription(e.target.value)}
            className="w-full px-3 py-2 rounded text-black mb-2"
            rows={2}
            placeholder="Step description"
          />

          <button
            type="button"
            onClick={addStep}
            className="px-4 py-1.5 rounded bg-black bg-opacity-30 hover:bg-opacity-50"
          >
            Add Step
          </button>

          <div className="mt-3 space-y-2">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-black bg-opacity-30 rounded p-2 flex justify-between items-start"
              >
                <div>
                  {step.title && (
                    <p className="font-medium">{step.title}</p>
                  )}
                  <p className="text-xs opacity-80">{step.description}</p>
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

        {error && (
          <p className="text-sm text-red-900 font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting || imageUploading}
          className="px-6 py-2 rounded bg-black bg-opacity-30 hover:bg-opacity-50 disabled:opacity-50"
        >
          {imageUploading
            ? "Uploading image..."
            : submitting
            ? "Creating project..."
            : "Create Project"}
        </button>

      </form>
    </div>
  );
}
