import React from "react";

export default function Options() {

 return (
    <div className="">

      {/* Text Box */}
      
      <div className="flex justify-center pb-10">
        <p
          className="
            text-center 
            text-orange-600
            text-2xl 
            max-w-5xl 
            leading-relaxed 
            font-semibold 
          "
        >
          Press the + button to start crafting.  
          To add items, type a material in the input box and press the + button again.  
          When you're done, press OK to craft it!
        </p>
      </div>
      {/* Gradient Divider */}
      <div className="w-full h-6 bg-[linear-gradient(90deg,#ff7a00,#ffbc63,#ff7a00)]"></div>
    </div>
  );
 
}
