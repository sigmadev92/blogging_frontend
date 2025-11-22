import { ChevronDownIcon, UserPlusIcon } from "lucide-react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux_toolkit/store/hooks";
import type { FullName } from "../../types/user";

import CustomButton from "./Button";
import { FollowThunkActions } from "../../redux_toolkit/reducers/followReducer";
import { useState } from "react";
type User = {
  _id: string;
  fullName: FullName;
  profilePic?: { secure_url: string; publicId: string };
  userName?: string;
};
const FollowBtn = ({ user }: { user: User }) => {
  const { followers, following, pendingOutgoing, pendingIncomming } =
    useAppSelector((state) => state.follow);
  const myUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isDivOpened, setIsDivOpened] = useState<boolean>(false);

  const followBtnFn = async () => {
    await dispatch(FollowThunkActions.followRequest(user));
  };
  const acceptRqstBtnFn = async () => {
    await dispatch(FollowThunkActions.acceptRequest(user));
  };
  const deleteSentRqstBtnFn = async () => {
    await dispatch(
      FollowThunkActions.deleteSentRequest({ requestedTo: myUser.user!._id })
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
      FollowThunkActions.removeFollower({ requestedBy: myUser.user!._id })
    );
  };
  return (
    <div>
      {!pendingOutgoing[user._id] &&
      !pendingIncomming[user._id] &&
      !following[user._id] &&
      !followers[user._id] ? (
        <CustomButton
          variant={"regular-dark"}
          className="hover:bg-blue-400 hover:text-white"
          onClick={() => {
            followBtnFn();
          }}
        >
          <span className="flex gap-2 items-center">
            <UserPlusIcon size={16} />
            <span className="">Follow</span>
          </span>
        </CustomButton>
      ) : null}
      {pendingOutgoing[user._id] &&
      !pendingIncomming[user._id] &&
      !followers[user._id] ? (
        <div className="relative flex">
          <span className="text-[12px] px-3 py-1 rounded bg-gray-500">
            Requested
          </span>

          <CustomButton onClick={() => setIsDivOpened((prev) => !prev)}>
            <ChevronDownIcon size={14} />
          </CustomButton>
          {isDivOpened && (
            <div className="absolute top-4 left-0 border-light theme">
              <CustomButton
                variant="regular-danger"
                onClick={() => {
                  deleteSentRqstBtnFn();
                  setIsDivOpened(false);
                }}
              >
                <span className="text-[10px]">Delete Request</span>
              </CustomButton>
            </div>
          )}
        </div>
      ) : null}

      {pendingOutgoing[user._id] && pendingIncomming[user._id] ? (
        <div className="relative flex">
          <CustomButton
            variant="regular-confirm"
            onClick={() => acceptRqstBtnFn()}
          >
            Accept
          </CustomButton>

          <CustomButton onClick={() => setIsDivOpened((prev) => !prev)}>
            <ChevronDownIcon size={14} />
          </CustomButton>
          {isDivOpened && (
            <div className="absolute top-0 left-0 border-light theme">
              <CustomButton
                variant="regular-danger"
                onClick={() => {
                  deleteSentRqstBtnFn();
                  setIsDivOpened(false);
                }}
              >
                Unsend Request
              </CustomButton>
              <CustomButton
                variant="regular-danger"
                onClick={() => {
                  deleteSentRqstBtnFn();
                  setIsDivOpened(false);
                }}
              >
                Delete Request
              </CustomButton>
            </div>
          )}
        </div>
      ) : null}
      {pendingOutgoing[user._id] && followers[user._id] ? (
        <div className="relative flex">
          <span>Requested</span>

          <CustomButton
            onClick={() => {
              setIsDivOpened((prev) => !prev);
            }}
          >
            <ChevronDownIcon size={14} />
          </CustomButton>
          {isDivOpened && (
            <div className="absolute top-0 left-0 border-light theme">
              <CustomButton
                variant="regular-danger"
                onClick={() => {
                  deleteSentRqstBtnFn();
                  setIsDivOpened(false);
                }}
              >
                Delete Request
              </CustomButton>
              <CustomButton
                variant="regular-danger"
                onClick={() => {
                  removeFollowerBtnFn();
                  setIsDivOpened(false);
                }}
              >
                Remove Follower
              </CustomButton>
            </div>
          )}
        </div>
      ) : null}
      {pendingIncomming[user._id] &&
      !pendingOutgoing[user._id] &&
      !following[user._id] ? (
        <div className="flex relative">
          <CustomButton
            variant="regular-confirm"
            onClick={() => {
              acceptRqstBtnFn();
            }}
          >
            Accept
          </CustomButton>
          <CustomButton onClick={() => setIsDivOpened((prev) => !prev)}>
            <ChevronDownIcon size={14} />
          </CustomButton>
          {isDivOpened && (
            <div className="absolute text-[0.8rem] w-[150px] top-5 left-[-75%] border-light backdrop-blur-2xl p-1">
              <CustomButton
                className="hover:bg-blue-400 hover:text-white w-full p-1"
                onClick={() => {
                  deleteReceivedRqstBtnFn();
                  setIsDivOpened(false);
                }}
              >
                Remove Request
              </CustomButton>
            </div>
          )}
        </div>
      ) : null}

      {following[user._id] &&
      !pendingIncomming[user._id] &&
      !followers[user._id] ? (
        <div className="relative flex">
          <CustomButton
            variant="regular-confirm"
            onClick={() => acceptRqstBtnFn()}
          >
            Following
          </CustomButton>
          <CustomButton onClick={() => setIsDivOpened((prev) => !prev)}>
            <ChevronDownIcon size={14} />
          </CustomButton>
          {isDivOpened && (
            <div className="absolute top-0 left-0 border-light theme">
              <CustomButton
                variant="regular-danger"
                onClick={() => {
                  unfollowBtnFn();
                  setIsDivOpened(false);
                }}
              >
                Unfollow
              </CustomButton>
            </div>
          )}
        </div>
      ) : null}

      {following[user._id] && pendingIncomming[user._id] ? (
        <div className="relative flex">
          <CustomButton
            variant="regular-confirm"
            onClick={() => acceptRqstBtnFn()}
          >
            Accept
          </CustomButton>
          <CustomButton onClick={() => setIsDivOpened((prev) => !prev)}>
            <ChevronDownIcon size={14} />
          </CustomButton>
          {isDivOpened && (
            <div className="absolute top-0 left-0 border-light theme">
              <CustomButton
                variant="regular-danger"
                onClick={() => {
                  unfollowBtnFn();
                  setIsDivOpened(false);
                }}
              >
                Unfollow
              </CustomButton>
              <CustomButton
                variant="regular-danger"
                onClick={() => {
                  deleteReceivedRqstBtnFn();
                  setIsDivOpened(false);
                }}
              >
                Delete Request
              </CustomButton>
            </div>
          )}
        </div>
      ) : null}

      {following[user._id] && followers[user._id] ? (
        <div className="flex relative">
          <span>Friend</span>
          <CustomButton onClick={() => setIsDivOpened((prev) => !prev)}>
            <ChevronDownIcon size={14} />
          </CustomButton>
          {isDivOpened && (
            <div className="absolute top-0 left-0 border-light theme">
              <CustomButton
                variant="regular-danger"
                onClick={() => {
                  unfollowBtnFn();
                  setIsDivOpened(false);
                }}
              >
                Unfollow
              </CustomButton>
              <CustomButton
                variant="regular-danger"
                onClick={() => {
                  removeFollowerBtnFn();
                  setIsDivOpened(false);
                }}
              >
                Remove Follower
              </CustomButton>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FollowBtn;
