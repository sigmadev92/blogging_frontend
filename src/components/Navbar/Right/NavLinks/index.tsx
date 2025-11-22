import { FollowActions } from "../../../../redux_toolkit/reducers/followReducer";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux_toolkit/store/hooks";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

const NavLinks = () => {
  const { loggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <nav>
      <button onClick={() => dispatch(FollowActions.show())}>test</button>
      <ul className="flex gap-2 items-center">
        {loggedIn ? <LoggedIn /> : <LoggedOut />}
      </ul>
    </nav>
  );
};

export default NavLinks;
