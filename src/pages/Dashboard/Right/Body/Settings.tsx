import CustomButton from "../../../../components/ui/Button";
import TextInput from "../../../../components/ui/TextInput";
import { genderMap } from "../../../../functions/constants/genderValues";
import { getAge, getZodiac } from "../../../../functions/time";

import { useAppSelector } from "../../../../redux_toolkit/store/hooks";

const Settings = () => {
  const { user } = useAppSelector((state) => state.user);
  const settings = [
    {
      legend: "Thumbnail",
      showValue: false,
      ask: [
        { q: "Is thumbnail set", ans: Boolean(user?.thumbnail?.publicId) },
        { q: "Display on Profile", ans: user?.thumbnailToBeShown },
      ],
    },
    {
      legend: "Profile Picture",
      showValue: false,
      ask: [
        { q: "Is profilePic set", ans: Boolean(user?.profilePic?.publicId) },
        { q: "Display on Profile", ans: user?.profilePicToBeShown },
      ],
    },
    {
      legend: "Email Preferences",
      showValue: true,
      value: user?.email,
      ask: [
        { q: "Is Email set", ans: true },
        { q: "Display on Profile", ans: user?.emailToBeShown },
      ],
    },
    {
      legend: "Date of Birth",
      showValue: true,
      value: user?.dob?.toDateString(),
      ask: [
        { q: "Is Date of Birth set", ans: false },
        { q: "Display on Profile", ans: user?.dobToBeShown },
      ],
    },
    {
      legend: "Age",
      showValue: true,
      value: getAge(user?.dob || null),
      ask: [
        { q: "Is Age Calculated", ans: user?.dobSet },
        { q: "Display on Profile", ans: user?.dobToBeShown },
      ],
    },
    {
      legend: "Zodiac",
      showValue: true,
      value: getZodiac(user?.dob || null),
      ask: [
        { q: "Is Date of Birth set", ans: user?.dobSet },
        { q: "Display on Profile", ans: user?.dobToBeShown },
      ],
    },
    {
      legend: "Nationality",
      showValue: true,
      value: user?.country || "Not set yet",
      ask: [
        { q: "Is Nationality set", ans: user?.countrySet },
        { q: "Display on Profile", ans: user?.countryToBeShown },
      ],
    },
    {
      legend: "Gender",
      showValue: true,
      value: genderMap[user?.gender || "NS"],
      ask: [
        { q: "Is Gender set", ans: genderMap[user?.gender || "NS"] },
        { q: "Display on Profile", ans: user?.genderToBeShown },
      ],
    },
    {
      legend: "Patronize Youself",
      showValue: user?.getFund.setup,
      value: user?.getFund.min,
      ask: [
        { q: "Is My Transaction system set", ans: user?.getFund.setup },
        { q: "Display on Profile", ans: user?.getFund.toBeShown },
      ],
    },
  ];

  return (
    <div className="h-full overflow-y-auto pr-4">
      <div className="h-[10%] mb-4 flex items-center justify-between pr-5 border-b">
        <div>
          <h3 className="font-bold">Settings</h3>
          <p className="text-[0.8rem]">
            Control profile settings of your account
          </p>
        </div>
        <CustomButton variant="regular-confirm">Save</CustomButton>
      </div>
      <div className="flex gap-4 items-center text-[0.8rem] justify-center">
        <p>Account Visibility : {user?.isPublic ? "Public" : " Private"}</p>
        <CustomButton variant="regular-dark">Change</CustomButton>
      </div>
      <fieldset className="border rounded-xl">
        <legend className="font-bold ml-4">Verifications</legend>

        <div className="text-[0.8rem] py-2 flex flex-col gap-4 pl-5">
          <div className="flex gap-4 items-center">
            Is Email Verified :{" "}
            {user?.isMailVerified ? (
              "Yes"
            ) : (
              <div className="flex items-center gap-4">
                No
                <CustomButton variant="regular-dark">Verify</CustomButton>
              </div>
            )}
          </div>
          <div className="flex gap-4 items-center">
            Is Account Verified :{" "}
            {user?.isAccountVerified ? (
              "Yes"
            ) : (
              <div className="flex items-center gap-4">
                No
                <CustomButton variant="regular-dark">Verify</CustomButton>
              </div>
            )}
          </div>
          <div className="flex gap-4 items-center">
            Is Premium Account :{" "}
            {user?.isPremiumAccount ? (
              "Yes"
            ) : (
              <div className="flex items-center gap-4">
                No
                <CustomButton variant="regular-dark">Buy Premium</CustomButton>
              </div>
            )}
          </div>
        </div>
      </fieldset>
      <div className="text-[0.8rem] mt-2">
        <form className="flex flex-col gap-3">
          {settings.map((item, idx) => (
            <fieldset className="border rounded-xl" key={idx}>
              <legend className="font-bold ml-4">{item.legend}</legend>
              <div className="pl-5 flex flex-col gap-3">
                {item.showValue && <div>{item.value}</div>}
                {item.ask.map(({ q, ans }, index) => (
                  <div key={index}>
                    {q} : {ans ? "Yes" : "No"}
                  </div>
                ))}
              </div>
            </fieldset>
          ))}
          <fieldset className="border rounded-xl">
            <legend className="font-bold ml-4">Patron Information</legend>

            <div className="pl-5 flex flex-col gap-3">
              <div>Do you want to get Patronized or need fund? : Yes</div>
              <div>Display on Profile : Yes</div>
            </div>
          </fieldset>
          <fieldset className="border rounded-xl">
            <legend className="font-bold ml-4">Conversations</legend>

            <div className="pl-5 flex flex-col gap-3">
              <div>Do you want people to message you first? : Yes</div>
              <div>Display on Profile : Yes</div>
            </div>
          </fieldset>
        </form>
      </div>

      <p className="text-2xl text-orange-400 mt-5">Critical Zone</p>
      <div className="text-[12px] flex flex-col gap-4 mb-5">
        <div className="flex justify-between">
          <TextInput
            label="Email"
            style={{ label: "text-[0.8rem]" }}
            inputType="read"
            placeholder="New Email"
            handleChange={() => {}}
            name="email"
            value={user!.email}
          />
          <CustomButton variant="regular-critical">Change</CustomButton>
        </div>

        <div className="flex justify-between">
          <TextInput
            label="Password"
            inputType="text"
            style={{ label: "text-[0.8rem]" }}
            placeholder="New Email"
            handleChange={() => {}}
            name="password"
            value="********"
          />
          <CustomButton variant="regular-critical">Change </CustomButton>
        </div>
        <div className="flex justify-between">
          <TextInput
            label="Username"
            inputType="email"
            style={{ label: "text-[0.8rem]", size: "w-[90%]" }}
            placeholder="New Email"
            handleChange={() => {}}
            name="email"
            value={user?.userName || "not set yet"}
          />
          <CustomButton variant="regular-critical">Change</CustomButton>
        </div>
      </div>
      <p className="text-2xl text-red-600 my-2">Danger Zone</p>
      <div className="mb-5">
        <CustomButton variant="regular-danger">Delete Account</CustomButton>
      </div>
    </div>
  );
};

export default Settings;
