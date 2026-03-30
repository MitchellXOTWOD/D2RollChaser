"use client"

import { bungieAPI, manifestAPI } from '@api/bungieApi';
import { getCachedData, setCachedData, isCacheValid, updateCacheVersion, ITEM_DATA_KEY } from '@utils/cache';

export const getWeapons = async () => {
    try {
        const manifestResponse = await fetch(manifestAPI, {
            method: 'GET',
            headers: {
                'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY
            }
        });

        if (!manifestResponse.ok) throw new Error('Failed to fetch manifest data');

        const manifestData = await manifestResponse.json();
        const manifestVersion = manifestData.Response.version;

        let itemData;
        const cacheValid = await isCacheValid(manifestVersion);

        if (cacheValid) {
            itemData = await getCachedData(ITEM_DATA_KEY);
        }

        if (!itemData) {
            const itemDataPath = manifestData.Response.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition;
            const itemResponse = await fetch(`${bungieAPI}${itemDataPath}`, { method: 'GET' });
            if (!itemResponse.ok) throw new Error('Failed to fetch item data');

            itemData = await itemResponse.json();

            await setCachedData(ITEM_DATA_KEY, itemData);
            await updateCacheVersion(manifestVersion);
        }

        const legendaryWeaponArray = [];

        for (const key in itemData) {
            const item = itemData[key];
            if (item.inventory?.tierTypeName === 'Legendary' && item.itemType === 3) {
                legendaryWeaponArray.push(item);
            }
        }

        return legendaryWeaponArray.sort((a, b) =>
            a.displayProperties.name.localeCompare(b.displayProperties.name)
        );

    } catch (error) {
        console.error('Error:', error);
    }
};