import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { bungieAPI } from '@api/bungieApi'

const WeaponTile = ({weapon}) => {

  //formatted similar to the manifest
  const weaponIconPath = weapon.displayProperties.icon;
  const WeaponIcon = `${bungieAPI}${weaponIconPath}`;

  return (
    <Link href='/'>
      <div className='w-10/12 bg-green-700 mx-auto border-2 border-double border-gray-400 '>
        <div className='flex items-center space-x-3'>
          <Image src={WeaponIcon} width={48} height={48} alt="weapon logo"/>
          <p>{weapon.displayProperties.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default WeaponTile