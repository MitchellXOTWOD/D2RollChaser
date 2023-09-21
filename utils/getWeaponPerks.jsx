"use client"

import { bungieAPI, manifestAPI } from '@api/bungieApi';

// Define the function to get weapons
export const getWeaponPerks = async (selectedWeapon) => {
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
        const perkDataPath = manifestData.Response.jsonWorldComponentContentPaths.en.DestinyPlugSetDefinition;
        const perkDataUrl = `${bungieAPI}${perkDataPath}`;
        const itemDataPath = manifestData.Response.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition;
        const itemDataUrl = `${bungieAPI}${itemDataPath}`;

        const perkResponse = await fetch(perkDataUrl, { method: 'GET' });
        const itemResponse = await fetch(itemDataUrl, { method: 'GET' });

        if (!perkResponse.ok) {
            throw new Error('Failed to fetch perk data');
        }

        if (!itemResponse.ok) {
            throw new Error('Failed to fetch item data');
        }
        
        //bungie_api/manifestData.Response.jsonWorldComponentContentPaths.en.DestinyPlugSetDefinition;
        const perksData = await perkResponse.json();
        const itemData = await itemResponse.json();

        //array of perk arrays. Inside is one array for barrels, one for magazine, so forth. 
        const perkList = [];

        for(const index in selectedWeapon.sockets.socketCategories.find(socketCategory => socketCategory.socketCategoryHash === 4241085061).socketIndexes){
        //perkHashIndex uses the socketCategories to make sure we are getting the correct index of perks for each weapon
        const perkHashIndex = selectedWeapon.sockets.socketCategories.find(socketCategory => socketCategory.socketCategoryHash === 4241085061).socketIndexes[index];
        //uses the perkHashIndex to find the randomizedperkPlugSetHash in the socketEntries. 
        const randomizedPerkHash = selectedWeapon.sockets.socketEntries[perkHashIndex]?.randomizedPlugSetHash || selectedWeapon.sockets.socketEntries[perkHashIndex]?.reusablePlugSetHash;
        //List of all of the perk options in the api
        const reusablePerkPlugItemsData = perksData[randomizedPerkHash]?.reusablePlugItems;
        //array to store the perk perk string name
        const tempList = [];

        //go through the perk options, push the perk hash to the perkPerks array.
        for (const [perkKey, perkValue] of Object.entries(reusablePerkPlugItemsData)) {
            const itemHash = perkValue.plugItemHash;
            const item = itemData[itemHash];
            tempList.push({
                name: item.displayProperties.name,
                itemType: item.itemTypeDisplayName
            });
        }

        console.log(tempList)

        perkList.push(tempList);}   
    
        return perkList;       
    } 
    
    catch (error) {
        console.error('Error:', error);
    }
};