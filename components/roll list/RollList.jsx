import React from 'react'
import SinglePerkList from './single perk list/SinglePerkList'

const RollList = () => {
  return (
    <div className="rollList bg-red-800 flex h-full w-full">
        <SinglePerkList PerkName={"Barrell"}/>
        <SinglePerkList PerkName={"Magazine"}/>
        <SinglePerkList PerkName={"Trait 1"}/>
        <SinglePerkList PerkName={"Trait 2"}/>
        <SinglePerkList PerkName={"Origin Trait"}/>
    </div>
  )
}

export default RollList