import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import CraftSideBar from "../components/CraftSideBar";

export default function CraftMedia() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen text-white">

      {loggedIn && <CraftSideBar />}

<div className="flex-grow m-6">

  <div className="mx-auto max-w-5xl rounded-xl p-8 bg-[linear-gradient(90deg,#ff880c,#ef290e)]">

    {/* Trailer header */}
    <div className="mb-8 max-w-3xl">
      <h1 className="text-5xl font-semibold mb-4">
        CraftMedia
      </h1>

      <p className="text-lg opacity-90 leading-relaxed">
        A new way for crafters to connect, share progress, and inspire each other.
      </p>
    </div>

    {/* Trailer content */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

      <div className="rounded-xl bg-black bg-opacity-25 p-5">
        <h2 className="text-2xl font-semibold mb-2">
          Not just social media
        </h2>

        <p className="text-sm opacity-80 leading-relaxed">
          CraftMedia is built for makers. Share builds in progress, finished pieces,
          techniques, and experiments without the noise of traditional platforms.
        </p>
      </div>

      <div className="rounded-xl bg-black bg-opacity-25 p-5">
        <h2 className="text-2xl font-semibold mb-2">
          Built around creativity
        </h2>

        <p className="text-sm opacity-80 leading-relaxed">
          Follow creators, discover projects, leave feedback, and document your
          crafting journey in a space designed for hands on creativity.
        </p>
      </div>

      <div className="rounded-xl bg-black bg-opacity-25 p-5">
        <h2 className="text-2xl font-semibold mb-2">
          Progress over perfection
        </h2>

        <p className="text-sm opacity-80 leading-relaxed">
          Share rough drafts, failures, and learning moments.
          CraftMedia celebrates the process, not just the final result.
        </p>
      </div>

      <div className="rounded-xl bg-black bg-opacity-25 p-5">
        <h2 className="text-2xl font-semibold mb-2">
          Connected to Crafteria
        </h2>

        <p className="text-sm opacity-80 leading-relaxed">
          Seamlessly link projects, materials, and craftlists directly to your posts,
          turning inspiration into action.
        </p>
      </div>

    </div>

    {/* Coming soon footer */}
    <div className="rounded-xl bg-black bg-opacity-30 p-5 text-center">
      <p className="text-xl font-medium mb-2">
        Coming Soon
      </p>

      <p className="text-sm opacity-80 max-w-xl mx-auto">
        CraftMedia is currently in development.
        We are building the foundation to support creators, not trends.
      </p>
    </div>

  </div>

</div>

    </div>
  );
}
