import React from 'react'
import WeaponTile from './weapon_tile/WeaponTile'

const WeaponList = ({weapons, setSelectedItem}) => {

  return (
    <div className='mt-3 flex flex-col space-y-3 h-full'>
      {weapons.map((weapon, index)=>
      <div key={index} onClick={() => setSelectedItem(weapon)} className=''>
        <WeaponTile weapon={weapon}/>
      </div>)}
    </div>
  )
}

export default WeaponList