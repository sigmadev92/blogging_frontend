import { useAppSelector } from "../../../redux_toolkit/store/hooks";
import Body from "./Body";

import Header from "./Header";

const Right = ({ tab }: { tab: string }) => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="w-[80%] h-[90%] rounded-xl outline-1 outline-black dark:outline-white p-2">
      <Header user={user!} />

      <Body tab={tab} />
    </div>
  );
};

export default Right;
