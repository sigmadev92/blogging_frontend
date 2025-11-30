import CustomButton from "../../../../../components/ui/Button";

const BlogsTab = ({
  tab,
  setTab,
}: {
  tab: number;
  setTab: (e: number) => void;
}) => {
  return (
    <div>
      <ul className="list-none flex gap-2">
        {[
          { label: "Published", tab: 1 },
          { label: "Drafts", tab: 2 },
        ].map((item, idx) => (
          <li
            key={idx}
            className={`${
              item.tab === tab ? "bg-blue-800" : "bg-black"
            } text-white`}
          >
            <CustomButton onClick={() => setTab(item.tab)} variant="regular">
              {item.label}
            </CustomButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogsTab;
