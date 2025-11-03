import { MoonIcon, SunIcon } from "lucide-react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux_toolkit/store/hooks";
import { ThemeActions } from "../../redux_toolkit/reducers/themeReducer";
import CustomButton from "../ui/Button";
const Navbar = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);
  return (
    <header className="flex justify-between px-8 py-1 bg-white text-black dark:bg-black dark:text-white">
      <div>
        <h1 className="font-bold">BlogsEra</h1>
      </div>
      <nav>
        <CustomButton
          onClick={() => {
            dispatch(ThemeActions.toggleTheme());
          }}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </CustomButton>
      </nav>
    </header>
  );
};

export default Navbar;
