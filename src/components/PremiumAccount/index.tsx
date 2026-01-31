import { paymentURL } from "../../constants/urls/backend";
import { LoaderActions } from "../../redux_toolkit/reducers/loaderReducer";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux_toolkit/store/hooks";
import CustomButton from "../ui/Button";

const PremiumAccount = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handlePayment = async (amount: number) => {
    const response = await fetch(`${paymentURL}/create-order`, {
      body: JSON.stringify({ amount }),
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
    });

    const { order } = await response.json();

    const options = {
      key: "rzp_test_xxxxx", // public key
      amount: order.amount,
      currency: order.currency,
      name: "My MERN App",
      description: "Premium Subscription",
      order_id: order.id,

      handler: async function (response: RazorpayPaymentResponse) {
        // send payment details to backend for verification
        await fetch(`${paymentURL}/verify`, {
          body: JSON.stringify(response),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        alert("Payment Successful");
      },

      prefill: {
        name: user!.fullName.firstName,
        email: user!.email,
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

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
            <CustomButton
              variant="regular-confirm"
              className="w-fit"
              onClick={() => handlePayment(599)}
            >
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
