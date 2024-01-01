'use client'
import Link from 'next/link';

import { useState } from 'react';
import { SafeUser } from '@/types';
import { signOut } from 'next-auth/react';

interface UserMenuProps {
    currentUser: SafeUser | null
}



interface MobileNavProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileNav({ open, setOpen }: MobileNavProps) {
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
                <a className="text-xl font-semibold" href="/">AZ</a>
            </div>
            <div className="flex flex-col ml-4">
                <a className="text-xl font-medium my-4" href="/about" onClick={() => setTimeout(() => { setOpen(!open) }, 100)}>
                    About
                </a>
                <a className="text-xl font-normal my-4" href="/contact" onClick={() => setTimeout(() => { setOpen(!open) }, 100)}>
                    Contact
                </a>
                <a className="text-xl font-medium my-4" href="/register" onClick={() => setTimeout(() => { setOpen(!open) }, 100)}>
                    Register
                </a>
                <a className="text-xl font-normal my-4" href="/login" onClick={() => setTimeout(() => { setOpen(!open) }, 100)}>
                    Login
                </a>
            </div>
        </div>
    );
}

export default function Navbar({ currentUser }: UserMenuProps) {
    const [open, setOpen] = useState(false);

    return (
        <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
            <MobileNav open={open} setOpen={setOpen} />
            <div className="w-3/12 flex items-center">
                <a className="text-2xl font-semibold" href="/">AZ | {currentUser?.name}</a>
            </div>
            <div className="w-9/12 flex justify-end items-center">
                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open);
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>
                <div className="hidden md:flex m-10 gap-5">
                    <Link href="/">
                        Home
                    </Link>
                    {/* <Link href="/contact">
                        CONTACT
                    </Link>
                    <Link href="/about">
                        ABOUT
                    </Link> */}
                    <Link href={currentUser ?'/create':'/register'}>
                        Create
                    </Link>
                    {
                        currentUser ?
                            <div>
                                <Link href="/" onClick={() => signOut()} className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"'>
                                    Log Out
                                </Link>
                            </div>
                            : <div>
                                <Link href="/register" className='
                    text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"'>
                                    Register
                                </Link>
                                <Link href="/login" className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"'>
                                    Login
                                </Link>
                            </div>
                    }


                </div>
            </div>
        </nav>
    );
}
