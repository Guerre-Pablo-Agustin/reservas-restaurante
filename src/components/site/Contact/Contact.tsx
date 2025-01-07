import Image from 'next/image'
import React from 'react'

const Contact = () => {
  return (
    <section id="contacto" className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pl-10">
                <h2 className="text-3xl font-semibold mb-4">Contacto</h2>
                <p className="text-lg mb-2">
                  Estamos ubicados en Calle Principal 123, Ciudad.
                </p>
                <p className="text-lg mb-2">
                  Teléfono: (123) 456-7890
                </p>
                <p className="text-lg mb-2">
                  Email: info@elbuensabor.com
                </p>
                <p className="text-lg">
                  Horario: Lunes a Domingo, 12:00 PM - 10:00 PM
                </p>
              </div>
              <div className="md:w-1/2 mb-6 md:mb-0 flex items-center justify-center">
                <Image
                  src="/images/site/contact/contacto.jpg"
                  alt="Ubicación del restaurante"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl w-[60%]"
                />
              </div>
            </div>
          </div>
        </section>
  )
}

export default Contact