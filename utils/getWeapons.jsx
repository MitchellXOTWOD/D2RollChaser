"use client"

import { bungieAPI, manifestAPI } from '@api/bungieApi';

// Define the function to get weapons
export const getWeapons = async () => {
    try {
        // Fetch the manifest data
        const manifestResponse = await fetch(`${manifestAPI}`, {
            method: 'GET',
            headers: {
                'X-API-Key': 'e6440ecb340443479d9cdee3794be2d1'
            }
        });

        // Check for error
        if (!manifestResponse.ok) {
            throw new Error('Failed to fetch manifest data');
        }

        // Return JSON data
        const manifestData = await manifestResponse.json();
        

        // Handle successful call
        const itemDataPath = manifestData.Response.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition;
        const itemDataUrl = `${bungieAPI}${itemDataPath}`;

        const itemResponse = await fetch(itemDataUrl, { method: 'GET' });

        if (!itemResponse.ok) {
            throw new Error('Failed to fetch item data');
        }
        
        const itemData = await itemResponse.json();

        const legendaryWeaponArray = [];

        for (const key in itemData)
        {
            const item = itemData[key];
            const itemTier = item.inventory.tierTypeName;
            const itemType = item.itemType;

            //ItemType 3 is weapon. We want all weapons that are legendary
            if (itemTier === 'Legendary' && itemType === 3) {
                legendaryWeaponArray.push(item);
            }
        }

        const sortedLegendaryWeaponArray = legendaryWeaponArray.sort((a, b) => a.displayProperties.name.localeCompare(b.displayProperties.name));

        return sortedLegendaryWeaponArray;
        

    } 
    
    catch (error) {
        console.error('Error:', error);
    }
};