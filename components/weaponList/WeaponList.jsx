import { useState,useEffect } from 'react';
import WeaponTile from './weapon_tile/WeaponTile'

const WeaponList = ({weapons, setSelectedItem, toggleSidebar}) => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the screen width is below a certain threshold (e.g., 768 pixels for tablets)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set the initial mobile state
    handleResize();
    // Attach the event listener to handle window resizing
    window.addEventListener('resize', handleResize);
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='mt-3 flex flex-col space-y-3 h-full'>
      {weapons.map((weapon, index)=>
      <div key={index} onClick={() => { setSelectedItem(weapon); isMobile && toggleSidebar() }} className=''>
        <WeaponTile weapon={weapon}/>
      </div>)}
    </div>
  )
}

export default WeaponList