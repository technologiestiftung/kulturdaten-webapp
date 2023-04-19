import React from 'react';

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

export const Button = ({ label, onClick, disabled, type = ButtonTypes.BUTTON }: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			data-type={type}
			className="w-full bg-highlight p-2 text-white rounded"
			data-disabled={disabled || false}
		>
			{label}
		</button>
	);
};
