"use client"

import WeaponList from "@components/weaponList/WeaponList"
import { useEffect, useState } from "react"
import { getWeapons } from "@utils/getWeapons"

const Sidebar = ({setSelectedItem}) => {
  const [weapons, setWeapons] = useState([]) //empty array for initial state
  const [openSidebar, setOpenSidebar] = useState(true);

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
      {openSidebar && <aside className="bg-slate-800 w-full h-screen  
      overflow-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-400
      md:w-fit min-w-fit">
        {/* Show loading if weapons have not been fulfilled */}
        {weapons.length == 0 && <p className="px-32">Loading...</p>}
        <WeaponList weapons={weapons} setSelectedItem={setSelectedItem} toggleSidebar={toggleSidebar}/>
      </aside>}

      {!openSidebar && <button onClick={toggleSidebar} className="md:hidden rounded-none bg-blue-500 mt-3 w-3/4"> Weapons </button>}
    </>
  )
}

export default Sidebar;