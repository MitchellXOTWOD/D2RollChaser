"use client"

import { useEffect, useState } from "react"

import { bungieAPI } from "@api/bungieApi"
import Sidebar from "@components/sidebar/Sidebar"
import RollList from "@components/roll list/RollList"

import "@styles/globals.css"
import Image from "next/image"

const Home = ({selectedWeapon, setSelectedItem}) => {

  const [isWeaponSelected, setIsWeaponSelected] = useState(false);

  const screenshot = `${bungieAPI}${selectedWeapon.screenshot}`;

  useEffect(() => {
    if(selectedWeapon.length !== 0){
      setIsWeaponSelected(true);
    }
  }, [selectedWeapon])

  return (
    <div className="page-container md:flex bg-dark">
      <Sidebar setSelectedItem={setSelectedItem}/>
      {isWeaponSelected && <div className="weapon-container flex flex-col w-full space-y-7 pt-5 px-36">
        <div className="weapon-ss md:w-1/2">
          <Image src={screenshot} height={1080} width={1920} alt="weapon-screenshot" className=""/>
        </div>
        <div className="bottomRow h-1/2">
          <RollList selectedWeapon={selectedWeapon}/>
        </div>
      </div>}
    </div>
  )
}
  
export default Home
