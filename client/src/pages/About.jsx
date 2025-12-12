import React from "react"

export default function About() {
  return (
    <div className="m-5 flex justify-center">
      <div className="p-5 rounded w-[80vw] h-[90vh] text-white bg-orange-500 flex flex-col items-center">

        {/* Title */}
        <p className="text-4xl mb-6 mt-4">What is CRAFTERIA?</p>

        {/* Body container */}
        <div className="max-w-[60vw] text-center text-lg leading-relaxed">

          <p className="mb-4">
            Crafteria is a space for creators who enjoy building simple and meaningful projects. 
            The app helps you explore project ideas, learn what materials you need, and discover how 
            different items can be used in creative ways.
          </p>

          <p className="mb-4">
            The goal is to make crafting easy by connecting two sides of the process. 
            You can browse through community projects or explore materials to see what can be made from them. 
            Each item shows related projects and each project lists the materials used. 
          </p>

          <p className="mb-4">
            Crafteria is designed to support students, hobbyists, and anyone who wants to experiment with hands on creativity.
            Whether you are starting your first craft or exploring new ideas, Crafteria helps you stay organized 
            and inspired.
          </p>

          <p>
            Explore, create, and share.  
            That is what Crafteria is about.
          </p>

        </div>
<div className="mt-10 flex flex-col items-center gap-3 text-white">

  <p className="text-2xl">Creator</p>

  <div className="flex gap-4">

    <a
      href="https://github.com/NicoCastro"
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-orange-600 rounded text-white hover:bg-orange-700"
    >
      GitHub
    </a>

    <a
      href="https://www.linkedin.com/in/nico-castro/"
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-orange-600 rounded text-white hover:bg-orange-700"
    >
      LinkedIn
    </a>

    <a
      href="https://www.instagram.com/ccsaiengineeringclub/"
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-orange-600 rounded text-white hover:bg-orange-700"
    >
      Instagram
    </a>

  </div>

</div>

      </div>
      
    </div>
  )
}
