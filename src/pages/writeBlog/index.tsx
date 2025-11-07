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
import { useNavigate } from "react-router-dom";
import NavigationOverlay from "../../components/ui/NavigationOverlay";

const WriteBlog = () => {
  type Phase = "filling" | "saved" | "publishing";
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const [searchTags, setSeachTags] = useState<string[]>([]);
  const [thumbnailForm, setThumbnailForm] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [readyToPublish, setReady] = useState<boolean>(true);
  const [isNavigationBox, setIsNaigationBox] = useState<boolean>(false);
  const [phase, setPhase] = useState<Phase>("publishing");
  const headingMap = {
    filling: ["", "Create New Blog"],
    saved: ["Blog Saved", "Add Thumbnail"],
    publishing: ["Thumbnail Added", "Publish Now"],
  };

  const dispatch = useAppDispatch();
  const addTopic = (newTopic: string) => {
    //verified that it is not already added
    setTopics((prev) => [...prev, newTopic]);
  };
  const navigate = useNavigate();

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
        setReady(true);
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
      setIsNaigationBox(true);
      // toast.error("Blog not saved yet");
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
        navigate("/");

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
          close={() => setIsNaigationBox(false)}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3>{headingMap[phase][0]}</h3>
          <h2 className="text-2xl text-purple-500">{headingMap[phase][1]}</h2>
        </div>

        <div className="flex gap-2">
          <CustomButton
            className="rounded-sm bg-blue-500 text-white px-3 py-1"
            btnType={"submit"}
            formRef={"details"}
          >
            Save
          </CustomButton>
          <CustomButton
            disabled={phase === "filling"}
            className="rounded-sm bg-blue-500 text-white px-3 py-1"
            onClick={() => setThumbnailForm(true)}
          >
            Add Thumbnail
          </CustomButton>
          <CustomButton
            variant={"rounded-sm"}
            disabled={!readyToPublish}
            onClick={publishBlog}
            className="text-white bg-blue-500 px-3 py-1"
          >
            Publish
          </CustomButton>
        </div>
      </div>
      <div className="flex justify-between rounded mx-auto h-[80%] relative">
        <form
          className="flex justify-between gap-y-4 w-full"
          onSubmit={addToDb}
          id="details"
        >
          <div className="w-[70%] flex flex-col gap-3 border border-blue-200 p-2 rounded">
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
                textArea:
                  "border rounded p-2 placeholder:text-gray-300 border-blue-200 resize-none",
              }}
              placeholder="Write in atleast 200 characters"
              handleChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="w-[25%] rounded border border-blue-200 p-2 flex flex-col gap-4">
            <MultipleValues
              collector={topics}
              addToCollector={addTopic}
              deleteFromCollector={deleteTopic}
              placeholder="add a topic (5-20) characters"
              styles={{ inputField: "" }}
              label="Topics [2-5]"
              inputLength={{ min: 3, max: 20 }}
              items={{ min: 2, max: 5 }}
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
          <div className="absolute h-full w-full bg-[#38383b8e] backdrop-blur-[3px] z-3 flex flex-col justify-center items-center">
            <form
              id="thumbnailForm"
              onSubmit={addThumbnail}
              className=" h-full flex flex-col items-center mx-auto gap-4"
              encType="multipart/form-data"
            >
              <p className="font-bold">Please add a thumbnail to your blog.</p>
              <div className="w-[90%] flex mx-auto justify-between">
                <div className=" h-[300px] rounded border">
                  {!thumbnail ? (
                    <img
                      src={_default.thumbnail[0]}
                      alt="thumbnail of blog"
                      className="h-full"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(thumbnail)}
                      alt="thumbnail of blog"
                      className="w-full h-full"
                    />
                  )}
                </div>

                <div className="flex flex-col items-center justify-center gap-4  w-[30%]">
                  <input
                    id="thumbnail"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="thumbnail"
                    className="text-[12px] px-3 py-1 bg-blue-500 w-fit text-white cursor-pointer"
                  >
                    Choose Picture
                  </label>

                  <CustomButton
                    btnType={"submit"}
                    className="text-[12px] px-2 py-1 rounded bg-amber-400 text-white"
                    disabled={!thumbnail}
                  >
                    Add Thumbnail
                  </CustomButton>
                  <CustomButton
                    btnType={"button"}
                    onClick={() => {
                      setThumbnailForm(false);
                    }}
                  >
                    Cancel
                  </CustomButton>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default WriteBlog;
