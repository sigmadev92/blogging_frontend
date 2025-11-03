import { BoltIcon } from "lucide-react";
import CustomButton from "../../components/ui/Button";
import { dbLefttabs } from "../../functions/constants/dashboard";

const Left = ({
  tab,
  setTab,
}: {
  tab: string;
  setTab: (ele: string) => void;
}) => {
  return (
    <div className=" rounded-xl bg-[#b6b6b945] h-[450px]   p-2 flex flex-col gap-2 w-[15%]">
      <CustomButton>
        <span className="flex gap-2 items-center">
          <BoltIcon color="gray" /> <b>Dashboard</b>{" "}
        </span>
      </CustomButton>
      <hr />
      <div className="max-h-[400px] overflow-y-auto">
        <ul className="list-none flex flex-col gap-1">
          {dbLefttabs.map((listItem, idx) => (
            <li
              onClick={() => setTab(listItem.label)}
              key={idx}
              className={`text-[15px] hover:bg-blue-400 cursor-pointer px-2 ${
                listItem.label === tab
                  ? "bg-[#1e67c0] text-white font-bold"
                  : ""
              }`}
            >
              {listItem.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Left;
