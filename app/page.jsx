"use client"

import { useEffect, useState } from "react"
import { getWeapons } from "@utils/getWeapons"
import { bungieAPI } from "@api/bungieApi"
import Sidebar from "@components/sidebar/Sidebar"

import "@styles/globals.css"
import Image from "next/image"

const Home = ({selectedWeapon, setSelectedItem}) => {

  const [isWeaponSelected, setIsWeaponSelected] = useState(false);
  const screenshot = `${bungieAPI}${selectedWeapon.screenshot}`

  useEffect(() => {
    if(selectedWeapon.length !== 0){
      setIsWeaponSelected(true);
      console.log(screenshot);
    }
  }, [selectedWeapon])

  return (
    <div className="page-container flex bg-dark">
      <Sidebar setSelectedItem={setSelectedItem}/>
      <div className="weapon-container flex justify-center w-full">
        <div className="h-1/2 w-1/2 mt-5">
          {isWeaponSelected && <Image src={screenshot} height={1080} width={1920} alt="weapon-screenshot" className=""/>}
        </div>
      </div>
    </div>
  )
}
  
export default Home
