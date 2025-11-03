import type { User } from "../../../types/user";

const Header = ({ user }: { user: User }) => {
  return (
    <div className="flex justify-between border-b ">
      <h3 className="text-[1.2rem]">
        {user?.fullName.firstName + " " + user?.fullName.lastName}
      </h3>
      <b>{user?.role}</b>
    </div>
  );
};

export default Header;
