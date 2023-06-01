import React, { useState, useId, FC } from 'react';

const InputTypes = {
	EMAIL: 'email',
	PASSWORD: 'password',
	TEXT: 'text',
	URL: 'url',
	TEL: 'tel',
	NUMBER: 'number',
} as const;

type InputType = (typeof InputTypes)[keyof typeof InputTypes];

interface InputProps {
	type: InputType;
	label: string;
	onChange: (value: string, id: string) => void;
	setPristine?: (pristine: boolean) => void;
	required?: boolean;
	placeholder: string;
	id: string;
	errorMessage?: string;
}

export const Input: FC<InputProps> = ({
	type,
	label,
	placeholder,
	onChange,
	required,
	setPristine,
	id,
	errorMessage,
}: InputProps) => {
	const [value, valueSet] = useState('');

	const idPrefix = useId();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		onChange(inputValue, id);
		valueSet(inputValue);
	};

	const handleBlur = () => {
		onChange(value, id);
		if (setPristine) {
			setPristine(false);
		}
	};

	return (
		<div className="mb-8 flex flex-col gap-1.5">
			<label className="font-bold" htmlFor={id + idPrefix}>
				{label}
			</label>
			<input
				name={id + idPrefix}
				className="border border-black rounded font-normal p-2 text-sm leading-6 placeholder:italic"
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={handleChange}
				onBlur={handleBlur}
				required={required}
				aria-invalid={errorMessage ? 'true' : 'false'}
				aria-describedby="errorMessage"
				id={id}
			/>
			{errorMessage && (
				<>
					{/* This is the visible error message for sighted users which is not read by screen readers */}
					<span id="errorMessage" className="block text-warning mt-1" aria-hidden>
						{errorMessage}
					</span>
					{/* This is an invisible error message for screen readers only */}
					<p aria-live="assertive" className="sr-only">
						{errorMessage}
					</p>
				</>
			)}
		</div>
	);
};
