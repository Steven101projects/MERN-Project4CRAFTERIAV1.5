import { useState } from "react";
import api from "../api/api";

export default function ProjectFeedback({
  project,
  setProject,
  loggedIn
}) {
  const [newComment, setNewComment] = useState("");

  function getAverageRating() {
    if (!project.ratings || project.ratings.length === 0) return null;

    const sum = project.ratings.reduce(
      (total, r) => total + r.value,
      0
    );

    return (sum / project.ratings.length).toFixed(1);
  }

  async function handleAddComment() {
    if (!newComment.trim()) return;

    try {
      const res = await api.post(
        `/api/projects/${project._id}/comments`,
        { text: newComment }
      );

      setProject(prev => ({
        ...prev,
        comments: res.data
      }));

      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  }

  const avgRating = getAverageRating();

  return (
    <div className="rounded-xl bg-[linear-gradient(90deg,#ff880c,#ef290e)] p-8">

      <h2 className="text-3xl font-bold mb-4">
        Ratings and Comments
      </h2>

      {/* Rating summary */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-yellow-400 text-xl">
          ★★★★★
        </div>

        {avgRating ? (
          <span className="opacity-80 text-sm">
            {avgRating} average ({project.ratings.length} ratings)
          </span>
        ) : (
          <span className="opacity-80 text-sm">
            No ratings yet
          </span>
        )}
      </div>

      {/* Comments */}
      <div className="space-y-4 mb-6">
        {(project.comments || []).length === 0 && (
          <p className="opacity-70 text-sm">
            No comments yet. Be the first to comment.
          </p>
        )}

        {(project.comments || []).map((c, i) => (
          <div
            key={i}
            className="bg-black bg-opacity-30 rounded-lg p-4"
          >
            <p className="font-semibold">
              {c.username || "Anonymous"}
            </p>
            <p className="opacity-80 text-sm mt-1">
              {c.text}
            </p>
          </div>
        ))}
      </div>

      {/* Add comment */}
      {loggedIn && (
        <div className="flex flex-col gap-3">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 rounded bg-black bg-opacity-40 text-white resize-none outline-none"
            rows={3}
          />

          <button
            onClick={handleAddComment}
            className="self-end px-6 py-2 rounded-full bg-[linear-gradient(90deg,#d2541c,#8c2a0e)] hover:opacity-90"
          >
            Post comment
          </button>
        </div>
      )}

    </div>
  );
}
