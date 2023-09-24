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

  const screenshot = `${bungieAPI}${selectedWeapon.screenshot}`;

  useEffect(() => {
  if (selectedWeapon.length !== 0) {
    setIsWeaponSelected(true);
  }
  
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [selectedWeapon]);

  return (
    <div className="page-container h-full md:flex bg-dark">
      <Sidebar setSelectedItem={setSelectedItem} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
      {isWeaponSelected && (isSmallScreen ? !openSidebar : true) && <div className="weapon-container flex flex-col md:h-full h-min w-full space-y-7 pt-5 md:px-36">
        <div className="weapon-ss self-center md:w-1/2 w-full" >
          <Image src={screenshot} height={1080} width={1920} alt="weapon-screenshot" className=""/>
        </div>
        <div className="bottomRow md:h-1/2 md:grow-0 grow">
          <RollList selectedWeapon={selectedWeapon}/>
        </div>
      </div>}
    </div>
  )
}
  
export default Home
