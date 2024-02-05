import { forwardRef, useState, ReactNode, DetailedHTMLProps, InputHTMLAttributes } from "react";
import { twJoin } from "tailwind-merge";

export enum InputStyleTypes {
  MAIN = "text-black-1000 rounded-md p-2 text-opacity-60 shadow-main outline-none",
  NONE = "",
}

export type InputProps = {
  children?: ReactNode;
  styleType?: InputStyleTypes;
  inputWrapperClassName?: string;
  className?: string;
  phoneInput?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, inputWrapperClassName, styleType, value, onChange, ...props }, ref) => {
    const [inputValue, setInputValue] = useState("");
    return (
      <>
        <div className={twJoin("relative flex h-fit w-full items-start gap-2", inputWrapperClassName)}>
          <input
            className={twJoin(styleType, "h-full w-full", className)}
            {...props}
            value={value || inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onChange?.(e);
            }}
            ref={ref}
          />
          {children}
        </div>
      </>
    );
  },
);
