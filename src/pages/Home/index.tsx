// import { images } from "../../constants/images/credits";
import Features from "./Features";
import Hero from "./Hero";

const Home = () => {
  return (
    <section className="relative h-full theme">
      {/* <img src={images["bgHome"].src} className="h-screen w-full" /> */}

      <div className="absolute h-screen w-[99%] top-0 left-0 pt-11 overflow-y-auto">
        <Hero />
        <Features />
      </div>
    </section>
  );
};

export default Home;
