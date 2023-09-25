import Image from 'next/image'
import { useEffect, useState } from 'react';

const SinglePerkList = ({Perks, Type, isSmallScreen, refreshes}) => {

  const [randomIndex, setRandomIndex] = useState(0);
  
  if(!Perks){
    return <p>Loading...</p>
  }

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * Perks.length));
  }, [refreshes])

  return (
    <div className='h-full bg-slate-800 flex flex-col items-center'>
      <h2 className='mb-5'>{Type}</h2>
      <ul>
        {Perks.map((perk, index) => (
          <li key={index} className={`mb-3 flex items-center ${index === randomIndex ? 'bg-yellow-500' : ''}`}>
            {perk.hasIcon && <Image src={perk.icon} height={50} width={50} alt="weapon-screenshot" className=""/>}
            {!isSmallScreen && perk.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SinglePerkList