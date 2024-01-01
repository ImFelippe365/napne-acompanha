import React from "react";
import { Control, Controller } from "react-hook-form";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  error?: boolean;
  helperText?: string;
  containerClassName?: string;
}

interface ControlledInputProps extends InputProps {
  name: string;
  control: Control<any>;
}

const Input = ({
  label,
  error,
  helperText,
  containerClassName,
  ...props
}: InputProps) => {
  return (
    <div className={containerClassName}>
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
        <p className={`text-xs mt-1 ${error ? "text-error" : "text-gray"}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

const ControlledInput = ({ name, control, ...props }: ControlledInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          error={!!fieldState?.error?.message}
          helperText={fieldState?.error?.message ?? ""}
          {...field}
          {...props}
        />
      )}
    />
  );
};

export { Input, ControlledInput };
