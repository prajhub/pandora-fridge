import Link from "next/link"
import ProfileMenu from "./ui/ProfileMenu"

import { useSession, signIn, signOut } from "next-auth/react"

export default function NavBar() {

  const {data: sessionData} = useSession()


    return (
    <nav className="bg-[#ECECEC] border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
           
            <span className="self-center text-4xl font-bold text-[#293759] whitespace-nowrap dark:text-white">Pandora Fridge</span>
        </Link>
       
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#ECECEC] md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-[#ECECEC] ">
            <li>
              <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-[#293759] rounded md:bg-transparent md:text-[#293759] md:p-0 dark:text-white " aria-current="page">Home</Link>
            </li>
            <li>
             
            </li>
            <li>
              <div className="flex items-center">
                <div className="flex items-center flex-col">
                <span className="text-md hover:cursor-pointer">{sessionData?.user?.name}</span>
              <span className="text-xs hover:cursor-pointer">Kitchen Fridge</span>
                </div>
              
              <ProfileMenu/>
              </div>
             
            </li>
          
          </ul>
        </div>
      </div>
    </nav>
    )
    
}