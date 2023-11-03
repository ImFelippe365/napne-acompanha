import { Control, Controller, FieldValues } from "react-hook-form";
import {
  Select as FRSelect,
  SelectProps as FRSelectProps,
} from "flowbite-react";

interface OptionProps {
  label: string;
  value: string | number;
}

interface SelectProps extends FRSelectProps {
  options: OptionProps[];
  label: string;
  error?: boolean;
  helperText?: string;
}

interface ControlledSelectProps extends SelectProps {
  name: string;
  control: Control<any>;
}

const Select = ({
  label,
  error,
  helperText,
  options,
  ...props
}: SelectProps) => {
  return (
    <div>
      <label htmlFor={label} className="font-semibold text-black text-base">
        {label}
      </label>
      <FRSelect
        id={label}
        theme={{
          field: {
            select: {
              base: "!bg-background-color !outline-none !border-none !w-full !py-2 !px-4 !text-base !focus:border-none !text-black",
            },
          },
        }}
        defaultValue={""}
        className={`text-black ${
          error ? "border-error border-solid border-[1px]" : ""
        }`}
        {...props}
      >
        <option disabled value={""} className="text-gray ">
          Selecione uma opção
        </option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </FRSelect>

      {helperText && (
        <p className={`text-xs ${error ? "text-error" : "text-gray"}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

const ControlledSelect = ({
  name,
  control,
  ...props
}: ControlledSelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Select
          {...props}
          error={!!fieldState?.error?.message}
          helperText={fieldState?.error?.message ?? ""}
          {...field}
        />
      )}
    />
  );
};

export { ControlledSelect, Select };
