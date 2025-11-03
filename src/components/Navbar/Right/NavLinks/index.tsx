import { useAppSelector } from "../../../../redux_toolkit/store/hooks";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

const NavLinks = () => {
  const { loggedIn } = useAppSelector((state) => state.user);
  return (
    <nav>
      <ul className="flex gap-2 items-center">
        {loggedIn ? <LoggedIn /> : <LoggedOut />}
      </ul>
    </nav>
  );
};

export default NavLinks;
