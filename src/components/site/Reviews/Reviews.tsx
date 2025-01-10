'use client'
import { reviews } from './data.reviews'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { FaStar } from 'react-icons/fa'
import Image from 'next/image'

// Importar estilos de Swiper
import 'swiper/css'
import 'swiper/css/pagination'

const Reviews = () => {
    return (
        <section className="py-16 bg-gray-50" id="reviews">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Lo que dicen nuestros clientes</h2>
                    <p className="text-gray-600">Experiencias compartidas por quienes nos han visitado</p>
                </div>
                
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="py-8"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex items-center mb-4">
                                    <div className="relative w-12 h-12 mr-4">
                                        <Image
                                            src={review.image || '/avatars/default-avatar.jpg'}
                                            alt={review.name}
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{review.name}</h3>
                                        <div className="flex">
                                            {[...Array(5)].map((_, index) => (
                                                <FaStar
                                                    key={index}
                                                    className={`w-4 h-4 ${
                                                        index < review.rating
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">&quot;{review.comment}&quot;</p>
                                <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default Reviews
