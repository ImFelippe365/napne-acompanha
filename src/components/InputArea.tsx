import React from "react";
import { Control, Controller } from "react-hook-form";

interface InputAreaProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
  error?: boolean;
  helperText?: string;
}

interface ControlledInputAreaProps extends InputAreaProps {
  name: string;
  control: Control<any>;
}

const InputArea = ({ label, error, helperText, ...props }: InputAreaProps) => {
  return (
    <div>
      <label htmlFor={label} className="font-semibold text-black text-base">
        {label}
      </label>
      <textarea
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

const ControlledInputArea = ({ name, control, ...props }: ControlledInputAreaProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <InputArea
          {...props}
          error={!!fieldState?.error?.message}
          helperText={fieldState?.error?.message ?? ""}
          {...field}
        />
      )}
    />
  );
};

export { InputArea, ControlledInputArea };
