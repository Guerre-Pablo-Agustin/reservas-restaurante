"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHome, BiNews } from "react-icons/bi";
import { BsTabletFill } from "react-icons/bs";
import { motion } from "framer-motion";

const Links = [
  { name: "home", href: "/dashboard", icon: BiHome },
  { name: "reservas", href: "/dashboard/create", icon: BiNews },
  { name: "estadísticas", href: "/dashboard/kanban", icon: BsTabletFill },
];

export default function NavLinks({
  isCollapsed,
  isMobile,
}: {
  isCollapsed: boolean;
  isMobile: boolean;
}) {
  const pathName = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
      className="flex w-[60%] justify-between gap-2 px-2 md:w-full md:flex-col"
    >
      {Links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`relative flex h-full w-full items-center rounded-md transition-colors p-1 gap-2 ${
              pathName === link.href
                ? "bg-sky-100 text-primary"
                : "text-gray-800 hover:bg-sky-100 hover:text-primary"
            }`}
          >
            <LinkIcon className="h-full w-9 text-3xl font-bold text-primary " />
            {!isCollapsed && (
              <motion.span
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
                className={`text-xs font-medium text-center justify-start ${isMobile ? "hidden" : ""}`}
              >
                {link.name}
              </motion.span>
            )}
          </Link>
        );
      })}
    </motion.div>
  );
}
