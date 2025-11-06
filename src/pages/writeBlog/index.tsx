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

const WriteBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const [searchTags, setSeachTags] = useState<string[]>([]);
  const [phase, setPhase] = useState<string>("filling");
  const [currentBlogId, setCurrentBlogId] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [readyToPublish, setReady] = useState<boolean>(false);

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
      }
    } catch (error) {
      console.log(error);
      toast.error("Cient error");
    } finally {
      dispatch(LoaderActions.stopLoader());
    }
  };

  const publishBlog = async () => {
    dispatch(LoaderActions.startLoader("Publishing blog"));

    try {
      const response = await fetch(`${blogsURL}/publish/${currentBlogId}`, {
        credentials: "include",
        method: "PUT",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Plog has been published");
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
    <section className="pt-11 bg-white text-black dark:bg-black dark:text-white h-full">
      <div className="p-3">
        <h2 className="text-2xl text-purple-500">Create New Blog </h2>
      </div>
      <div className="w-full flex flex-col px-2 rounded mx-auto shadow-amber-100 sm:w-[95%] h-[80%]">
        {phase !== "saved" ? (
          <form
            className="flex justify-between gap-y-4 relative"
            onSubmit={addToDb}
          >
            <div className="absolute right-0 -top-8 text-white">
              {readyToPublish ? (
                <CustomButton
                  className="text-[12px] px-3 py-1 bg-purple-500"
                  onClick={publishBlog}
                >
                  Publish
                </CustomButton>
              ) : (
                <CustomButton className="text-[12px] px-3 py-1 bg-purple-500">
                  Proceed and Add thumbnail
                </CustomButton>
              )}
            </div>
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
        ) : (
          <form
            onSubmit={addThumbnail}
            className="w-[90%] h-full rounded border flex flex-col mx-auto"
            encType="multipart/form-data"
          >
            <p>
              Your blog has been saved in the database. Please add a thumbnail
              to your blog.
            </p>
            <div className="w-[90%] h-[80%] rounded border">
              {!thumbnail ? (
                <img
                  src={_default.thumbnail[0]}
                  alt="thumbnail of blog"
                  className="w-full h-full object-fill"
                />
              ) : (
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="thumbnail of blog"
                  className="w-full h-full"
                />
              )}
            </div>
            <input
              id="thumbnail"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="thumbnail" className="px-3 py-1 bg-blue-500 w-fit">
              Choose Picture
            </label>

            <div className="flex gap-4">
              <CustomButton className="text-[12px] px-2 py-1 rounded">
                Add Thumbnail
              </CustomButton>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default WriteBlog;
