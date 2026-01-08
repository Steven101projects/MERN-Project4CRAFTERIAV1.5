import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { GiClawHammer } from "react-icons/gi";

export default function CraftTable({ setCraft }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const examples = ["IRON", "PAPER", "WOOD", "STONE", "GUM"];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const [materialMap, setMaterialMap] = useState(new Map());
  const [loadingMaterials, setLoadingMaterials] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex(prev => (prev + 1) % examples.length);
        setFade(true);
      }, 600);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    async function loadMaterials() {
      try {
        setLoadingMaterials(true);

        const res = await api.get("/api/materials");
        const map = new Map(
          res.data.map(m => [m.name.toUpperCase(), m])
        );
        setMaterialMap(map);
      } catch {
        setError("Failed to load materials");
      } finally {
        setLoadingMaterials(false);
      }
    }

    loadMaterials();
  }, [open]);

  const handleClick = () => {
    if (setCraft) setCraft(true);
    setOpen(true);
  };

  // ✅ validate before placing on table
  const addMaterial = () => {
    const value = text.trim().toUpperCase();
    if (!value) return;
    if (items.length >= 9) return;

    if (loadingMaterials || !materialMap.has(value)) {
      setError("Material not found");
      return;
    }

    setItems(prev => [...prev, value]);
    setText("");
    setError("");
  };

  const removeMaterial = index => {
    setItems(prev => prev.filter((_, i) => i !== index));
    setError("");
  };

  // ✅ final safety check before crafting
  const craft = () => {
    if (items.length === 0) return;

    const invalid = items.some(i => !materialMap.has(i));
    if (invalid) {
      setError("Material not found");
      return;
    }

    navigate("/craftbook", {
      state: {
        craftedMaterials: items
      }
    });
  };

  if (open) {
    return (
      <div className="flex flex-col py-[4vh] items-center">

        {loadingMaterials && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div
              className="px-6 py-3 rounded-full
                         bg-black bg-opacity-80
                         text-white font-semibold
                         shadow-lg animate-pulse"
            >
              Preparing crafting materials…
            </div>
          </div>
        )}

        <div
          id="craftingTable"
          className="bg-gradient-to-br from-[#ffbf00] to-[#f15000]
                     w-[35vw] h-[45vh]
                     rounded-[2vh]
                     grid grid-cols-3 grid-rows-3
                     gap-[2vh] p-[3vh]
                     box-border shadow-orange-700 shadow-xl"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="relative bg-white rounded-[2vh] w-full h-full
                         flex items-center justify-center
                         text-[1.5vw] font-semibold text-[#f15000]"
            >
              {items[i]}

              {items[i] && (
                <button
                  onClick={() => removeMaterial(i)}
                  className="absolute top-[-1vh] right-[-1vh]
                             w-[2vw] h-[2vw]
                             rounded-full bg-red-500 text-white
                             flex items-center justify-center
                             text-[1.6vw] font-bold
                             transition-transform
                             hover:scale-110
                             animate-float-soft"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="w-[40vw] h-[20vh] mt-[.4vh] flex flex-col items-center">
          <button
            onClick={addMaterial}
            className="relative z-10 top-[6vh] right-[30vh]
                       flex items-center justify-center
                       w-[4vw] h-[4vw]
                       rounded-full bg-orange-500 shadow-md
                       active:scale-95 transition-all duration-200
                       hover:scale-110 focus:outline-none
                       focus:ring-2 focus:ring-orange-300
                       animate-float"
          >
            <div className="absolute w-[0.3vw] h-[2.5vw] bg-white rounded-sm" />
            <div className="absolute w-[2.5vw] h-[0.3vw] bg-white rounded-sm" />
          </button>

          <div
            className="bg-[#c74710] w-[34vw] h-[8vh]
                       rounded-[3vw] flex justify-center
                       shadow-red-900 shadow-md"
          >
            <input
              type="text"
              placeholder="Enter material..."
              value={text}
              onChange={e => setText(e.target.value)}
              className="relative rounded-[1vw]
                         left-[4vh] bottom-[1vh]
                         bg-white w-[25vw] h-[7vh]
                         text-center text-[1.5vw]
                         font-semibold text-gray-700
                         outline-none"
            />
          </div>

          <button
            id="okButton"
            onClick={craft}
            className="absolute right-[24vw]
                       font-bold flex items-center justify-center
                       w-[7vw] h-[7vw]
                       bg-orange-500 text-white text-3xl
                       rounded-full shadow-red-900 shadow-md
                       hover:bg-[#ffb507]
                       transition-transform duration-300
                       hover:scale-110 cursor-pointer
                       font-spartan"
          >
            <GiClawHammer className="w-[4vw] h-[4vw]" />
          </button>

          {error && (
            <p className="mt-3 text-red-700 font-semibold">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[45vh] flex flex-col items-center">
      <div className="flex flex-col items-center justify-center mt-16">
        <button
          onClick={handleClick}
          className="relative shadow-orange-700 shadow-lg
                     flex items-center justify-center
                     w-[5vw] h-[5vw]
                     rounded-full bg-orange-500
                     hover:scale-110 active:scale-95
                     transition-all duration-200
                     focus:outline-none focus:ring-2
                     focus:ring-orange-300"
        >
          <div className="absolute w-[0.4vw] h-[3vw] bg-white rounded-sm" />
          <div className="absolute w-[3vw] h-[0.4vw] bg-white rounded-sm" />
        </button>

        <div className="w-[40vw] h-[14vh] mt-[4vh] flex flex-col items-center">
          <div
            className="bg-[#d4480c] w-[28vw] h-[10vh]
                       rounded-[3vw] flex justify-center
                       shadow-red-900 shadow-lg"
          >
            <div
              className="relative bottom-[1vh]
                         bg-white w-[24vw] h-[8vh]
                         flex items-center justify-center
                         overflow-hidden"
            >
              <span
                className={`
                  text-[2vw] font-semibold text-gray-700
                  transition-all duration-[1600ms] ease-in-out
                  ${fade ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[2vw]"}
                `}
              >
                {examples[index]}...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
