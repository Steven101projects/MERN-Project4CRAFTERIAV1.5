import React from "react";

export default function CrafteriaFooter() {
  return (
    <footer className="w-full bg-orange-600 text-white py-4">
      <div className="max-w-6xl mx-auto text-center text-lg font-semibold">
        © {new Date().getFullYear()} Crafteria. All rights reserved.
      </div>
    </footer>
  );
}
