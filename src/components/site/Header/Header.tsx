"use client";

import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Navbar } from "../Navbar/Navbar";

export function Header() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <section className="container mx-auto flex w-full items-center justify-between gap-4 px-10 py-4">
        <div className="flex w-full items-center justify-between px-4">
          <Link href="/">
            <p className="text-2xl font-bold">
              <span className="text-white hover:text-primary transition-colors">
                El Buen Sabor
              </span>
            </p>
          </Link>

          <Navbar openMobileMenu={openMobileMenu} />
        </div>
        
        <div className="md:hidden">
          <button
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
            className="rounded bg-white/10 backdrop-blur-sm px-4 py-2 text-3xl text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white/20"
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
      </section>
    </header>
  );
}
