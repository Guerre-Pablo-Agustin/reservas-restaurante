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
  hide,
  isMobile,
}: {
  hide: boolean;
  isMobile: boolean;
}) {
  const pathName = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
      className="flex w-[60%] justify-between gap-2 px-4 md:w-full md:flex-col"
    >
      {Links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-start gap-2 rounded-md p-8 text-sm font-medium transition-all duration-300 md:p-3 ${
              pathName === link.href
                ? "bg-sky-100 text-blue-600"
                : "bg-gray-50 text-gray-800 hover:bg-sky-100 hover:text-blue-600"
            }`}
          >
            <LinkIcon className="h-6 w-6 text-3xl font-bold text-blue-600" />
            {!hide && (
              <motion.span
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
                className={`text-xs font-medium ${isMobile ? "hidden" : ""}`}
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
