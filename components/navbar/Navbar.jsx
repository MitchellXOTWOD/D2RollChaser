import Link from "next/link"
import Image from "next/image"

const Navbar = () => {
  return (
    <nav className="navbar bg-slate-800 flex items-center w-full py-2 md:py-0 md:h-20">
        <div className="pl-5">
            <Link href="/" className="flex gap-2 items-center">
                <Image
                src="/assets/images/destiny_logo"
                alt="destinyLogo"
                width={50}
                height={50}
                className="object-contain w-fit h-fit">
                </Image>
                <p className="text-white text-3xl md:text-4xl">D2 Roll Chaser</p>
            </Link>
        </div>
    </nav>
  )
}

export default Navbar