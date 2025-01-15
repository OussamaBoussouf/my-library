import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IBook } from "../../utils/type";
import { selectOptions } from "../../constants/constant";
import { Select } from "./Select";


const SelectCategory = ({
  register,
  setValue,
}: {
  register: UseFormRegister<IBook>;
  setValue: UseFormSetValue<IBook>;
}) => {

  const handleSelect = (option: string) => {
    setValue("category", option, { shouldValidate: true });
  };

  return (
    <>
      <Select
        {...register("category", { required: true })}
        onChange={(value: string) => handleSelect(value)}
        className="mt-2"
      >
        <Select.Trigger className="w-full" placeholder="Select category" />
        <Select.SelectGroup className="overflow-y-auto max-h-[200px]">
          {selectOptions.map((option, index) => (
            <Select.SelectItem key={index} value={option} />
          ))}
        </Select.SelectGroup>
      </Select>
    </>
  );
};

export default SelectCategory;
