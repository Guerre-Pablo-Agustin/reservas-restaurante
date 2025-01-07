import Image from 'next/image'
import React from 'react'
import ReservationForm from './ReservationForm'

const Reserva = () => {
  return (
    <section id="reserva" className="py-20 bg-gray-100">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-semibold text-center mb-8">Reserva una Mesa</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0 flex items-center justify-center">
          <Image
            src="/images/site/reserva/reserva.jpg"
            alt="Reserva una mesa"
            width={1000}
            height={800}
            className="rounded-lg shadow-xl w-[80%]"
          />
        </div>
        <div className="md:w-1/2 md:pl-10">
          <ReservationForm />
        </div>
      </div>
    </div>
  </section>
  )
}

export default Reserva