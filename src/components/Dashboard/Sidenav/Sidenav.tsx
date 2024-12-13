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

export default function SideNav({ setIsCollapsed, isCollapsed }: {  setIsCollapsed: (value: boolean) => void; isCollapsed: boolean }) {
  const { user, loadUser, logout } = useStore();
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
    open: { width: "240px", transition: { delay: 0.125 } },
    collapsed: { width: "80px", transition: { delay: 0.125 } },
  };

  return (
    <motion.nav
      className={`flex h-full w-full flex-col bg-white shadow-md ${
        isMobile ? "w-full" : "md:w-[240px]"
      }`}
      animate={!isMobile ? (isCollapsed ? "collapsed" : "open") : undefined}
      variants={!isMobile ? sideNavVariants : undefined}
    >
      <div
        className={`p-4 flex items-center justify-center md:items-start md:justify-start transition-all duration-300`}
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-primary"
        >
          <BsGlobe
            className={`h-8 w-8 rotate-[15deg] ${isCollapsed ? "m-2" : ""}`}
          />
          <span
            className={`text-lg flex gap-2 transition-opacity duration-300 ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            Reservas <p>App</p>
          </span>
        </Link>
      </div>

      <div className="flex grow justify-between md:flex-col">
        <NavLinks isCollapsed={isCollapsed} isMobile={isMobile} />
        <div className="flex md:flex-col md:items-start md:justify-start gap-3 p-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden text-primary md:block"
            aria-label="Toggle SideNav"
          >
            {isCollapsed ? (
              <BiArrowToRight size={24} />
            ) : (
              <BiArrowToLeft size={24} />
            )}
          </button>
          {user?.image ? (
            <Image
              src={user.image}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300" />
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-primary"
          >
            <CiPower className="h-6 w-6 text-3xl font-bold text-primary" />
            {!isCollapsed && (
              <motion.span
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
                className={`text-xs font-medium ${isMobile ? "hidden" : ""}`}
              >
                Cerrar Sesión
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
