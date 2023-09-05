"use client"
import { headers } from '@next.config'
import React from 'react'
import { useState } from 'react'

const getWeapons = async () => {

    //fetch the manifest data
    fetch(
        "https://www.bungie.net/Platform/Destiny2/Manifest",
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
        console.log(manifestData);
        const weaponHash = manifestData.Response.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition;
        //get the url of the weapon data using the manifest data to get the hash of said weapon
        const weaponDataUrl = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition${weaponHash}`;

        fetch(weaponDataUrl, 
            {method: 'GET',
            headers: {
                'X-API-Key': 'e6440ecb340443479d9cdee3794be2d1'
            }
        })
        .then((weaponResponse) => {
            if (!weaponResponse.ok) {
                throw new Error('Failed to fetch weapon data');
            }

            return weaponResponse.json();
        })

        .then((weaponData) => {
            console.log(weaponData);

            const weaponName = weaponData.Response.displayProperties.name;
            const weaponDescription = weaponData.Response.displayProperties.description;

            console.log('Weapon Name: ${weaponName}');
            console.log('Weapon Description: ${weaponDescription}');
        })

        .catch((error) => {
            console.error('There was a problem fetching the weapon data: ', error);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    })
}

export default getWeapons