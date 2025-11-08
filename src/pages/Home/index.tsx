import { images } from "../../functions/images";

const Home = () => {
  return (
    <section className="relative">
      <img src={images["bgHome"].src} className="h-screen w-full absolute" />
    </section>
  );
};

export default Home;
