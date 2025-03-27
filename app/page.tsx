import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto sm:px--6 lg:px-8">
      <Navbar />
      <Hero />
    </main>
  );
}
