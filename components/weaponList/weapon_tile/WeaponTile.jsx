import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { bungieAPI } from '@api/bungieApi'

const WeaponTile = ({weapon}) => {

  //formatted similar to the manifest
  const weaponIconPath = weapon.displayProperties.icon;
  const WeaponIcon = `${bungieAPI}${weaponIconPath}`;
  const seasonIconPath = weapon.iconWatermark || weapon.iconWatermarkShelved;
  const seasonIcon = `${bungieAPI}${seasonIconPath}`

  return (
    <Link href='/'>
      <div className='w-10/12 bg-slate-600 mx-auto border-2 border-double border-gray-400 '>
        <div className='flex items-center space-x-3'>
          <div className='flex flex-col relative'>
            <Image src={WeaponIcon} width={48} height={48} alt="weapon logo"/>
            <Image src={seasonIcon} width={48} height={48} alt="season-icon" className='absolute'/>
          </div>
          <p>{weapon.displayProperties.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default WeaponTile