"use client"

import WeaponList from "@components/weaponList/WeaponList"
import { useEffect, useState } from "react"
import { getWeapons } from "@utils/getWeapons"

const Sidebar = ({setSelectedItem}) => {
  const [weapons, setWeapons] = useState([]) //empty array for initial state
  const [openSidebar, setOpenSidebar] = useState([true])

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  }
  
  const fetchWeapons = async () => {
    const _weapons = await getWeapons();
    //console.log(_weapons);
    setWeapons(_weapons);
  }

  useEffect(() => {
    fetchWeapons()
  }, [])

  return (
    <>
      {openSidebar && <aside className="absolute bg-slate-800 w-full h-full 
      overflow-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-400
      md:w-80">
        <button onClick={toggleSidebar} className="md:hidden rounded-none bg-blue-500 mt-3 w-1/2"> Close </button>
        <WeaponList weapons={weapons} setSelectedItem={setSelectedItem}/>
      </aside>}
      {!openSidebar && <button onClick={toggleSidebar} className="md:hidden rounded-none bg-blue-500 mt-3 w-1/2"> Open </button>}
    </>
  )
}

export default Sidebar;