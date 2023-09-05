import Link from "next/link"
import Image from "next/image"

const Navbar = () => {
  return (
    <nav className="navbar bg-slate-800 flex-between w-full mb-16 pt-0 h-20">
        <Link href="/" className="flex gap-2 flex-center pl-5">
            <Image
            src="/assets/images/destiny_logo"
            alt="destinyLogo"
            width={50}
            height={50}
            className="object-contain w-fit h-fit">
            </Image>
            <p className=" text-white text-3xl">D2 Roll Chaser</p>
        </Link>
    </nav>
  )
}

export default Navbar