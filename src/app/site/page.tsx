import About from "@/components/site/About/About"
import Contact from "@/components/site/Contact/Contact"
import Footer from "@/components/site/Footer/Footer"
import { Header } from "@/components/site/Header/Header"
import Hero from "@/components/site/Hero/Hero"
import Menu from "@/components/site/Menu/Menu"
import Reserva from "@/components/site/Reserva/Reserva"
import Reviews from "@/components/site/Reviews/Reviews"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Restaurante Site",
  description: "Restaurante Site",
};


const page = () => {
  return (
    <>
        <Header />
        <main className="gap-4">
        <Hero />
        <About />
        <Menu />
        <Reviews />
        <Contact />
        <Reserva />
        </main>
        <Footer />
    </>
  )
}

export default page