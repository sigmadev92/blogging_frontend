import type { SettingProps } from "../../types/settings";
import CustomButton from "./Button";

const TabularRow = ({ data }: { data: SettingProps[] }) => {
  return (
    <table className="w-full ">
      <tbody>
        {data.map(({ q, ans, operation }, idx) => (
          <tr key={idx}>
            <th className="text-left p-2" rowSpan={1}>
              {q}
            </th>
            <th></th>
            <td className="text-center">{ans ? "Yes" : "No"}</td>
            <td className="text-right">
              <CustomButton
                variant="regular-dark"
                className="w-[100px]"
                disabled={operation.disabled}
                onClick={operation.fn}
              >
                {operation.label}
              </CustomButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabularRow;
