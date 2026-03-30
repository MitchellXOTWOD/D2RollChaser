import Image from 'next/image'
import { useState } from 'react';

const SinglePerkList = ({Perks, Type, isSmallScreen, randomIndexes, perkNum, onPerkNumChange}) => {

    if (!Perks) return <p>Loading...</p>

    const handlePerkNumChange = (event) => {
        const inputNum = parseInt(event.target.value);
        if (!isNaN(inputNum) && inputNum > 0 && inputNum <= Perks.length) {
            onPerkNumChange(inputNum);
        } else {
            onPerkNumChange(1);
        }
    }

    return (
        <div className='h-full bg-slate-800 flex flex-col items-center'>
            <h2 className='mb-5 text-white'>{Type}</h2>
            <label htmlFor='perkNum' className='text-white'>Number of {Type}s:</label>
            <input type='text' id='perkNum' name='perkNum' placeholder={"select a number"} onChange={handlePerkNumChange} className='text-black'/><br/>
            <ul>
                {Perks.map((perk, index) => (
                    perk.name !== "Trait Locked" ? (
                        <li key={index} className={`mb-3 flex items-center text-white ${randomIndexes.includes(index) ? 'bg-yellow-500' : ''}`}>
                            {perk.hasIcon && <Image src={perk.icon} height={50} width={50} alt="perk-icon" unoptimized/>}
                            {!isSmallScreen && perk.name}
                        </li>
                    ) : null
                ))}
            </ul>
        </div>
    )
}

export default SinglePerkList