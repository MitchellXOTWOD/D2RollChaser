"use client"

import WeaponList from "@components/weaponList/WeaponList"
import { useEffect, useState } from "react"
import { getWeapons } from "@utils/getWeapons"

const Sidebar = ({setSelectedItem}) => {
  const [weapons, setWeapons] = useState([]) //empty array for initial state
  
  const fetchWeapons = async () => {
    const _weapons = await getWeapons();
    //console.log(_weapons);
    setWeapons(_weapons);
  }

  useEffect(() => {
    fetchWeapons()
  }, [])

  return (
    <aside className="absolute bg-slate-800 w-80 h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-400">
      <WeaponList weapons={weapons} setSelectedItem={setSelectedItem}/>
    </aside>
  )
}

export default Sidebar