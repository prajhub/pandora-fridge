import { useSession, signIn, signOut } from "next-auth/react"

import {Menu, Transition} from '@headlessui/react'
import Image from "next/image"



export default function ProfileMenu() {

    const {data: sessionData} = useSession()

    const userImage = sessionData?.user?.image


    return (
        <>
        
      { sessionData ? <div className="relative inline-block text-left">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                {userImage && typeof userImage === 'string' && (
                  <Image src={userImage} alt="User Profile" className=" rounded-full" width={50} height={50} />
                )}
              
              </Menu.Button>
  
              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="px-4 py-3">
                    <p className="mb-2 text-sm">{sessionData?.user?.name}</p>
                    <button
                      className="flex items-center justify-center w-full px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                      onClick={sessionData ? () => void signOut() : () => void signIn()}
                    >
                        {sessionData ? "Sign out" : "Sign in"}
                    </button>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div> : <button type="button" onClick={sessionData ? () => void signOut() : () => void signIn()} className="py-2.5 px-5 mr-1 mb-2 mt-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-20">Sign In</button>}
      </>
    )
}