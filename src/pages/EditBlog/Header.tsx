import { CornerUpLeftIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import CustomButton from "../../components/ui/Button";
import { useAppDispatch } from "../../redux_toolkit/store/hooks";
import { myBlogAsyncActions } from "../../redux_toolkit/AsyncThunkActions/blog";

const EditBlogHeader = ({
  phase,
  isBlogPublic,
  publishBlog,
  setThumbnailForm,
  currentBlogId,
  status,
}: {
  currentBlogId: string;
  publishBlog: (e: string) => void;
  setThumbnailForm: (e: boolean) => void;
  isBlogPublic: boolean;
  status: string;
  phase: "filling" | "saved" | "publishing" | "published";
}) => {
  const dispatch = useAppDispatch();
  const headingMap = {
    filling: ["Unsaved", "Create New Blog"],
    saved: ["Blog Saved", "Add Thumbnail"],
    publishing: ["Thumbnail Added", "Publish Now"],
    published: ["Published", "Edit your Blog"],
  };
  return (
    <div className="fixed top-11 left-0 w-full backdrop-blur-2xl px-4  box-border z-3 flex justify-between items-center dark:bg-black bg-white">
      <div className="flex gap-2 items-center">
        <div className={"bg-blue-600 rounded px-2 py-1 text-white"}>
          <NavLink to={"/in/dashboard"}>
            <CornerUpLeftIcon size={14} />
            <span className="text-[12px]">Blogs</span>
          </NavLink>
        </div>
        <div>
          <h3>{headingMap[phase][0]}</h3>
          <h2 className="text-2xl text-purple-500">
            {headingMap[phase][1]} ({isBlogPublic ? "Public" : "Private"})
          </h2>
        </div>
      </div>

      <div className="flex gap-2">
        <CustomButton
          disabled={phase === "filling"}
          variant="regular-confirm"
          onClick={() => setThumbnailForm(true)}
        >
          Add Thumbnail
        </CustomButton>
        <CustomButton
          variant="regular-confirm"
          btnType={"submit"}
          formRef={"details"}
        >
          {status}
        </CustomButton>
        {phase !== "published" ? (
          <CustomButton
            variant={"regular-confirm"}
            disabled={!["publishing", "published"].includes(phase)}
            onClick={() => publishBlog(currentBlogId)}
          >
            Publish
          </CustomButton>
        ) : (
          <div className="relative">
            <CustomButton
              variant="regular-dark"
              onClick={() =>
                dispatch(myBlogAsyncActions.toggleVisibility(currentBlogId))
              }
            >
              <>Make it {isBlogPublic ? "Private" : "Public"}</>
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBlogHeader;
