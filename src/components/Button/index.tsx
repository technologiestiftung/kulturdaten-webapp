import { FC } from "react";

interface ButtonProps
	extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({ type = "button", ...otherProps }: ButtonProps) => {
	return <button type={type} {...otherProps} />;
};
