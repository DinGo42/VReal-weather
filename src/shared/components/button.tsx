import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../utils";

export enum ButtonStyleTypes {
  MAIN = "text-main-white bg-main-blue rounded-md px-8 py-2 shadow-[0px_3px_10px_-5px_rgb(0,0,0)]",
  NONE = "",
}

export type ButtonProps = {
  children: ReactNode;
  styleType?: ButtonStyleTypes;
  className?: string;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, styleType, className, ...props }, ref) => (
    <button className={cn(className, styleType)} ref={ref} {...props}>
      {children}
    </button>
  ),
);
