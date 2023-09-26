"use client"

import { useEffect, useState } from "react"

import { bungieAPI } from "@api/bungieApi"
import Sidebar from "@components/sidebar/Sidebar"
import RollList from "@components/roll list/RollList"

import "@styles/globals.css"
import Image from "next/image"

const Home = ({selectedWeapon, setSelectedItem}) => {

  const [isSmallScreen, setIsSmallScreen] = useState();
  const [isWeaponSelected, setIsWeaponSelected] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);
  const [refreshes, setRefreshes] = useState(1);
  const [odds, setOdds] = useState();

  const screenshot = `${bungieAPI}${selectedWeapon.screenshot}`;

  useEffect(() => {
  if (selectedWeapon.length !== 0) {
    setIsWeaponSelected(true);
  }
  
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  setRefreshes(1);

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [selectedWeapon]);

  return (
    <div className="page-container h-full md:flex bg-dark">
      <Sidebar setSelectedItem={setSelectedItem} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
      {isWeaponSelected && (isSmallScreen ? !openSidebar : true) && <div className="weapon-container pb-5 flex flex-col md:h-auto w-full space-y-7 pt-5 md:px-36 overflow-y-auto
      scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-400">
        <h1 className="font-medium">{selectedWeapon.displayProperties.name}</h1>
        <div className="weapon-ss self-center md:w-1/2 w-full" >
          <Image src={screenshot} height={1080} width={1920} alt="weapon-screenshot"/>
        </div>
        <div className="bottomRow md:h-auto">
          <RollList selectedWeapon={selectedWeapon} isSmallScreen={isSmallScreen} refreshes={refreshes} setOdds={setOdds}/>
        </div>
        <div className="flex items-center justify-center space-x-5">
          <button onClick={() => setRefreshes((x) => x+1)} className="nice-button md:w-1/6 self-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
            Roll Weapon
          </button>
          {odds && <p>rolled {refreshes} time(s) with a {odds.toFixed(3)}% chance</p>}
        </div>
      </div>}
    </div>
  )
}
  
export default Home
