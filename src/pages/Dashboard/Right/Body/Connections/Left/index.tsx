import { useState } from "react";
import CustomButton from "../../../../../../components/ui/Button";
import FollowUserInfo from "../../../../../../components/ui/FollowUserInfo";
import TextInput from "../../../../../../components/ui/TextInput";
import { useAppSelector } from "../../../../../../redux_toolkit/store/hooks";
import { SearchIcon } from "lucide-react";

type Tab = "0" | "1" | "2" | "3" | "4";
const ConnectionsLeft = ({
  tab,
  setTab,
}: {
  tab: string;
  setTab: (e: string) => void;
}) => {
  const { followers, following, pendingIncomming, pendingOutgoing } =
    useAppSelector((state) => state.follow);
  const [searchInput, setSearchInput] = useState<string>("");
  const infoMap = {
    "0": { label: "Recent", arr: null },
    "1": { label: "Followers", arr: followers },
    "2": { label: "Following", arr: following },
    "3": { label: "Sent Requests", arr: pendingOutgoing },
    "4": { label: "Received Requests", arr: pendingIncomming },
    "5": { label: "Find People", arr: null },
  };
  return (
    <div className="h-full w-full md:w-[60%]">
      <div className="h-[15%] overflow-x-auto overflow-y-hidden pb-2">
        <ul className="flex list-none gap-2">
          {Object.keys(infoMap).map((keyIdx, idx) => (
            <li key={idx} className="shrink-0">
              <CustomButton
                variant={tab !== keyIdx ? "regular-dark" : "regular-confirm"}
                onClick={() => {
                  setTab(keyIdx);
                }}
              >
                {infoMap[keyIdx as Tab].label}
              </CustomButton>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-[80%] flex justify-center gap ">
        <TextInput
          label=""
          style={{ input: "w-[90%]", size: "w-[90%]" }}
          inputType="search"
          placeholder={`search in ${
            infoMap[tab as Tab].label
          } (not implemented yet)`}
          name="search"
          value={searchInput}
          handleChange={(e) => setSearchInput(e.target.value)}
        />
        <CustomButton
          variant={"regular-confirm"}
          disabled={searchInput.length === 0}
        >
          <SearchIcon size={14} />
        </CustomButton>
      </div>
      <div className="h-[75%] overflow-y-auto mt-4">
        {infoMap[tab as Tab].arr && (
          <ul className="flex flex-col gap-2">
            {Object.keys(infoMap[tab as Tab].arr!).map((keyIdx, idx) => (
              <FollowUserInfo
                key={idx}
                user={infoMap[tab as Tab].arr![keyIdx]}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ConnectionsLeft;
