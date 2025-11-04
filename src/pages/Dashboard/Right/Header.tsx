import { LayoutGrid } from "lucide-react";
import type { User } from "../../../types/user";
import CustomButton from "../../../components/ui/Button";

const Header = ({
  user,
  setIsMenuOpened,
}: {
  user: User;
  setIsMenuOpened: () => void;
}) => {
  return (
    <div className="flex justify-between border-b ">
      <div className="flex gap-0.5 items-center ">
        <CustomButton className="visible sm:hidden" onClick={setIsMenuOpened}>
          <LayoutGrid color="gray" size={16} />
        </CustomButton>
        <h3 className="text-[1.2rem]">
          {user?.fullName.firstName + " " + user?.fullName.lastName}
        </h3>
      </div>
      <b>{user?.role}</b>
    </div>
  );
};

export default Header;
