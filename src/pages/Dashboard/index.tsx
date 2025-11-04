import { dbLefttabs } from "../../functions/constants/dashboard";
import { useState } from "react";

import Left from "./Left";
import Right from "./Right";

const Dashboard = () => {
  const [tab, setTab] = useState<string>(dbLefttabs[0].label);
  return (
    <section className="px-2 flex gap-8 pt-11 dark:bg-black h-full dark:text-white bg-white">
      <Left
        setTab={setTab}
        tab={tab}
        className="hidden sm:visible sm:flex w-[15%] h-fit"
      />
      <Right tab={tab} setTab={setTab} />
    </section>
  );
};

export default Dashboard;
