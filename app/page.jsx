"use client"
import { useState } from "react"
import { getWeapons } from "@utils/getWeapons"
import "@styles/globals.css"

const Home = () => {
  const [selectedWeapon, setSelectedWeapon] = useState([])

  return (
    <div className="h-full bg-dark">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={getWeapons}>getWeapons</button>
    </div>
  )
}
  
  export default Home
