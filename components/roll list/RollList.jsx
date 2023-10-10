import React, { useEffect, useState } from 'react'
import SinglePerkList from './single perk list/SinglePerkList'
import { getWeaponPerks } from "@utils/getWeaponPerks"

const RollList = ({selectedWeapon, isSmallScreen, refreshes, setOdds}) => {

  const [loading, setLoading] = useState(false);
  const [weaponPerks, setWeaponPerks] = useState([]);
  const [arrayOfRandomIndexArrays, setArrayOfRandomIndexArrays] = useState([]);

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
  },[selectedWeapon]);

  useEffect(() => {
    if (!loading) {
      // Calculate the overall probability dynamically
      const totalProbability = weaponPerks
      .filter(perks => perks[0].itemType!=='')
      .reduce((total, perks, index) => {
        return total * (arrayOfRandomIndexArrays[index].length / perks.length);
      }, 1) * 100; 
      setOdds(totalProbability);
    }
  }, [loading, refreshes]);

  return (
     <div className="rollList bg-slate-800 flex h-fit w-full">
        {loading && <p className='m-auto p-36 text-white'>Loading...</p>}
        {!loading && 
        <div className='flex w-full h-auto py-5'>
          {weaponPerks.filter(perks => perks[0].itemType!=='')
          .map((perks, index)=> (
            <div key={index} className='w-full'>
              <SinglePerkList Perks={perks} Type={perks[0].itemType} isSmallScreen={isSmallScreen} refreshes={refreshes} arrayOfRandomIndexArrays={arrayOfRandomIndexArrays} setArrayOfRandomIndexArrays={setArrayOfRandomIndexArrays}/>
            </div>
          ))}          
        </div>}
     </div>
  )
}

export default RollList