import { useAppSelector } from "../../redux_toolkit/store/hooks";
import styles from "./Loader.module.css";
const Loader = () => {
  const { waitMessage } = useAppSelector((state) => state.loader);
  return (
    <div className="absolute top-0 left-0 z-2 h-full w-full bg-[#000000c2] flex justify-center items-center">
      <div>
        <div className={`animate-spin mx-auto ${styles.Loader}`}></div>
        <p className="text-white text-3xl mt-3">
          Please wait {waitMessage} ...
        </p>
      </div>
    </div>
  );
};

export default Loader;
