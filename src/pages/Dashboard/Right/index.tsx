import { useState } from "react";
import { useAppSelector } from "../../../redux_toolkit/store/hooks";
import Body from "./Body";

import Header from "./Header";
import Left from "../Left";

const Right = () => {
  const { user } = useAppSelector((state) => state.user);
  const { tab } = useAppSelector((state) => state.dbMenu);

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleDbMenu = () => {
    setIsMenuOpened((prev) => !prev);
    console.log(isMenuOpened);
  };
  return (
    <div className="w-full sm:w-[80%] h-[90%] border-light relative">
      <Header
        user={user!}
        setIsMenuOpened={handleDbMenu}
        isMenuOpened={isMenuOpened}
      />
      {isMenuOpened && (
        // <span>asas</span>
        <Left className="absolute top-10 left-0 w-fit z-20 dark:bg-black dark:text-white bg-white text-black sm:hidden" />
      )}
      <Body tab={tab} />
    </div>
  );
};

export default Right;
