import { useAppSelector } from "../../../../../../redux_toolkit/store/hooks";

const ReceivedRequests = () => {
  const { followers } = useAppSelector((state) => state.follow);
  return (
    <div className="h-[60%] overflow-y-auto w-[70%]">
      <ul className="flex flex-col gap-2 list-none">
        {Object.keys(followers).map((item, idx) => (
          <li key={idx}>{followers[item].fullName.firstName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReceivedRequests;
