import { LoaderActions } from "../../redux_toolkit/reducers/loaderReducer";
import { useAppDispatch } from "../../redux_toolkit/store/hooks";
import CustomButton from "../ui/Button";

const PremiumAccount = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="h-full w-full pt-12  theme absolute top-0 z-2 left-0">
      <div className="px-4 flex flex-col gap-4">
        <CustomButton
          variant="regular-dark"
          className="w-fit"
          onClick={() => {
            dispatch(LoaderActions.setPremiumDiv(false));
          }}
        >
          I will try later
        </CustomButton>
        <h2 className="text-3xl font-bold">Benefits of Premium Account</h2>

        <div className="min-h-[250px] md:w-[50%] mx-auto flex flex-col gap-4 text-md theme-shadow p-4">
          <p>Access to people who visited your profile</p>
          <p>Access to mails of Authors for contact</p>
          <p>Premium account badge with your name</p>
          <p>Guaranteed reply from 1 of your favourite creators a month</p>
          <p>
            Access to add 5 more platform links. For Now you can add upto 5 only
          </p>
          <p>Access to premium blogs created by top creators</p>
          <div className="flex justify-between items-center">
            <CustomButton variant="regular-confirm" className="w-fit">
              <span className="text-md">Proceed @ ₹599/year</span>
            </CustomButton>
            <CustomButton variant="regular-confirm">
              <span className="text-md">Try 1 week for free</span>
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumAccount;
