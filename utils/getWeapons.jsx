"use client"
import { headers } from '@next.config'
import React from 'react'
import { useState } from 'react'

const getWeapons = async () => {

    const response = await fetch(
        "https://www.bungie.net/Platform/Destiny2/Manifest",
        {method: 'GET',
         headers: {
            'X-API-Key': 'e6440ecb340443479d9cdee3794be2d1',
        }
    })
    .then(response => response.json)
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    })
}

export default getWeapons