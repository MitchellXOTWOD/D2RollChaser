import WeaponList from "@components/weaponList/WeaponList"

const Sidebar = () => {
  return (
    <aside className="absolute bg-slate-800 w-80 h-full">
      <WeaponList/>
    </aside>
  )
}

export default Sidebar