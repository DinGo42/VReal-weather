import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes, FC, memo } from "react";
import { twJoin } from "tailwind-merge";

export enum ButtonStyleTypes {
  MAIN = "text-white-1000 bg-blue-1000 rounded-md px-8 py-2 shadow-main",
  NONE = "",
}

export type ButtonProps = {
  children: ReactNode;
  styleType?: ButtonStyleTypes;
  className?: string;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: FC<ButtonProps> = memo(({ children, styleType, className, ...props }) => (
  <button className={twJoin(className, styleType)} {...props}>
    {children}
  </button>
));
