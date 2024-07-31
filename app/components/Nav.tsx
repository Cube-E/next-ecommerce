"use client"

import { Session } from "next-auth"
import { signIn, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import Cart from "./Cart"
import { useCartStore } from "@/store"
import { AiFillShopping } from "react-icons/ai"
import { FiMenu } from "react-icons/fi"
import { AnimatePresence, motion } from "framer-motion"
import DarkLight from "./DarkLight"
import { useSession } from "next-auth/react"
import urbanimg from "@/assets/urbanPack.jpg"
import frontgrill from "@/assets/frontpagegrill.jpg"
export default function Nav() {
  const cartStore = useCartStore()
  const { data: session, status } = useSession()
  return (
    <nav className="absolute flex z-10 justify-between items-center py-2 px-20 mb-2 mt-2  rounded-md w-full">
      {/* Tabs */}
      <ul className=" flex items-center left-0 dropdown">
        <FiMenu />
      </ul>
      <Link className="" href={"/"}>
        <h1 className="font-lobster text-xl items-end">R A C K U N</h1>
      </Link>
      <ul className="flex items-center gap-5 ">
        {/* Cart Icon. Toggle the cart */}
        <li
          onClick={() => cartStore.toggleCart()}
          className="flex items-center text-3xl relative cursor-pointer">
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex justify-center items-center">
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {/* Dark/Light Icon */}
        <DarkLight />
        {/* User Icon. if user is not signed in*/}
        {!session?.user && (
          <li className="bg-primary text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign In</button>
          </li>
        )}
        {session?.user && (
          <>
            <li>
              <div className="dropdown dropdown-end cursor-pointer">
                <Image
                  src={session.user?.image as string}
                  alt={session.user?.name as string}
                  width={32}
                  height={132}
                  className="rounded-2xl"
                  tabIndex={0}
                />
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-4 space-y-4 shadow bg-base-200 rounded-box w-72">
                  <Link
                    href={"/dashboard"}
                    className="hover:bg-base-300 p-4 rounded-md"
                    onClick={() => {
                      if (document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur()
                      }
                    }}>
                    Orders
                  </Link>
                  <li
                    className="hover:bg-base-300 p-4 rounded-md"
                    onClick={() => {
                      signOut()
                      if (document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur()
                      }
                    }}>
                    Sign Out
                  </li>
                </ul>
              </div>
            </li>
          </>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
    // <nav className="bg-gray-800">
    //   <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    //     <div className="relative flex h-16 items-center justify-between">
    //       <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
    //         {/* <!-- Mobile menu button--> */}
    //         <button
    //           type="button"
    //           className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    //           aria-controls="mobile-menu"
    //           aria-expanded="false">
    //           <span className="absolute -inset-0.5"></span>
    //           <span className="sr-only">Open main menu</span>
    //           {/* <!--
    //         Icon when menu is closed.

    //         Menu open: "hidden", Menu closed: "block"
    //       --> */}
    //           <svg
    //             className="block h-6 w-6"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke-width="1.5"
    //             stroke="currentColor"
    //             aria-hidden="true">
    //             <path
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //               d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    //             />
    //           </svg>
    //           {/* <!--
    //         Icon when menu is open.

    //         Menu open: "block", Menu closed: "hidden"
    //       --> */}
    //           <svg
    //             className="hidden h-6 w-6"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke-width="1.5"
    //             stroke="currentColor"
    //             aria-hidden="true">
    //             <path
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //               d="M6 18L18 6M6 6l12 12"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //       <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
    //         <div className="flex flex-shrink-0 items-center">
    //           <Image
    //             className="h-8 w-auto"
    //             src={urbanimg}
    //             alt="Your Company"
    //             width={10}
    //             height={10}
    //           />
    //         </div>
    //         <div className="hidden sm:ml-6 sm:block">
    //           <div className="flex space-x-4">
    //             {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
    //             <a
    //               href="#"
    //               className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
    //               aria-current="page">
    //               Dashboard
    //             </a>
    //             <a
    //               href="#"
    //               className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
    //               Team
    //             </a>
    //             <a
    //               href="#"
    //               className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
    //               Projects
    //             </a>
    //             <a
    //               href="#"
    //               className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
    //               Calendar
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    //         <button
    //           type="button"
    //           className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
    //           <span className="absolute -inset-1.5"></span>
    //           <span className="sr-only">View notifications</span>
    //           <svg
    //             className="h-6 w-6"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke-width="1.5"
    //             stroke="currentColor"
    //             aria-hidden="true">
    //             <path
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //               d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
    //             />
    //           </svg>
    //         </button>

    //         {/* <!-- Profile dropdown --> */}
    //         <div className="relative ml-3">
    //           <div>
    //             <button
    //               type="button"
    //               className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    //               id="user-menu-button"
    //               aria-expanded="false"
    //               aria-haspopup="true">
    //               <span className="absolute -inset-1.5"></span>
    //               <span className="sr-only">Open user menu</span>
    //               <Image
    //                 className="h-8 w-8 rounded-full"
    //                 src={urbanimg}
    //                 alt=""
    //                 width={10}
    //                 height={10}
    //               />
    //             </button>
    //           </div>

    //           {/* <!--
    //         Dropdown menu, show/hide based on menu state.

    //         Entering: "transition ease-out duration-100"
    //           From: "transform opacity-0 scale-95"
    //           To: "transform opacity-100 scale-100"
    //         Leaving: "transition ease-in duration-75"
    //           From: "transform opacity-100 scale-100"
    //           To: "transform opacity-0 scale-95"
    //       --> */}
    //           <div
    //             className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    //             role="menu"
    //             aria-orientation="vertical"
    //             aria-labelledby="user-menu-button"
    //             tabindex="-1">
    //             {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
    //             <a
    //               href="#"
    //               className="block px-4 py-2 text-sm text-gray-700"
    //               role="menuitem"
    //               tabindex="-1"
    //               id="user-menu-item-0">
    //               Your Profile
    //             </a>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 text-sm text-gray-700"
    //               role="menuitem"
    //               tabindex="-1"
    //               id="user-menu-item-1">
    //               Settings
    //             </a>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 text-sm text-gray-700"
    //               role="menuitem"
    //               tabindex="-1"
    //               id="user-menu-item-2">
    //               Sign out
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* <!-- Mobile menu, show/hide based on menu state. --> */}
    //   <div className="sm:hidden" id="mobile-menu">
    //     <div className="space-y-1 px-2 pb-3 pt-2">
    //       {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
    //       <a
    //         href="#"
    //         className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
    //         aria-current="page">
    //         Dashboard
    //       </a>
    //       <a
    //         href="#"
    //         className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
    //         Team
    //       </a>
    //       <a
    //         href="#"
    //         className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
    //         Projects
    //       </a>
    //       <a
    //         href="#"
    //         className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
    //         Calendar
    //       </a>
    //     </div>
    //   </div>
    // </nav>
  )
}
