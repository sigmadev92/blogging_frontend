import { InfoIcon, LayoutGrid } from "lucide-react";
import type { User } from "../../../types/user";
import CustomButton from "../../../components/ui/Button";
import { useState } from "react";

const Header = ({
  user,
  setIsMenuOpened,
}: {
  user: User;
  setIsMenuOpened: () => void;
}) => {
  const [isInfo, setInfo] = useState(false);

  const handleClick = () => {
    setInfo((prev) => !prev);
  };
  return (
    <div className="flex justify-between border-b ">
      <div className="flex gap-0.5 items-center ">
        <CustomButton className="visible sm:hidden" onClick={setIsMenuOpened}>
          <LayoutGrid color="gray" size={16} />
        </CustomButton>
        <h3>{user?.fullName.firstName + " " + user?.fullName.lastName}</h3>
      </div>
      <div className="flex gap-2 items-center relative">
        <b className="capitalize">{user?.role}</b>
        <CustomButton onClick={handleClick}>
          <InfoIcon size={16} />
        </CustomButton>

        {isInfo && (
          <div className="absolute right-0 top-8 w-[170px] rounded bg-white text-black dark:bg-black dark:text-[aqua] text-[12px] p-2 border">
            <p>
              You haven't started writing blogs yet. You become <b>Author</b> on
              publishing a blog
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
