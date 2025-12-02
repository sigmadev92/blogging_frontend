import { useState, type FormEvent } from "react";
import CustomTextArea from "../../components/ui/TextArea";
import TextInput from "../../components/ui/TextInput";
import MultipleValues from "../../components/ui/MultipleValues";

const EditBlogBody = ({
  handleSaveBtn,
}: {
  handleSaveBtn: (e: FormEvent) => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const [searchTags, setSeachTags] = useState<string[]>([]);
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

  return (
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
    </div>
  );
};

export default EditBlogBody;
