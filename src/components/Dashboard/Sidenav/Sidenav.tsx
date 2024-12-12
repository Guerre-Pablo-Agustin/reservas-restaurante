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
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Inicializa en el primer render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      className={`flex h-full w-full flex-col bg-white shadow-md ${
        isMobile ? "w-full" : "md:w-[240px]"
      }`}
      animate={!isMobile ? (hide ? "collapsed" : "open") : undefined}
      variants={!isMobile ? sideNavVariants : undefined}
    >
      <div
        className={`m-8 flex items-center justify-center transition-all duration-300 `}
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-blue-600"
        >
          <BsGlobe className="h-8 w-8 rotate-[15deg]" />
          <span
            className={`text-xl transition-opacity duration-300 ${
              hide ? "hidden" : "block"
            }`}
          >
            Reservas App
          </span>
        </Link>
      </div>

      <div className="flex grow justify-between md:flex-col">
        <NavLinks hide={hide} isMobile={isMobile} />
        <div className="flex flex-col items-center justify-center gap-3 p-4">
          <button
            onClick={() => setHide(!hide)}
            className="hidden text-blue-600 md:block"
            aria-label="Toggle SideNav"
          >
            {hide ? <BiArrowToRight size={24} /> : <BiArrowToLeft size={24} />}
          </button>
          {user?.image ? (
            <Image
              src={user.image}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300" />
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-blue-600"
          >
            <CiPower className="h-6 w-6 text-3xl font-bold text-blue-600" />
            <span
              className={`transition-opacity duration-300 ${
                hide ? "hidden" : "inline"
              } ${isMobile ? "hidden md:block" : "block"}`}
            >
              Cerrar sesión
            </span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
