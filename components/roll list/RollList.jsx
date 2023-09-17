import React from 'react'
import SinglePerkList from './single perk list/SinglePerkList'

const RollList = (selectedWeapon) => {
  return (
    <div className="rollList bg-red-800 flex h-full w-full">
        <SinglePerkList Perks={"Barrell"}/>
        <SinglePerkList Perks={"Magazine"}/>
        <SinglePerkList Perks={"Trait 1"}/>
        <SinglePerkList Perks={"Trait 2"}/>
        <SinglePerkList Perks={"Origin Trait"}/>
    </div>
  )
}

export default RollList