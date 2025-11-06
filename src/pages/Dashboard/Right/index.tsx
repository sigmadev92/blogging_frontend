import { useState } from "react";
import { useAppSelector } from "../../../redux_toolkit/store/hooks";
import Body from "./Body";

import Header from "./Header";
import Left from "../Left";

const Right = ({
  tab,
  setTab,
}: // setTab,
{
  tab: string;
  setTab: (ele: string) => void;
}) => {
  const { user } = useAppSelector((state) => state.user);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleDbMenu = () => {
    setIsMenuOpened((prev) => !prev);
    console.log(isMenuOpened);
  };
  return (
    <div className="w-full sm:w-[80%] h-[90%] rounded-xl outline-1 outline-black dark:outline-white p-2 relative">
      <Header user={user!} setIsMenuOpened={handleDbMenu} />
      {isMenuOpened && (
        // <span>asas</span>
        <Left
          tab={tab}
          setTab={setTab}
          className="absolute top-10 left-0 w-fit z-20 dark:bg-black dark:text-white bg-white text-black sm:hidden"
        />
      )}
      <Body tab={tab} />
    </div>
  );
};

export default Right;
