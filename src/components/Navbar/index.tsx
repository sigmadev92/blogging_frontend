import Left from "./Left";
import Right from "./Right";
const Navbar = () => {
  return (
    <header className="flex justify-between px-8 py-2 fixed z-10 w-full box-border top-0 left-0  text-black dark:text-white">
      <Left />
      <Right />
    </header>
  );
};

export default Navbar;
