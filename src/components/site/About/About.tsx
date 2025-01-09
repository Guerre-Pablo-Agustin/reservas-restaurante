import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <section id="sobre-nosotros" className="mt-10  py-20">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0 flex items-center justify-center">
          <Image
            src="/images/site/about/about.jpg"
            alt="Nuestro equipo"
            width={600}
            height={400}
            className="rounded-lg shadow-xl w-[60%]"
          />
        </div>
        <div className="md:w-1/2 ">
          <h2 className="text-3xl font-semibold mb-4">Sobre Nosotros</h2>
          <p className="text-lg">
            El Buen Sabor es un restaurante familiar con más de 20 años de experiencia, 
            ofreciendo los mejores platillos de la cocina tradicional. Nuestro equipo de chefs 
            apasionados se dedica a crear experiencias culinarias inolvidables para nuestros clientes.
          </p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default About