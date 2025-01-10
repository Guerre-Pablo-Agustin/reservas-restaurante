import { useEffect, useState } from "react";
import { dataHeader } from "./data.Header";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";


interface Props {
  openMobileMenu: boolean;
}


export function Navbar({ openMobileMenu }: Props) {
  const [isScroll, setIsScroll] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);



  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos < prevScrollPos || currentScrollPos === 0) {
        setIsScroll(false);
      } else if (currentScrollPos >= window.innerHeight - 600) {
        setIsScroll(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]); 

  return (
    <AnimatePresence>
      {isScroll ? (
        <motion.nav
          key={1}
          variants={animationNavbar}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mr-auto ml-auto md:fixed z-[9999] right-0 left-0 px-6 py-3 text-white bg-gray-400/40 top-10 rounded-3xl backdrop-blur w-fit"
        >
          <div className="md:flex hidden items-center gap-5">
            {dataHeader.map(({ id, name, link }) => (
              <Link
                href={link}
                key={id}
                className="block hover:text-primary hover:border-b-[1px] "
              >
                {name}
              </Link>
            ))}
          </div>
        </motion.nav>
      ) : (
        <div
          className={`${
            openMobileMenu
              ? "absolute top-24 bg-primary text-center w-[75%] flex flex-col rounded-lg justify-center items-center px-4 py-6 z-[9999] mx-auto "
              : "hidden"
          } gap-5 md:flex`}
        >
          {dataHeader.map(({ id, name, link }) => (
            <Link
              href={link}
              key={id}
              className="block hover:text-primary font-bold hover:border-b-[1px] text-white"
            >
             {name}
            </Link>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

const animationNavbar = {
  initial: {
    y: -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      stiffness: 100,
      damping: 20,
      type: "spring",
    },
  },
  exit: {
    y: -20,
    opacity: 0,
  },
};
