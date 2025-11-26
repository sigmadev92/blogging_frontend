import Analytics from "./Analytics";
import Comments from "./Comments";
import Complaints from "./Complaints";
import EditProfile from "./EditProfile/index";
import Connections from "./Connections";
import Likes from "./Likes";
import Overview from "./Overview";
import Posts from "./Posts";
import Settings from "./Settings";
import Subscriptions from "./Subscriptions";
import YourActivity from "./YourActivity";

const Body = ({ tab }: { tab: string }) => {
  return (
    <div className="p-2 h-[95%] overflow-hidden">
      {tab === "Overview" && <Overview />}
      {tab === "Edit Profile" && <EditProfile />}
      {tab === "Analytics" && <Analytics />}
      {tab === "Likes" && <Likes />}
      {tab === "Comments" && <Comments />}
      {tab === "Connections" && <Connections />}
      {tab === "Complaints" && <Complaints />}
      {tab === "Posts" && <Posts />}
      {tab === "Subscriptions" && <Subscriptions />}
      {tab === "Settings" && <Settings />}
      {tab === "My Activity" && <YourActivity />}
    </div>
  );
};

export default Body;
