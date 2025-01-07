import Image from 'next/image'
import React from 'react'
import { menuData } from './menu.data'

const Menu = () => {



  return (
    <section id="menu" className="py-20 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-10">Nuestro Menú</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {menuData.map(({name, description, image }, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300">
                  <Image
                    src={image}
                    alt={name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{name}</h3>
                    <p className="text-gray-600">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}

export default Menu