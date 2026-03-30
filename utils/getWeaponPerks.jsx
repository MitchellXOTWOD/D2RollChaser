"use client"

import { bungieAPI, manifestAPI } from '@api/bungieApi';
import { getCachedData, setCachedData, isCacheValid, updateCacheVersion, ITEM_DATA_KEY, PERK_DATA_KEY } from '@utils/cache';

export const getWeaponPerks = async (selectedWeapon) => {
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
        let perksData;

        const cacheValid = await isCacheValid(manifestVersion);

        if (cacheValid) {
            itemData = await getCachedData(ITEM_DATA_KEY);
            perksData = await getCachedData(PERK_DATA_KEY);
        }

        if (!itemData || !perksData) {
            const itemDataPath = manifestData.Response.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition;
            const perkDataPath = manifestData.Response.jsonWorldComponentContentPaths.en.DestinyPlugSetDefinition;

            const [itemResponse, perkResponse] = await Promise.all([
                fetch(`${bungieAPI}${itemDataPath}`, { method: 'GET' }),
                fetch(`${bungieAPI}${perkDataPath}`, { method: 'GET' })
            ]);

            if (!itemResponse.ok) throw new Error('Failed to fetch item data');
            if (!perkResponse.ok) throw new Error('Failed to fetch perk data');

            itemData = await itemResponse.json();
            perksData = await perkResponse.json();

            await setCachedData(ITEM_DATA_KEY, itemData);
            await setCachedData(PERK_DATA_KEY, perksData);
            await updateCacheVersion(manifestVersion);
        }

        const perkList = [];
        const perkCategory = selectedWeapon.sockets.socketCategories.find(
            socketCategory => socketCategory.socketCategoryHash === 4241085061
        );

        for (const index in perkCategory.socketIndexes) {
            const perkHashIndex = perkCategory.socketIndexes[index];
            const randomizedPerkHash = selectedWeapon.sockets.socketEntries[perkHashIndex]?.randomizedPlugSetHash
                ?? selectedWeapon.sockets.socketEntries[perkHashIndex]?.reusablePlugSetHash;

            if (!randomizedPerkHash) continue;

            const reusablePerkPlugItemsData = perksData[randomizedPerkHash]?.reusablePlugItems;
            if (!reusablePerkPlugItemsData) continue;

            const tempList = [];

            for (const perk of Object.values(reusablePerkPlugItemsData)) {
                const itemHash = perk.plugItemHash;
                const item = itemData[itemHash];
                if (!item) continue;
                if (item.itemTypeDisplayName?.includes("Enhanced") ||
                    item.displayProperties?.name?.includes("Empty Traits Socket")) continue;

                tempList.push({
                    name: item.displayProperties.name,
                    itemType: item.itemTypeDisplayName,
                    hasIcon: item.displayProperties.hasIcon,
                    icon: bungieAPI + item.displayProperties.icon
                });
            }

            perkList.push(tempList);
        }

        return perkList;

    } catch (error) {
        console.error('Error:', error);
    }
};