import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  error?: boolean;
  helperText?: string;
}

interface ControlledInputProps extends InputProps {
  name: string;
  control: Control<FieldValues>;
}

const Input = ({ label, error, helperText, ...props }: InputProps) => {
  return (
    <>
      <label htmlFor={label} className="font-semibold text-black text-base">
        {label}
      </label>
      <input
        id={label}
        className={`bg-background-color py-2 px-4 outline-none border-none rounded-lg w-full ${
          error ? "border-error border-solid border-[1px]" : ""
        }`}
        {...props}
      />
      {helperText && (
        <p className={`text-xs ${error ? "text-error" : "text-gray"}`}>
          {helperText}
        </p>
      )}
    </>
  );
};

const ControlledInput = ({ name, control, ...props }: ControlledInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          {...props}
          error={!!fieldState?.error?.message}
          helperText={fieldState?.error?.message ?? ""}
          {...field}
        />
      )}
    />
  );
};

export { Input, ControlledInput };
