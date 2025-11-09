import { images } from "../../functions/images";
import Features from "./Features";
import Hero from "./Hero";

const Home = () => {
  return (
    <section className="relative">
      <img src={images["bgHome"].src} className="h-screen w-full z-0" />

      <div className="absolute h-screen w-[99%] top-0 left-0 pt-11 overflow-scroll">
        <Hero />
        <Features />
      </div>
    </section>
  );
};

export default Home;
