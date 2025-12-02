import { PencilIcon } from "lucide-react";
import CustomButton from "../../../../components/ui/Button";
import TabularRow from "../../../../components/ui/TabularRow";
import TextInput from "../../../../components/ui/TextInput";
import settings from "../../../../constants/objects/settings";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux_toolkit/store/hooks";
import type { SettingProps } from "../../../../types/settings";
import { UserThunkActions } from "../../../../redux_toolkit/AsyncThunkActions/user";

const Settings = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const toggleVisibility = async () => {
    console.log("chal");
    await dispatch(UserThunkActions.toggleAccountVisibility());
  };
  const verifyEmail = async () => {};
  const verifyAccount = async () => {};
  const buySubscription = async () => {};

  const toggleVisibilityParams = async (param: string) => {
    await dispatch(UserThunkActions.toggleDisplayParam({ param }));
  };

  const settings2: SettingProps[] = [
    {
      q: "Is Account Public",
      ans: user!.isPublic,
      fieldType: "toggle",
      operation: [{ label: "Change", fn: toggleVisibility }],
    },
    {
      q: "Is Email Verified",
      ans: user!.isMailVerified,
      fieldType: "one-time",
      operation: [
        { label: "Verify", fn: () => verifyEmail() },
        { label: "Verified", fn: () => {}, disabled: true },
      ],
    },
    {
      q: "Is Account Verified",
      ans: user!.isAccountVerified,
      fieldType: "one-time",
      operation: [
        { label: "Verify", fn: () => verifyAccount() },
        { label: "Verified", fn: () => {}, disabled: true },
      ],
    },

    {
      q: "Is Premium Account",
      ans: user!.isPremiumAccount,
      fieldType: "will-end",
      operation: [
        { label: "Subscribe", fn: () => buySubscription() },
        { label: "End Soon", fn: () => {}, disabled: true },
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
      </div>

      <TabularRow data={settings2} />
      <div className="text-[0.8rem] mt-2">
        <form className="flex flex-col gap-3">
          {settings(user!).map((item, idx) => (
            <fieldset className="border rounded-xl" key={idx}>
              <legend className="font-bold ml-4">{item.legend}</legend>
              <div className="pl-5 flex flex-col gap-3">
                {item.showValue && <div>{item.value}</div>}
                {item.ask.map(({ q, ans, param }, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    {q} : {ans ? "Yes" : "No"}
                    {param && (
                      <CustomButton
                        onClick={() => toggleVisibilityParams(param)}
                      >
                        <PencilIcon size={14} />
                      </CustomButton>
                    )}
                  </div>
                ))}
              </div>
            </fieldset>
          ))}
        </form>
      </div>

      <h3 className="text-2xl text-orange-400 mt-5">Critical Zone</h3>
      <p className="text-orange-200 text-[12px]">
        You Need to login again if you change any of these fields
      </p>
      <hr />
      <div className="text-[12px] flex flex-col gap-4 my-5">
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
