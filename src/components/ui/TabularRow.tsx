import type { SettingProps } from "../../types/settings";
import CustomButton from "./Button";

const TabularRow = ({ data }: { data: SettingProps[] }) => {
  return (
    <table className="w-full ">
      <tbody>
        {data.map(({ q, ans, operation, fieldType }, idx) => (
          <tr key={idx}>
            <th className="text-left p-2" rowSpan={1}>
              {q}
            </th>
            <th></th>
            {fieldType === "toggle" && (
              <>
                <td className="text-center">{ans ? "Yes" : "No"}</td>
                <td className="text-right">
                  <CustomButton
                    variant="regular-dark"
                    className="w-[100px]"
                    onClick={operation[0].fn}
                  >
                    {operation[0].label}
                  </CustomButton>
                </td>
              </>
            )}

            {fieldType === "one-time" && (
              <>
                <td className="text-center">{!ans && "No"}</td>
                <td className="text-right">
                  {!ans ? (
                    <CustomButton
                      variant="regular-dark"
                      className="w-[100px]"
                      onClick={operation[0].fn}
                    >
                      {operation[0].label}
                    </CustomButton>
                  ) : (
                    <CustomButton variant="regular-dark" className="w-[100px]">
                      {operation[1].label}
                    </CustomButton>
                  )}
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabularRow;
