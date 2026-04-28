import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ThoughtCard from "@/components/ThoughtCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col gap-16 md:gap-[120px]">
        <Hero />
        <About />
        <Projects />
        <Process />
        <ThoughtCard />
        <Stack />
        <Footer />
      </div>
    </main>
  );
}
