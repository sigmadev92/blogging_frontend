import { NavLink } from "react-router-dom";
import CustomButton from "./Button";

const NavigationOverlay = ({
  message,
  navs,
  close,
}: {
  message: string;
  navs: { link: string; label: string }[];
  close: () => void;
}) => {
  return (
    <div className="h-screen w-full absolute top-0 left-0 z-5 bg-[#f1ebeb98] dark:bg-[#00000067] flex justify-center items-center">
      <div className="shadow-gray-500 shadow-xl w-[30%] justify-around flex flex-col h-[30%] bg-white dark:bg-black p-2 px-5 rounded">
        <h3 className="text-[2xl]">{message}</h3>

        <div className="flex gap-4">
          <ul className="list-none flex gap-4 items-center">
            {navs.map(({ link, label }, idx) => (
              <li key={idx}>
                <NavLink
                  to={link}
                  className={"text-[12px] bg-blue-400 rounded px-3 py-1"}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <CustomButton
            btnType="button"
            onClick={close}
            className="bg-red-400 px-3 py-1"
          >
            Cancel
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default NavigationOverlay;
