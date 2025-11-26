import { useState } from "react";
import ConnectionsLeft from "./Left";
import ChatFeature from "./Right";
const Connections = () => {
  const [tab, setTab] = useState<string>("0");
  return (
    <div className="h-full">
      <div className="h-[15%]">
        <h3 className="font-bold">My Connections</h3>
        <p className="text-[0.8rem] text-gray-600">
          View your friends, followers, following and pending requests
        </p>
      </div>
      <div className="h-[85%] justify-around flex flex-wrap">
        <ConnectionsLeft tab={tab} setTab={setTab} />
        <ChatFeature />
      </div>
    </div>
  );
};

export default Connections;
