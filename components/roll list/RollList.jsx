import React, { useEffect, useState } from 'react'
import SinglePerkList from './single perk list/SinglePerkList'
import { getWeaponPerks } from "@utils/getWeaponPerks"

const getRandomIndexes = (poolSize, count) => {
    const indexes = [];
    while (indexes.length < count) {
        const rand = Math.floor(Math.random() * poolSize);
        if (!indexes.includes(rand)) indexes.push(rand);
    }
    return indexes;
}

const RollList = ({selectedWeapon, isSmallScreen, refreshes, setOdds}) => {

    const [loading, setLoading] = useState(false);
    const [weaponPerks, setWeaponPerks] = useState([]);
    const [perkNums, setPerkNums] = useState([]);
    const [arrayOfRandomIndexArrays, setArrayOfRandomIndexArrays] = useState([]);

    const fetchPerks = async () => {
        setLoading(true);
        const _perks = await getWeaponPerks(selectedWeapon);
        setWeaponPerks(_perks);
        setPerkNums(_perks.map(() => 1));
        setLoading(false);
    }

    useEffect(() => {
        if (selectedWeapon) fetchPerks();
    }, [selectedWeapon]);

    useEffect(() => {
        if (loading || weaponPerks.length === 0) return;

        const filteredPerks = weaponPerks.filter(perks => perks[0].itemType !== '');

        // Generate random indexes for each column
        const newArrayOfRandomIndexArrays = filteredPerks.map((perks, index) => {
            const k = perkNums[index] || 1;
            return getRandomIndexes(perks.length, Math.min(k, perks.length));
        });

        setArrayOfRandomIndexArrays(newArrayOfRandomIndexArrays);

        // Your original odds formula — unchanged
        const totalProbability = filteredPerks
            .reduce((total, perks, index) => {
                return total * (newArrayOfRandomIndexArrays[index].length / perks.length);
            }, 1) * 100;

        setOdds(totalProbability);

    }, [loading, refreshes, perkNums]);

    const handlePerkNumChange = (index, value) => {
        const updated = [...perkNums];
        updated[index] = value;
        setPerkNums(updated);
    }

    return (
        <div className="rollList bg-slate-800 flex h-fit w-full">
            {loading && <p className='m-auto p-36 text-white'>Loading...</p>}
            {!loading &&
                <div className='flex w-full h-auto py-5'>
                    {weaponPerks
                        .filter(perks => perks[0].itemType !== '')
                        .map((perks, index) => (
                            <div key={index} className='w-full'>
                                <SinglePerkList
                                    Perks={perks}
                                    Type={perks[0].itemType}
                                    isSmallScreen={isSmallScreen}
                                    randomIndexes={arrayOfRandomIndexArrays[index] || []}
                                    perkNum={perkNums[index] || 1}
                                    onPerkNumChange={(value) => handlePerkNumChange(index, value)}
                                />
                            </div>
                        ))}
                </div>}
        </div>
    )
}

export default RollList