import { openDB } from 'idb';

const DB_NAME = 'd2rollchaser';
const DB_VERSION = 1;
const STORE_NAME = 'manifest';

const getDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        },
    });
};

export const getCachedData = async (key) => {
    try {
        const db = await getDB();
        return await db.get(STORE_NAME, key);
    } catch (error) {
        console.error(`Error reading cache for ${key}:`, error);
        return null;
    }
};

export const setCachedData = async (key, data) => {
    try {
        const db = await getDB();
        await db.put(STORE_NAME, data, key);
    } catch (error) {
        console.error(`Error writing cache for ${key}:`, error);
    }
};

export const isCacheValid = async (manifestVersion) => {
    try {
        const db = await getDB();
        const cachedVersion = await db.get(STORE_NAME, 'manifest_version');
        return cachedVersion === manifestVersion;
    } catch (error) {
        return false;
    }
};

export const updateCacheVersion = async (manifestVersion) => {
    try {
        const db = await getDB();
        await db.put(STORE_NAME, manifestVersion, 'manifest_version');
    } catch (error) {
        console.error('Error updating cache version:', error);
    }
};

export const ITEM_DATA_KEY = 'bungie_item_data';
export const PERK_DATA_KEY = 'bungie_perk_data';