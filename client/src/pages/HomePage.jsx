import React from "react"
import CraftTableHeader from "../components/home-components/CraftTableHeader"
import Options from "../components/home-components/Options"
import CraftTable from "../components/home-components/CraftTable"
import { useState } from "react"

export default function Home() {

      const [craft, setCraft] = useState(false);

  return (
    
    <div className="
      min-h-screen 
      w-full 
      bg-[radial-gradient(circle_at_50%_40%,#fa5f07,#ffc187,#faf0c4,#ffdc42)]
    ">
      <CraftTableHeader craft={craft}/>
      <CraftTable setCraft={setCraft}/>
<Options />
    </div>
  )
}
