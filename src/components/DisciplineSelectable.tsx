import React from "react";

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

interface DisciplineSelectableProps extends CheckboxProps {
  title: string;
}

const DisciplineSelectable = ({
  title,
  ...checkboxProps
}: DisciplineSelectableProps) => {
  const Checkbox = ({
    error,
    helperText,
    containerClassName,
    checkboxClassName,
    ...props
  }: CheckboxProps) => {
    const defaultClasses =
      "bg-background-color w-6 h-6 border rounded !outline-none border-gray checked:bg-primary checked:!outline-none focus:!outline-none";

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

  return (
    <div className="flex items-center">
      <Checkbox {...checkboxProps} />
      <span
        className={`ml-2 ${
          checkboxProps.checked ? "text-primary font-semibold " : "text-gray"
        }`}
      >
        {title}
      </span>
    </div>
  );
};

export default DisciplineSelectable;
