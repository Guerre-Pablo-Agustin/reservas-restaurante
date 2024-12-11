"use client";

import Link from "next/link";
import NavLinks from "./NavLinks";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { CiPower } from "react-icons/ci";
import { useStore } from "@/store/store";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

export default function SideNav() {
  const { user, loadUser, logout } = useStore();
  const [hide, setHide] = useState(false);

  const router = useRouter();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogout = () => {
    const confirmed = confirm("¿Seguro que quieres cerrar tu sesión?");
    if (confirmed) {
      logout();
      router.push("/login");
    }
  };

  const sideNavVariants = {
    open: { width: "240px", transition: { duration: 0.3 } },
    collapsed: { width: "80px", transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      className="flex h-full flex-col px-3 py-4 md:px-2"
      animate={hide ? "collapsed" : "open"}
      variants={sideNavVariants}
    >
      <div className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-20  ">
        <Link
          href="/panel"
          className="flex items-center gap-2 text-blue-600 font-bold"
        >
          <BsGlobe className="h-8 w-8 rotate-[15deg]" />
          <span
            className={`text-xl transition-opacity duration-300 ${
              hide ? "opacity-0" : "opacity-100"
            }`}
          >
            Todo App
          </span>
        </Link>
        <button
          onClick={() => setHide(!hide)}
          className="text-blue-600 hidden md:block"
          aria-label="Toggle SideNav"
        >
          {hide ? <BiArrowToRight size={24} /> : <BiArrowToLeft size={24} />}
        </button>
      </div>
      <div className="flex grow  justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">

      <NavLinks hide={hide} />
      <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        {user?.image ? (
          <Image
          src={user.image}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-blue-600"
        >
          <CiPower className="w-5 h-5" />
          <span
            className={`transition-opacity duration-300 ${
              hide ? "opacity-0" : "opacity-100"
            }`}
            >
            Cerrar sesión
          </span>
        </button>
      </div>
    </motion.nav>
  );
}
