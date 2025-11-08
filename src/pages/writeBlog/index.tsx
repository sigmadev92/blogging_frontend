import { useState, type ChangeEvent, type FormEvent } from "react";
import TextInput from "../../components/ui/TextInput";
import CustomTextArea from "../../components/ui/TextArea";
import MultipleValues from "../../components/ui/MultipleValues";
import CustomButton from "../../components/ui/Button";
import toast from "react-hot-toast";
import { _default } from "../../functions/images";
import { useAppDispatch } from "../../redux_toolkit/store/hooks";
import { LoaderActions } from "../../redux_toolkit/reducers/loaderReducer";
import { blogsURL } from "../../functions/backend";

import NavigationOverlay from "../../components/ui/NavigationOverlay";
import { ImageIcon } from "lucide-react";

const WriteBlog = () => {
  type Phase = "filling" | "saved" | "publishing" | "published";
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const [searchTags, setSeachTags] = useState<string[]>([]);
  const [thumbnailForm, setThumbnailForm] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isNavigationBox, setIsNaigationBox] = useState<boolean>(false);
  const [phase, setPhase] = useState<Phase>("filling");
  const headingMap = {
    filling: ["Unsaved", "Create New Blog"],
    saved: ["Blog Saved", "Add Thumbnail"],
    publishing: ["Thumbnail Added", "Publish Now"],
    published: ["Brilliant Work", "Published"],
  };

  const dispatch = useAppDispatch();
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
  const addToDb = async (e: FormEvent) => {
    e.preventDefault();
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
        <div>
          <h3>{headingMap[phase][0]}</h3>
          <h2 className="text-2xl text-purple-500">{headingMap[phase][1]}</h2>
        </div>

        <div className="flex gap-2">
          <CustomButton
            variant="regular-confirm"
            btnType={"submit"}
            formRef={"details"}
          >
            Save
          </CustomButton>
          <CustomButton
            disabled={phase === "filling"}
            variant="regular-confirm"
            onClick={() => setThumbnailForm(true)}
          >
            Add Thumbnail
          </CustomButton>
          <CustomButton
            variant={"regular-confirm"}
            disabled={phase !== "publishing"}
            onClick={publishBlog}
          >
            Publish
          </CustomButton>
        </div>
      </div>
      <div className="overflow-scroll pt-16 h-full">
        <form
          className="flex flex-col md:flex-row md:justify-between gap-y-4 w-full"
          onSubmit={addToDb}
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
                    src={_default.thumbnail[0]}
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
                  Cancel
                </CustomButton>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WriteBlog;
