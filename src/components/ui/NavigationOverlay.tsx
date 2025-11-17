import { useNavigate } from "react-router-dom";
import CustomButton from "./Button";
import { XIcon } from "lucide-react";
const NavigationOverlay = ({
  message,
  navs,
  close,
}: {
  message: string;
  navs: { link: string; label: string }[];
  close: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full absolute top-0 left-0 z-8 bg-[#f1ebeb98] dark:bg-[#00000067] flex justify-center items-center">
      <div className="shadow-gray-500 shadow-xl w-[30%] flex flex-col gap-4 h-[30%] bg-white dark:bg-black rounded">
        <div className="p-2 flex justify-end">
          <CustomButton btnType="button" onClick={close}>
            <XIcon color={"red"} />
          </CustomButton>
        </div>

        <div className="px-10 flex flex-col gap-4">
          <h3 className="text-[2xl]">{message}</h3>
          <div className="flex gap-4 ">
            <ul className="list-none flex gap-4 items-center">
              {navs.map(({ link, label }, idx) => (
                <li key={idx}>
                  <CustomButton
                    className="hover:bg-blue-500"
                    onClick={() => navigate(link)}
                    variant={"regular-dark"}
                  >
                    {label}
                  </CustomButton>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationOverlay;
