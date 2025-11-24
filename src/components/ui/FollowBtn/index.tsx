import { ChevronDownIcon, UserPlusIcon } from "lucide-react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux_toolkit/store/hooks";

import CustomButton from "../Button";
import { FollowThunkActions } from "../../../redux_toolkit/AsyncThunkActions/follow";
import { useEffect, useState } from "react";
import type { FollowMap } from "../../../types/follow";
import type { FollowUser } from "../../../types/user";

const FollowBtn = ({
  user,
  setNavBox,
}: {
  user: FollowUser;
  setNavBox: (e: boolean) => void;
}) => {
  const [result, setResult] = useState<FollowMap>("0-0-0-0");
  const { followers, following, pendingOutgoing, pendingIncomming } =
    useAppSelector((state) => state.follow);
  const myUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isDivOpened, setIsDivOpened] = useState<boolean>(false);

  const followBtnFn = async () => {
    await dispatch(FollowThunkActions.followRequest(user));
  };
  const acceptRqstBtnFn = async () => {
    console.log("called");
    await dispatch(FollowThunkActions.acceptRequest(user));
  };
  const deleteSentRqstBtnFn = async () => {
    await dispatch(
      FollowThunkActions.deleteSentRequest({ requestedTo: user._id })
    );
  };
  const deleteReceivedRqstBtnFn = async () => {
    await dispatch(
      FollowThunkActions.deleteReceivedRequest({ requestedBy: user._id })
    );
  };
  const unfollowBtnFn = async () => {
    await dispatch(FollowThunkActions.unfollowUser({ requestedTo: user._id }));
  };

  const removeFollowerBtnFn = async () => {
    await dispatch(
      FollowThunkActions.removeFollower({ requestedBy: user._id })
    );
  };

  const followMap: {
    [key: string]: {
      isBtn: boolean;
      label: string;
      fn?: () => void;
      menu?: boolean;
    };
  } = {
    "0-0-0-0": {
      isBtn: true,
      label: "Follow",
      fn: followBtnFn,
      menu: false,
    },
    "1-0-0-0": {
      isBtn: false,
      label: "Requested",
      // menu:[{label:"Unsent Request",fn:deleteSentRqstBtnFn}]
    },
    "1-1-0-0": {
      isBtn: true,
      label: "Accept",
      fn: acceptRqstBtnFn,
      // menu:[{label:"Unsent Request",fn:deleteSentRqstBtnFn},{label:"Delete Request",fn:deleteReceivedRqstBtnFn}]
    },
    "1-0-0-1": {
      isBtn: false,
      label: "Requested",
    },
    "0-1-0-0": {
      isBtn: true,
      label: "Accept",
      fn: acceptRqstBtnFn,
    },
    "0-1-1-0": {
      isBtn: true,
      label: "Accept",
      fn: acceptRqstBtnFn,
    },
    "0-0-1-0": {
      isBtn: true,
      label: "Following",
    },
    "0-0-1-1": {
      isBtn: false,
      label: "Friend",
    },
    "0-0-0-1": {
      isBtn: true,
      label: "Follow Back",
      fn: followBtnFn,
    },
    "1-1-1-1": { isBtn: false, label: "Friend" },
    "1-1-1-0": { isBtn: false, label: "Friend" },
    "1-0-1-0": { isBtn: false, label: "Friend" },
    "1-0-1-1": { isBtn: false, label: "Friend" },
    "0-1-0-1": { isBtn: false, label: "Friend" },
    "0-1-1-1": { isBtn: false, label: "Friend" },
    "1-1-0-1": { isBtn: false, label: "Friend" },
  };

  useEffect(() => {
    setResult(
      `${pendingOutgoing[user._id] ? "1" : "0"}-${
        pendingIncomming[user._id] ? "1" : "0"
      }-${following[user._id] ? "1" : "0"}-${followers[user._id] ? "1" : "0"}`
    );
  }, [pendingIncomming, pendingOutgoing, followers, following, user]);

  return !myUser.loggedIn ? (
    <CustomButton
      variant="regular-dark"
      className="hover:bg-blue-500"
      onClick={() => {
        setNavBox(true);
      }}
    >
      <span className="flex items-center gap-2">
        <UserPlusIcon size={14} /> Follow
      </span>
    </CustomButton>
  ) : (
    <div className="flex relative text-[0.8rem]">
      <CustomButton
        variant="regular-dark"
        disabled={!followMap[result].isBtn}
        className="hover:bg-blue-500 hover:text-white font-bold"
        onClick={() => followMap[result].fn?.()}
      >
        <span className="flex gap-1 items-center">
          {" "}
          {result === "0-0-0-0" && <UserPlusIcon size={14} />}{" "}
          {followMap[result].label}
        </span>
      </CustomButton>

      {followMap[result].menu === undefined && (
        <CustomButton onClick={() => setIsDivOpened((prev) => !prev)}>
          <ChevronDownIcon size={14} />
        </CustomButton>
      )}

      {isDivOpened && (
        <div className="absolute top-5 left-[-55%] w-[150px] border-light theme p-1">
          <ul className="flex flex-col gap-2 list-none">
            {[
              {
                action: "Unsend Request",
                when: pendingOutgoing[user._id],
                fn: deleteSentRqstBtnFn,
              },
              {
                action: "Delete Request",
                when: pendingIncomming[user._id],
                fn: deleteReceivedRqstBtnFn,
              },
              {
                action: "Unfollow",
                when: following[user._id],
                fn: unfollowBtnFn,
              },
              {
                action: "Remove Follower",
                when: followers[user._id],
                fn: removeFollowerBtnFn,
              },
            ].map(
              (item, idx) =>
                item.when && (
                  <li
                    key={idx}
                    onClick={() => {
                      item.fn();
                      setIsDivOpened(false);
                    }}
                    className="hover:bg-blue-400 cursor-pointer px-2"
                  >
                    {item.action}
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FollowBtn;
