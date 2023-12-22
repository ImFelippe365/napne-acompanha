import React from "react";
import { Control, Controller } from "react-hook-form";

interface CheckboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: boolean;
  helperText?: string;
  containerClassName?: string;
  checkboxClassName?: string;
}

interface ControlledCheckboxProps extends CheckboxProps {
  name: string;
  control: Control<any>;
}

const Checkbox = ({ error, helperText, containerClassName, checkboxClassName, ...props }: CheckboxProps) => {
  const defaultClasses = "bg-background-color w-6 h-6 border rounded !outline-none border-gray checked:bg-primary checked:!outline-none focus:!outline-none"

  return (
    <div className={containerClassName}>
      <input
        type="checkbox"
        className={`${defaultClasses} ${checkboxClassName}`}
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

const ControlledCheckbox = ({ name, control, ...props }: ControlledCheckboxProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox
          {...props}
          checked={field.value}
          // onChange={(e) => field.onChange(e.target.checked)}
          error={!!fieldState?.error?.message}
          helperText={fieldState?.error?.message ?? ""}
          {...field}
        />
      )}
    />
  );
};

export { Checkbox, ControlledCheckbox };