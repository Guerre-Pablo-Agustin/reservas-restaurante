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

export default function NavLinks({ hide }: { hide: boolean }) {
  const pathName = usePathname();

  return (
    <div className="flex flex-col gap-2">
      {Links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center rounded-md p-2 text-sm font-medium transition-all duration-300 ${
              pathName === link.href
                ? "bg-sky-100 text-blue-600"
                : "bg-gray-50 text-gray-800 hover:bg-sky-100 hover:text-blue-600"
            }`}
          >
            {/* Ícono del enlace */}
            <LinkIcon className="w-5 h-5" />
            {/* Nombre del enlace con visibilidad responsiva */}
            <span
              className={`ml-2 transition-all duration-300 ${
                hide ? "hidden md:inline" : "inline"
              }`}
            >
              {link.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
