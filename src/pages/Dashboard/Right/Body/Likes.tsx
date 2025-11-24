import { useAppSelector } from "../../../../redux_toolkit/store/hooks";

import BlogBox from "../../../../components/ui/BlogBox";
import { HeartIcon } from "lucide-react";

const Likes = () => {
  const { likedBlogs } = useAppSelector((state) => state.like);
  const len = Object.keys(likedBlogs);

  return (
    <div className="h-full">
      <div className="h-[12%] ">
        <h3 className="font-bold">Likes</h3>
        <p className="text-[12px]">
          See all blogs which you have liked or disliked
        </p>
      </div>
      <div className="h-[88%]">
        {len.length > 0 ? (
          <div className="h-full overflow-y-auto">
            <ul className="flex gap-2">
              {len.map((blogItem, idx) => (
                <BlogBox
                  key={idx}
                  blog={likedBlogs[blogItem]}
                  author={{
                    authorId: likedBlogs[blogItem].authorId._id,
                    fullName: likedBlogs[blogItem].authorId.fullName,
                  }}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className="center">
            <div className="flex flex-col items-center gap-4">
              <HeartIcon size={40} />
            </div>
            <p className="text-">Wow ! You have not done likes yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Likes;
