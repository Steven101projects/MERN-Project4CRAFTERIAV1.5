import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import CraftSideBar from "../components/CraftSideBar";

export default function Craftlist() {
  const { loggedIn } = useContext(AuthContext);

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  function addNote() {
    if (!newNote.trim()) return;

    setNotes(prev => [
      {
        id: Date.now(),
        text: newNote.trim()
      },
      ...prev
    ]);

    setNewNote("");
  }

  function deleteNote(id) {
    setNotes(prev => prev.filter(note => note.id !== id));
  }

  return (
    <div className="flex min-h-screen">

      {loggedIn && <CraftSideBar />}

      <div className="flex-grow m-6 text-white">

        {/* ONE MAIN CONTAINER */}
        <div className="rounded-xl p-8  bg-[linear-gradient(to_right,#d2541c,#8c2a0e)] space-y-10">

          {/* Page header */}
          <div>
            <h1 className="text-4xl font-semibold mb-2">
              Craftlist
            </h1>
            <p className="opacity-80 max-w-2xl">
              Collect ideas, jot down notes, and plan your next craft in one place.
            </p>
          </div>

          {/* Notes section */}
<section className="rounded-xl bg-[linear-gradient(90deg,#ff880c,#ef290e)] bg-opacity-20 p-6">
  <h2 className="text-2xl font-semibold mb-4">
    Quick Notes
  </h2>

  {/* Note input */}
  <div className="mb-6">
    <textarea
      value={newNote}
      onChange={e => setNewNote(e.target.value)}
      placeholder="Write a note or idea..."
      rows={3}
      className="
        w-full rounded-lg p-4 text-black resize-none
        focus:outline-none focus:ring-2 focus:ring-orange-500
      "
    />

    <div className="flex justify-end mt-2">
      <button
        onClick={addNote}
        className="px-6 py-2 rounded-lg bg-black bg-opacity-30 hover:bg-opacity-50"
      >
        Add Note
      </button>
    </div>
  </div>

  {/* Notes grid */}
  {notes.length === 0 && (
    <p className="opacity-70 text-sm">
      No notes yet. Jot down ideas as you browse projects.
    </p>
  )}

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {notes.map(note => (
      <div
        key={note.id}
        className="
          relative rounded-lg p-4
          bg-yellow-100 text-black
          shadow-md
        "
      >
        {/* Top bar */}
        <div className="mb-2 flex items-center justify-between text-xs opacity-60">
          <span>Note</span>
          <button
            onClick={() => deleteNote(note.id)}
            className="hover:opacity-100"
          >
            ✕
          </button>
        </div>

        {/* Note body */}
        <p className="text-sm whitespace-pre-wrap leading-relaxed">
          {note.text}
        </p>
      </div>
    ))}
  </div>
</section>


          {/* Coming soon section */}
          <section className="rounded-xl bg-black bg-opacity-20 p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Coming Soon
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="rounded-lg bg-black bg-opacity-25 p-4">
                <h3 className="font-semibold mb-1">
                  Saved Projects
                </h3>
                <p className="text-sm opacity-80">
                  Save and organize your favorite projects in one place.
                </p>
              </div>

              <div className="rounded-lg bg-black bg-opacity-25 p-4">
                <h3 className="font-semibold mb-1">
                  Pinned Craftlists
                </h3>
                <p className="text-sm opacity-80">
                  Pin important collections so they stay at the top.
                </p>
              </div>

            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
