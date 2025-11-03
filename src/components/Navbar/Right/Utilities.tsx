import { Github, MoonIcon, SunIcon } from "lucide-react";
import CustomButton from "../../ui/Button";
import { ThemeActions } from "../../../redux_toolkit/reducers/themeReducer";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux_toolkit/store/hooks";

const Utilities = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);
  return (
    <div className="flex gap-2 items-center">
      <a
        href="https://github.com/sigmadev92/blogging_frontend"
        className="p-1 rounded-2xl "
      >
        <Github color={theme === "dark" ? "white" : "black"} size={14} />
      </a>
      <CustomButton
        onClick={() => {
          dispatch(ThemeActions.toggleTheme());
        }}
      >
        {theme === "light" ? <MoonIcon size={14} /> : <SunIcon size={14} />}
      </CustomButton>
    </div>
  );
};

export default Utilities;
