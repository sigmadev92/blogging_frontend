import Analytics from "./Analytics";
import Comments from "./Comments";
import Complaints from "./Complaints";
import EditProfile from "./EditProfile/index";
import Followers from "./Followers";
import Following from "./Following";
import Likes from "./Likes";
import Overview from "./Overview";
import PaidFeatures from "./PaidFeatures";
import Posts from "./Posts";
import Settings from "./Settings";
import Subscriptions from "./Subscriptions";
import YourActivity from "./YourActivity";

const Body = ({ tab }: { tab: string }) => {
  return (
    <>
      {tab === "Overview" && <Overview />}
      {tab === "Edit Profile" && <EditProfile />}
      {tab === "Analytics" && <Analytics />}
      {tab === "Likes" && <Likes />}
      {tab === "Comments" && <Comments />}
      {tab === "Followers" && <Followers />}
      {tab === "Following" && <Following />}
      {tab === "Complaints" && <Complaints />}
      {tab === "Posts" && <Posts />}
      {tab === "Subscriptions" && <Subscriptions />}
      {tab === "Paid Features" && <PaidFeatures />}
      {tab === "Settings" && <Settings />}
      {tab === "Your Activity" && <YourActivity />}
    </>
  );
};

export default Body;
