import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section id="inicio" className="relative bg-gray-100 py-20">
      <Image
        src="/images/site/Hero/Hero.jpg"
        alt="Imagen del restaurante"
        width={1600}
        height={1200}
        className="absolute inset-0 h-[80vh] w-full object-cover"
      />
      <div className="container relative z-10 mx-auto px-6">
        <h1 className="text-center text-6xl font-bold text-white">
          Bienvenidos a El Buen Sabor
        </h1>
        <p className="mt-4 text-center text-2xl text-white">
          Disfruta de la mejor experiencia culinaria en la ciudad
        </p>
      </div>
    </section>
  );
};

export default Hero;
