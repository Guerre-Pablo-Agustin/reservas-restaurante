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
          className="z-0"
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
        <button className="mt-6 rounded bg-primary px-4 py-2 text-lg font-semibold text-white hover:bg-primary-dark">
          Hacer una Reserva
        </button>
      </div>
    </section>
  );
};

export default Hero;