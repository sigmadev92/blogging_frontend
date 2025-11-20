import { UserStarIcon } from "lucide-react";
import CustomButton from "../../../../components/ui/Button";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux_toolkit/store/hooks";
import { LoaderActions } from "../../../../redux_toolkit/reducers/loaderReducer";

const Subscriptions = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <div className="h-full">
      <div className="h-[15%]">
        {" "}
        <h3 className="font-bold">Subscriptions</h3>
        <p className="text-[0.7rem]">
          View and manage all your subscriptions here.{" "}
        </p>
      </div>

      <div className="h-[85%] center ">
        {user?.isPremiumAccount ? (
          <p>You have subscribed to premium plan </p>
        ) : (
          <div className="center gap-4">
            <p>You don't have any subscriptions</p>
            <CustomButton
              variant={"regular-confirm"}
              onClick={() => {
                dispatch(LoaderActions.setPremiumDiv(true));
              }}
            >
              <span className="flex gap-2 items-center">
                <span>Subscribe to Premium account</span>{" "}
                <UserStarIcon size={14} />
              </span>
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
