import React, { FC } from 'react';

const ButtonTypes = {
	BUTTON: 'button',
	SUBMIT: 'submit',
} as const;

type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes];

interface ButtonProps {
	type?: ButtonType;
	label: string;
	onClick?: () => void;
	disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	type = ButtonTypes.BUTTON,
}: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			type={type}
			className="w-full bg-highlight p-2 text-white rounded disabled:opacity-75"
			disabled={disabled || false}
		>
			{label}
		</button>
	);
};
