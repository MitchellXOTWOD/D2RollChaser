import Image from 'next/image'
import { useEffect, useState } from 'react';

const SinglePerkList = ({Perks, Type, isSmallScreen, refreshes}) => {

  const [randomIndex, setRandomIndex] = useState([]);
  const [perkNum, setPerkNum] = useState(1);
  
  if(!Perks){
    return <p>Loading...</p>
  }

  const handlePerkNumChange = (event) => {
    let inputNum = event.target.value;
    //don't allow negative numbers or out of bounds numbers
    if(inputNum > 0 && inputNum <= Perks.length && inputNum != ''){
      setPerkNum(inputNum);
    }
    else{
      setPerkNum(1);
    }
  }

  useEffect(() => {
    //randomIndexArray holds a dynamic amount of values that will be randomly selected as perks
    let randomIndexArray = [];

    //do not allow duplicate numbers in the array. If the number is already in the array, roll another number.
    while (randomIndexArray.length < perkNum) {
    let randomIndex = Math.floor(Math.random() * Perks.length);

    // Check if the random index is already in the array
    if (!randomIndexArray.includes(randomIndex)) {
      randomIndexArray.push(randomIndex);
    }
    }
    setRandomIndex(randomIndexArray);
  }  
  , [refreshes])

  return (
    <div className='h-full bg-slate-800 flex flex-col items-center'>
      <h2 className='mb-5'>{Type}</h2>
      <label htmlFor='perkNum'>Number of {Type}s:</label>
      <input type='text' id='perkNum' name='perkNum' placeholder={"select a number"} onChange={handlePerkNumChange} className='text-black'/><br/>
      <ul>
      {/* do not include trait locked perks */}
      {Perks.map((perk, index) => (
        perk.name !== "Trait Locked" ? (
        <li key={index} className={`mb-3 flex items-center ${randomIndex.includes(index) ? 'bg-yellow-500' : ''}`}>
          {perk.hasIcon && <Image src={perk.icon} height={50} width={50} alt="weapon-screenshot" className="" unoptimized/>}
          {!isSmallScreen && perk.name}
        </li>
  ) : null)
  )}
      </ul>
    </div>
  )
}

export default SinglePerkList