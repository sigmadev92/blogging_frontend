import { useEffect, useState } from "react";
import CustomButton from "../../components/ui/Button";
import { SearchIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { heroLinks } from "../../constants/objects/heroLinks";
import { blogsURL } from "../../constants/urls/backend";

const Hero = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${blogsURL}/all`, {
          method: "GET",
        });
        const data = await response.json();

        setBlogs(data.blogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <div className="h-screen w-full top-11 flex flex-col items-center">
      <p>Welcome to the</p>
      <h2 className="text-5xl font-bold">BlogsEra</h2>
      <form className="w-full md:w-[45%] flex justify-between px-5 my-5">
        <input
          type={"search"}
          name="search"
          placeholder="search a topic like cricket"
          className="w-[90%] border-light input-custom"
        />
        <CustomButton variant="regular-dark">
          <span className="flex gap-2 items-center">
            <SearchIcon size={12} />
          </span>
        </CustomButton>
      </form>
      <div>
        <ul className="flex list-none gap-4">
          {heroLinks.map(({ label, href }, idx) => (
            <li key={idx}>
              <NavLink
                to={href}
                className={
                  "text-[12px] bg-gray-600 rounded px-3 py-1 text-white"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col w-full px-5">
        <h3 className="text-2xl ">Top Blogs this month</h3>
        <div className="flex justify-center items-center">
          {blogs.length > 0 ? <div></div> : <div>No blogs found</div>}
        </div>
      </div>
    </div>
  );
};

export default Hero;
