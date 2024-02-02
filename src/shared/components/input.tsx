import { forwardRef, useState, ReactNode, DetailedHTMLProps, InputHTMLAttributes } from "react";
import { cn } from "../utils";

export enum InputStyleTypes {
  MAIN = "text-main-black rounded-md p-2 text-opacity-60 shadow-[0px_3px_10px_-5px_rgb(0,0,0)] outline-none",
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
        <div className={cn("relative flex h-fit w-full items-start gap-2", inputWrapperClassName)}>
          <input
            className={cn(styleType, "h-full w-full", className)}
            {...props}
            value={value || inputValue}
            onChange={e => {
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
