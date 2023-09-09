import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const WeaponTile = ({weapon}) => {
  console.log(weapon.displayProperties.icon)
  return (
    <Link href='/'>
      <div className='w-10/12 bg-green-700 mx-auto border-2 border-double border-gray-400 '>
        <div className='flex items-center space-x-3'>
          <Image src={weapon.displayProperties.icon} width={96} height={96} alt="weapon logo"/>
          <p>{weapon.displayProperties.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default WeaponTile