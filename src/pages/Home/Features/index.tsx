import { images } from "../../../constants/images/credits";

const Features = () => {
  return (
    <div className="h-screen pt-11 flex flex-col gap-4 items-center theme">
      <h3 className="text-4xl font-bold">Not just some blogs!</h3>
      <div className="flex flex-col justify-between items-center w-full h-[90%]">
        <h3 className="text-2xl">
          Read Novels , read stories, science topics{" "}
        </h3>
        <div className="flex justify-around w-full">
          <img className="h-40 w-44" src={images["girlReadingBook"].src} />
          <img className="h-40 w-36" src={images["girlHoldingBook"].src} />
        </div>
      </div>
    </div>
  );
};

export default Features;
