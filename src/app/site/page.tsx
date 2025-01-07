import About from "@/components/site/About/About"
import Contact from "@/components/site/Contact/Contact"
import Footer from "@/components/site/Footer/Footer"
import Hero from "@/components/site/Hero/Hero"
import Menu from "@/components/site/Menu/Menu"
import Reserva from "@/components/site/Reserva/Reserva"


const page = () => {
  return (
    <>
        <main className="gap-4">
        <Hero />
        <About />
        <Menu />
        <Contact />
        <Reserva />
        </main>
        <Footer />
    </>
  )
}

export default page