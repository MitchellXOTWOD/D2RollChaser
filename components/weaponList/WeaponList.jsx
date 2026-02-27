import { useState,useEffect, useMemo } from 'react';
import WeaponTile from './weapon_tile/WeaponTile'
import SearchBar from '@components/searchbar/searchbar';

const WeaponList = ({weapons, setSelectedItem, toggleSidebar}) => {

  const [isMobile, setIsMobile] = useState(false);

  const [search, setSearch] = useState("");

  //filters weapons from the searchbar input
  const filteredWeapons = useMemo(() => {
    //return all of the weapons if the searchbar is empty
    if (!search) return weapons;

    return weapons.filter((weapon) => {
      const name = weapon.displayProperties?.name;
      if (!name) return false;
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, weapons]);

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
      {weapons.length != 0 && (<SearchBar value={search} onChange={setSearch}/>)}
      {filteredWeapons.map((weapon)=>
        <div key={weapon.hash} onClick={() => { setSelectedItem(weapon); isMobile && toggleSidebar() }} className=''>
        <WeaponTile weapon={weapon}/>
      </div>)}
    </div>
  )
}

export default WeaponList