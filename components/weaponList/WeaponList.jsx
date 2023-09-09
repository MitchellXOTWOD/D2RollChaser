import React from 'react'
import WeaponTile from './weapon_tile/WeaponTile'

const WeaponList = ({weapons, setSelectedItem}) => {

  return (
    <div className='mt-7'>
      {weapons.map((weapon, index)=>
      <div key={index} onClick={() => setSelectedItem(weapon)}>
        <WeaponTile weapon={weapon}/>
      </div>)}
    </div>
  )
}

export default WeaponList