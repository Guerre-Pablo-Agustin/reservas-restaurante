import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section id="inicio" className="relative bg-gray-100 py-20">
      <div className="absolute inset-0 h-[80vh] w-full">
        <Image
          src="/images/site/Hero/Hero.jpg"
          alt="Imagen del restaurante"
          layout="fill"
          objectFit="cover"
          className="z-0 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="container relative z-10 mx-auto px-6 py-10 text-center">
        <h1 className="text-4xl font-bold text-white md:text-6xl">
          Bienvenidos a El Buen Sabor
        </h1>
        <p className="mt-4 text-xl text-white md:text-2xl">
          Disfruta de la mejor experiencia culinaria en la ciudad
        </p>
        <div className="mx-auto mt-6 w-48 rounded-full bg-primary px-4 py-2 text-lg font-semibold text-white hover:bg-primary/90 hover:scale-110 transition-transform duration-300 animate-bounce">
          <a href="#reserva">Hacer una Reserva</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
