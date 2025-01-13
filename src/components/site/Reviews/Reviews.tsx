"use client";
import { reviews } from "./data.reviews";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";

// Importar estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";

const Reviews = () => {
  return (
    <section className="bg-gray-50 py-16" id="reviews">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-600">
            Experiencias compartidas por quienes nos han visitado
          </p>
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
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`h-4 w-4 ${
                            index < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic text-gray-600">
                  &quot;{review.comment}&quot;
                </p>
                <p className="mt-2 text-sm text-gray-500">{review.date}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
