"use client"

import '@styles/globals.css';
import Navbar from '@components/navbar/Navbar';
import Home from './page';
import { useState } from 'react';
   
const RootLayout = () => {

    const [selectedWeapon, setSelectedWeapon] = useState([])

    const setSelectedItem = (item) => {
        setSelectedWeapon(item);
      }

return (
    <html lang="en">
        <head>
            <title>D2 Roll Chaser</title>
        </head>
        <body className='text-center'>    
            <main className='app'>
            <Navbar/>  
            <Home selectedWeapon={selectedWeapon} setSelectedItem={setSelectedItem}/>          
            </main>
        </body>
    </html>
)
}

export default RootLayout;