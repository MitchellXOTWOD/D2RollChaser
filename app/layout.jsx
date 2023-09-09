"use client"

import '@styles/globals.css';
import Navbar from '@components/navbar/Navbar';
import Home from './page';
import Sidebar from '@components/sidebar/Sidebar';
import { useState } from 'react';
   
const RootLayout = () => {

    const [selectedWeapon, setSelectedWeapon] = useState([])

    const setSelectedItem = (item) => {
        setSelectedWeapon(item)
      }

return (
    <html lang="en" className='h-full'>
        <head>
            <title>D2 Roll Chaser</title>
        </head>
        <body className='text-center h-full'>    
            <main className='app h-full'>
            <Navbar/>
            <Sidebar setSelectedItem={setSelectedItem}/>  
            <Home selectedweapon={selectedWeapon}/>          
            </main>
        </body>
    </html>
)
}

export default RootLayout;