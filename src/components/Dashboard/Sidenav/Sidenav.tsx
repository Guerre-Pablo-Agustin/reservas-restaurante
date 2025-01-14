"use client";

import Link from "next/link";
import NavLinks from "./NavLinks";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { CiPower } from "react-icons/ci";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { useUserStore } from "@/store";

export default function SideNav({
  setIsCollapsed,
  isCollapsed,
}: {
  setIsCollapsed: (value: boolean) => void;
  isCollapsed: boolean;
}) {
  const { currentUser, checkAuth, logout } = useUserStore();
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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

  console.log("user", currentUser);

  return (
    <motion.nav
      className={`flex h-full w-full flex-col bg-white shadow-md ${
        isMobile ? "w-full" : "md:w-[200px]"
      }`}
      animate={!isMobile ? (isCollapsed ? "collapsed" : "open") : undefined}
      variants={!isMobile ? sideNavVariants : undefined}
    >
      <div
        className={`flex items-center justify-center p-4 transition-all duration-300 md:items-start md:justify-start`}
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-primary"
        >
          <BsGlobe
            className={`h-8 w-8 rotate-[15deg] ${isCollapsed ? "" : ""}`}
          />
          {!isCollapsed && (
            <motion.span
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className={`text-xs font-medium ${isMobile ? "hidden" : ""}`}
            >
              Reservas App
            </motion.span>
          )}
        </Link>
      </div>

      <div className="flex grow justify-between md:flex-col">
        <NavLinks isCollapsed={isCollapsed} isMobile={isMobile} />
        <div className="flex gap-3 p-4 md:flex-col md:items-start md:justify-start">
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

          <Image
            src="/images/avatars/hombre.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
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
