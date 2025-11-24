import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { User } from "../../types/user";
import toast from "react-hot-toast";
import { blogsURL, usersURL } from "../../functions/backend";
import { _default } from "../../functions/images";
import type { Blog } from "../../types/blog";
import CustomButton from "../../components/ui/Button";
import { HandHeartIcon, MailIcon } from "lucide-react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux_toolkit/store/hooks";
import BlogBox from "../../components/ui/BlogBox";
import { visitedUserThunkActions } from "../../redux_toolkit/reducers/visitedUserFollow";
import FollowBtn from "../../components/ui/FollowBtn";
import NavigationOverlay from "../../components/ui/NavigationOverlay";
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
  const [isInfo1, setInfo1] = useState<boolean>(false);
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
    <section className="theme h-full relative">
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
          <div
            className="h-[40%] relative"
            style={{
              backgroundImage:
                author.thumbnail?.secure_url ||
                `url("https://wallpapercave.com/wp/wp8948495.jpg")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="flex gap-4 items-center absolute w-[400px] -bottom-8 left-[50%] translate-x-[-50%] backdrop-blur-md rounded p-2">
              <img
                className="rounded-full h-28 w-28"
                alt="profile"
                src={
                  author.profilePic?.secure_url ||
                  _default.profilePic[author.gender]
                }
              />
              <div className="flex flex-col gap-2 w-[280px]">
                {author.userName && (
                  <span className=" font-bold -mb-2">
                    {author.userName || "@username"}
                  </span>
                )}
                {fullName && <h2 className="font-bold">{fullName}</h2>}
                {!user ||
                  (author._id !== user._id && (
                    <>
                      <div className="flex gap-2">
                        <FollowBtn
                          user={{
                            _id: author._id,
                            fullName: author.fullName,
                            userName: author.userName,
                          }}
                          setNavBox={setNavBox}
                        />
                        <CustomButton
                          variant={"regular"}
                          className="bg-[#bc168a] hover:bg-blue-400 hover:text-white"
                        >
                          <span className="flex gap-2 items-center">
                            <HandHeartIcon size={16} />
                            <span className="">Donate</span>
                          </span>
                        </CustomButton>

                        <div className="relative">
                          <CustomButton
                            onClick={() => {
                              setInfo1((prev) => !prev);
                            }}
                          >
                            <MailIcon size={14} />
                          </CustomButton>
                          {isInfo1 && (
                            <div className="absolute top-6 -left-[150px] rounded theme border text-[12px] w-[150px] p-2">
                              <p className="font-fold text-red-500">
                                The email is hidden.
                              </p>
                              <p>
                                You need to have a premium account to see email
                                of authors
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ))}
                <div className="flex justify-around items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span>{blogs.length}</span>
                    <span className="text-[12px]">Blogs</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>{Object.keys(visitedUser.followers).length}</span>
                    <span className="text-[12px]">Followers</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>{Object.keys(visitedUser.following).length}</span>
                    <span className="text-[12px]">Following</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[55%] flex flex-wrap px-4">
            <div className="md:w-[30%] p-2">
              <h3 className="text-3xl mb-4">About author</h3>
              <p>{author.about || "Nothing here"}</p>
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
