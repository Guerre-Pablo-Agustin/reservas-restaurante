"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHome, BiNews } from "react-icons/bi";
import { BsTabletFill } from "react-icons/bs";

const Links = [
  { name: "home", href: "/dashboard", icon: BiHome },
  { name: "reservas", href: "/dashboard/create", icon: BiNews },
  { name: "estadísticas", href: "/dashboard/kanban", icon: BsTabletFill },
];

export default function NavLinks({ hide, isMobile }: { hide: boolean; isMobile: boolean }) {
  const pathName = usePathname();

  return (
    <div className="flex md:flex-col gap-2 px-4 w-[60%] md:w-full justify-between">
      {Links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex  items-center gap-2 rounded-md p-3 text-sm font-medium transition-all duration-300 ${
              pathName === link.href
                ? "bg-sky-100 text-blue-600"
                : "bg-gray-50 text-gray-800 hover:bg-sky-100 hover:text-blue-600"
            }`}
          >
            <LinkIcon className="w-6 h-6 text-3xl font-bold text-blue-600" />
            <span
              className={`whitespace-nowrap transition-opacity duration-300 ${
                hide ? "hidden" : "inline"
                } ${isMobile ? "hidden md:block" : "block"}`}
            >
              {link.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
