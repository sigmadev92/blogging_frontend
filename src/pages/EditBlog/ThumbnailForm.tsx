import { ImageIcon } from "lucide-react";
import CustomButton from "../../components/ui/Button";
import { _default } from "../../constants/images/default";
import type { ChangeEvent, FormEvent } from "react";

const ThumbnailForm = ({
  thumbnail,
  stringThumbnail,
  setThumbnailForm,
  addThumbnail,
  handleFileChange,
  setThumbnail,
  phase,
}: {
  phase: "filling" | "saved" | "publishing" | "published";
  thumbnail: File | null;
  stringThumbnail: string;
  setThumbnailForm: (e: boolean) => void;
  addThumbnail: (e: FormEvent) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setThumbnail: (e: File | null) => void;
}) => {
  return (
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
  );
};

export default ThumbnailForm;
