import Link from "next/link"
import Image from "next/image"

const Navbar = () => {
  return (
    <nav className="navbar bg-black flex-between w-full mb-16 pt-0 h-20">
        <Link href="/" className="flex gap-2 flex-center pl-5">
            <Image
            src="/assets/images/destiny_logo"
            alt="destinyLogo"
            width={30}
            height={30}
            className="object-contain">
            </Image>
            <p className="text-white">D2 Roll Chaser</p>
        </Link>
    </nav>
  )
}

export default Navbar