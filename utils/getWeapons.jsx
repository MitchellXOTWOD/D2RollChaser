"use client"

import { bungieAPI, manifestAPI } from '@api/bungieApi'

const getWeapons = async () => {

    //fetch the manifest data
    fetch(
        `${manifestAPI}`,
        {method: 'GET',
         headers: {
            'X-API-Key': 'e6440ecb340443479d9cdee3794be2d1'
        }
    })
    .then((manifestResponse) => {
        //check for error
        if (!manifestResponse.ok) {
            throw new Error('Failed to fetch manifest data');
        }
        //return json
        return manifestResponse.json();
        })

    .then(manifestData => {
        //handle successful call
        const itemDataPath = manifestData.Response.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition;
        //get the url of the weapon data using the manifest data to get the hash of said weapon
        const itemDataUrl = `${bungieAPI}${itemDataPath}`;

        fetch(itemDataUrl, {method: 'GET'})
        
        .then((itemResponse) => {
            if (!itemResponse.ok) {
                throw new Error('Failed to fetch item data');
            }

            return itemResponse.json();
        })

        //return only the name of the items
        .then((itemData) => {
            for(const key in itemData){
                const item = itemData[key]
                //guarentee a string and not a null value
                const itemTier = item.inventory.tierTypeName;
                //item type 3 is weapon
                const itemType = item.itemType;

                const itemSubType = item.itemTypeDisplayName;

                if(itemTier == "Legendary" && itemType == 3)
                {
                    console.log('Item Name: ', item.displayProperties.name,
                    '\nWeapon Type: ', itemSubType,
                    '\nItem: ', item)
                }                 
            }
        })

        .catch((error) => {
            console.error('There was a problem fetching the item data: ', error);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    })
}

export default getWeapons