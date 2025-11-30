import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { User } from "../../types/user";
import toast from "react-hot-toast";
import { blogsURL, usersURL } from "../../constants/urls/backend";
import type { Blog } from "../../types/blog";
import { LockIcon } from "lucide-react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux_toolkit/store/hooks";
import BlogBox from "../../components/ui/BlogBox";
import { visitedUserThunkActions } from "../../redux_toolkit/reducers/visitedUserFollow";
import NavigationOverlay from "../../components/ui/NavigationOverlay";

import ProfileHero from "./Hero";
type Medium = "id" | "username";
const Profile = () => {
  const { user } = useAppSelector((state) => state.user);
  const { medium, value } = useParams<{ medium: Medium; value: string }>();
  const [author, setAuthor] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [fullName, setFullName] = useState<string>("");
  const visitedUser = useAppSelector((state) => state.visitedUser);
  const [navBox, setNavBox] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // for showing info about premium account

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(`${usersURL}/profile/${medium}/${value}`);
        const data: { success: boolean; author?: User; message?: string } =
          await response.json();

        if (data.success) {
          setAuthor(data.author!);
          const { firstName, middleName, lastName } = data.author!.fullName;
          setFullName(firstName + " " + middleName + " " + lastName);
        } else {
          setError(data.message!);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching user");
        setError("Client side Error");
      }
    };
    console.log(medium, value);
    fetchAuthor();
  }, []);

  useEffect(() => {
    if (!author) {
      return;
    }
    const fetchFollowInfo = async () => {
      await dispatch(
        visitedUserThunkActions.fetchFollowDetails({ userId: author!._id })
      );
    };
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${blogsURL}/all/${author._id}`);
        console.log(`${blogsURL}/all/${author._id}`);
        const data = await response.json();

        if (data.success) {
          console.log(data);
          setBlogs(data.blogs);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching user");
        setError("Client side Error");
      }
    };
    console.log(medium, value);
    if (!visitedUser.userId) {
      fetchFollowInfo();
    }

    fetchBlogs();
  }, [author]);

  return (
    <section className="theme h-full relative  pr-5 overflow-y-auto">
      {navBox && (
        <NavigationOverlay
          close={() => {
            setNavBox(false);
          }}
          navs={[{ label: "Login", link: "/out/login" }]}
          message="You are not logged in"
        />
      )}

      {author ? (
        <div className="h-full flex flex-col gap-[5%]">
          <ProfileHero
            author={author}
            fullName={fullName}
            setNavBox={setNavBox}
            blogs={blogs}
          />
          {author.isPublic ||
          visitedUser.followers[user?._id || ""] ||
          user?._id === visitedUser.userId ? (
            <div className="sticky top-0  flex flex-wrap px-4">
              <div className="md:w-[30%] p-2">
                <h3 className="text-3xl mb-4">About author</h3>
                <p>{author.aboutMe || "Nothing here"}</p>
              </div>
              <div className="md:w-[70%] p-2 h-[200px] md:h-full overflow-y-auto">
                <h3 className="text-3xl mb-4">Blogs from the Author</h3>

                <ul className="list-none flex gap-4 flex-wrap">
                  {blogs.map((blogItem, idx) => (
                    <BlogBox
                      key={idx}
                      blog={blogItem}
                      author={{
                        fullName: author.fullName,
                        authorId: author._id,
                      }}
                    />
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-40 center">
              <LockIcon size={40} />
              <p className="text-[12px]  text-gray-500">
                This account is private
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="center">
          <p className="text-red-500 text-2xl">{error}</p>
        </div>
      )}
    </section>
  );
};

export default Profile;
