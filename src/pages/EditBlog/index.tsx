import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import TextInput from "../../components/ui/TextInput";
import CustomTextArea from "../../components/ui/TextArea";
import MultipleValues from "../../components/ui/MultipleValues";
import CustomButton from "../../components/ui/Button";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../redux_toolkit/store/hooks";
import { LoaderActions } from "../../redux_toolkit/reducers/loaderReducer";

import NavigationOverlay from "../../components/ui/NavigationOverlay";
import { CornerUpLeftIcon, ImageIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { dbMenuActions } from "../../redux_toolkit/reducers/dbMenuReducer";
import { myBlogsActions } from "../../redux_toolkit/reducers/myblogsReducer";
import { blogsURL } from "../../constants/urls/backend";
import { _default } from "../../constants/images/default";
import type { Blog } from "../../types/blog";
import { myBlogAsyncActions } from "../../redux_toolkit/AsyncThunkActions/blog";

const EditBlog = () => {
  type Phase = "filling" | "saved" | "publishing" | "published";
  const { pathname } = useLocation();
  // const { user } = useAppSelector((state) => state.user);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const [searchTags, setSeachTags] = useState<string[]>([]);
  const [thumbnailForm, setThumbnailForm] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [stringThumbnail, setStringThumbnail] = useState<string>("");
  const [isNavigationBox, setIsNaigationBox] = useState<boolean>(false);
  const [isBlogPublic, setBlogVisibility] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("Save");
  const [phase, setPhase] = useState<Phase>("saved");
  const headingMap = {
    filling: ["Unsaved", "Create New Blog"],
    saved: ["Blog Saved", "Add Thumbnail"],
    publishing: ["Thumbnail Added", "Publish Now"],
    published: ["Published", "Edit your Blog"],
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dbMenuActions.setTab("Posts"));
    const blogId = pathname.split("/")[4];

    const fetchBlog = async () => {
      try {
        const response = await fetch(`${blogsURL}/one/${blogId}`, {
          credentials: "include",
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`Request Failed ${response.status}`);
        }
        const { blog }: { blog: Blog } = await response.json();

        setTitle(blog.title);
        setCurrentBlogId(blogId);
        setDescription(blog.description);
        setSeachTags(blog.searchTags);
        setTopics(blog.topics);
        setBlogVisibility(blog.isPublic);
        if (blog.thumbnail?.publicId) {
          setPhase("publishing");
          setStringThumbnail(blog.thumbnail.secure_url);
        }
        if (blog.isPublished) {
          setPhase("published");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching blog");
      }
    };
    fetchBlog();
  }, []);

  useEffect(() => {
    if (status === "Saved") {
      setTimeout(() => {
        setStatus("Save");
      }, 1000);
    }
  }, [status]);
  const addTopic = (newTopic: string) => {
    //verified that it is not already added
    setTopics((prev) => [...prev, newTopic]);
  };
  const deleteTopic = (idx: number) => {
    setTopics((prev) => prev.filter((_, i) => i !== idx));
  };
  const addSearchTag = (newTag: string) => {
    setSeachTags((prev) => [...prev, newTag]);
  };
  const deleteSearchTag = (idx: number) => {
    setSeachTags((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      toast.error("please upload a valid profile pic");
    }
    const file = e.target.files![0];

    setThumbnail(file);
  };

  const handleSaveBtn = (e: FormEvent) => {
    e.preventDefault();
    if (phase === "filling") {
      addToDb();
      return;
    }
    updateBlog();
  };
  const addToDb = async () => {
    if (
      !title ||
      !description ||
      topics.length === 0 ||
      searchTags.length === 0
    ) {
      toast.error("Please fill every Field correctly");
      return;
    }

    console.log({ title, description, searchTags, topics });

    dispatch(LoaderActions.startLoader("Saving blog"));

    try {
      const response = await fetch(`${blogsURL}/new`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, topics, searchTags }),
      });

      const data = await response.json();

      if (data.success) {
        setCurrentBlogId(data.blogId);
        setPhase("saved");
        toast.success("blog Added Successfully.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error AT client");
    } finally {
      dispatch(LoaderActions.stopLoader());
    }
  };

  const updateBlog = async () => {
    try {
      setStatus("Saving");
      const response = await fetch(`${blogsURL}/edit/${currentBlogId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, topics, searchTags }),
      });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      dispatch(myBlogsActions.updateBlog(data.blog));
      setStatus("Saved");
    } catch (error) {
      console.log(error);
      toast.error("Error in updating blog");
    }
  };

  const addThumbnail = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentBlogId) {
      toast.error("Blog not saved yet");
      return;
    }
    if (!thumbnail) {
      toast.error("Please add a valid profile pic");
      return;
    }
    dispatch(LoaderActions.startLoader("Adding thumbnail"));
    const formData = new FormData();
    formData.append("thumbnail", thumbnail!);

    try {
      const response = await fetch(`${blogsURL}/thumbnail/${currentBlogId}`, {
        credentials: "include",
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setPhase("publishing");
        toast.success("Thumbnail added successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Cient error");
    } finally {
      dispatch(LoaderActions.stopLoader());
    }
  };

  const publishBlog = async () => {
    if (!currentBlogId) {
      toast.error("Blog not saved yet");
      return;
    }
    dispatch(LoaderActions.startLoader("Publishing blog"));
    try {
      const response = await fetch(`${blogsURL}/publish/${currentBlogId}`, {
        credentials: "include",
        method: "PUT",
      });

      const data = await response.json();

      if (data.success) {
        setPhase("published");
        setIsNaigationBox(true);

        dispatch(LoaderActions.stopLoader());
      } else {
        toast.error(data.message);
        dispatch(LoaderActions.stopLoader());
      }
    } catch (error) {
      console.log(error);
      toast.error("Some client size error");
      dispatch(LoaderActions.stopLoader());
    }
  };

  return (
    <section className="pt-11 px-4 bg-white text-black dark:bg-black dark:text-white h-full relative">
      {isNavigationBox && (
        <NavigationOverlay
          message={"Your Post has been Published"}
          navs={[
            { link: "/in/dashboard", label: "Dashboard" },
            { link: "/", label: "Home" },
          ]}
          close={() => {
            setIsNaigationBox(false);
          }}
        />
      )}
      {/* header */}
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
              onClick={publishBlog}
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
      <div className="overflow-scroll pt-16 h-full">
        <form
          className="flex flex-col md:flex-row md:justify-between gap-y-4 w-full"
          onSubmit={handleSaveBtn}
          id="details"
        >
          <div className="md:w-[70%] flex flex-col gap-3 border-light p-2">
            <TextInput
              label="Title"
              placeholder="Enter a suitable title (50-200) characters"
              inputType="text"
              name="title"
              value={title}
              handleChange={(e) => {
                setTitle(e.target.value);
              }}
              variant="regular"
            />
            <CustomTextArea
              label="Description"
              name="description"
              rows={10}
              value={description}
              styles={{
                label: "text-2xl",
                outer: "flex flex-col gap-4",
                textArea: "input-custom border-light  resize-none",
              }}
              placeholder="Write in atleast 200 characters"
              handleChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="md:w-[25%] border-light p-2 flex flex-col gap-4">
            <MultipleValues
              collector={topics}
              addToCollector={addTopic}
              deleteFromCollector={deleteTopic}
              placeholder="add a topic (3-20) characters"
              styles={{ inputField: "" }}
              label="Topics [1-5]"
              inputLength={{ min: 3, max: 20 }}
              items={{ min: 1, max: 5 }}
            />
            <MultipleValues
              collector={searchTags}
              addToCollector={addSearchTag}
              deleteFromCollector={deleteSearchTag}
              styles={{ inputField: "" }}
              label="Search Tags [1-10]"
              placeholder="add a search tag (5-50) characters"
              inputLength={{ min: 5, max: 50 }}
              items={{ min: 1, max: 10 }}
            />
          </div>
        </form>

        {thumbnailForm && (
          //overlay-bg
          <div className="absolute top-0 left-0 h-full w-full bg-[#38383b8e] backdrop-blur-[2px] z-3 flex justify-center items-center">
            <div className=" h-[80%] w-full md:w-[60%] flex flex-col md:flex-row md:justify-center items-center gap-4 shadow-xl shadow-blue-200 p-2 rounded-[2xl]">
              <div className=" w-[90%] rounded-xl overflow-hidden border">
                {!thumbnail ? (
                  <img
                    src={stringThumbnail || _default.thumbnail[0]}
                    alt="thumbnail of blog"
                    className="h-full w-full"
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt="thumbnail of blog"
                    className="w-full h-full"
                  />
                )}
              </div>
              <form
                onSubmit={addThumbnail}
                className="flex flex-col items-center justify-center gap-4  w-[30%]"
              >
                <input
                  id="thumbnail"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <CustomButton variant={"regular-dark"}>
                  <label
                    htmlFor="thumbnail"
                    className="flex gap-1 items-center cursor-pointer"
                  >
                    Choose <ImageIcon size={12} />
                  </label>
                </CustomButton>

                <CustomButton
                  btnType={"submit"}
                  variant={"regular-confirm"}
                  disabled={!thumbnail}
                >
                  Add Thumbnail
                </CustomButton>
                <CustomButton
                  variant="regular-danger"
                  btnType={"button"}
                  onClick={() => {
                    setThumbnailForm(false);
                    if (phase !== "publishing") setThumbnail(null);
                  }}
                >
                  {stringThumbnail ? "Close" : "Cancel"}
                </CustomButton>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EditBlog;
