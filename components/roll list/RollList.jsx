import React, { useEffect, useState } from 'react'
import SinglePerkList from './single perk list/SinglePerkList'
import { getWeaponPerks } from "@utils/getWeaponPerks"

const RollList = ({selectedWeapon}) => {

  const [loading, setLoading] = useState(false);
  const [weaponPerks, setWeaponPerks] = useState([]);

  const fetchPerks = async () => {
    setLoading(true);
    const _perks = await getWeaponPerks(selectedWeapon);
    setWeaponPerks(_perks);
    setLoading(false);
  }

  useEffect(() => {
    if(selectedWeapon){
      fetchPerks();
    }
  },[selectedWeapon])

  return (
     <div className="rollList bg-slate-800 flex h-full w-full">
        {loading && <p className='m-auto p-36'>Loading...</p>}
        {!loading && 
        <div className='flex w-full h-full py-5'>
          {weaponPerks.filter(perks => perks[0].itemType!=='')
          .map((perks, index)=> (
            <div key={index} className='w-full'>
              <SinglePerkList Perks={perks} Type={perks[0].itemType}/>
            </div>
          ))}          
        </div>}
     </div>
  )
}

export default RollList