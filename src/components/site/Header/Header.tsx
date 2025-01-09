"use client";

import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Navbar } from "../Navbar/Navbar";

export function Header() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  console.log(openMobileMenu);

  return (
    <div className="mt-5 container mx-auto my-5 flex w-[100%] items-center justify-between gap-4 rounded-md px-10">
      <div className="flex w-full items-center justify-between px-4 py-2">
        <Link href="/">
          <p className="text-xl font-bold">
            <span className=" flex bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              El Buen Sabor
            </span>
          </p>
        </Link>

        <Navbar openMobileMenu={openMobileMenu} />
      </div>
      <div className="lg:hidden">
        <button
          onClick={() => setOpenMobileMenu(!openMobileMenu)}
          className="rounded bg-gray-600 px-4 py-2 text-3xl text-white transition-transform duration-300 ease-in-out hover:cursor-pointer"
        >
          <span
            className={`inline-block transition-transform duration-300 ${
              openMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          >
            {openMobileMenu ? <IoMdClose /> : <CiMenuFries />}
          </span>
        </button>
      </div>
    </div>
  );
}
