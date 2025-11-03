import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAppSelector } from "../redux_toolkit/store/hooks";
import Loader from "../components/Loader";

const RootLayout = () => {
  const { loader } = useAppSelector((state) => state.loader);
  return (
    <div className="root-layout">
      <Navbar />
      <main className="relative">
        {loader && <Loader />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
