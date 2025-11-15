import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  useEffect(() => {
    console.log(params);
  }, []);
  return (
    <section className="pt-11">
      <h2></h2>
    </section>
  );
};

export default Profile;
