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
	validate?: (value: string) => string;
	onChange: (value: string, pristine: boolean, error: string, id: string) => void;
	required?: boolean;
	placeholder: string;
	id: string;
	errorMessage?: string;
}

export const Input: FC<InputProps> = ({
	type,
	label,
	placeholder,
	validate,
	onChange,
	required,
	id,
}: InputProps) => {
	const [value, valueSet] = useState('');
	const [error, errorSet] = useState<string>('');
	const [pristine, setPristine] = useState(true);

	const idPrefix = useId();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		const error = validate ? validate(inputValue) : '';
		onChange(inputValue, pristine, error, id);
		valueSet(inputValue);
		setPristine(pristine);
		errorSet(error);
	};

	const handleBlur = () => {
		const pristine = false;
		onChange(value, pristine, error, id);
		setPristine(pristine);
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
				aria-invalid={error.length > 0}
				aria-describedby="errorMessage"
				id={id}
			/>
			{error && !pristine && (
				//This is the visible error message for sighted users which is not read by screen readers
				<span id="errorMessage" className="block text-warning mt-1" aria-hidden>
					{error}
				</span>
			)}
			{/* This is an invisible error message for screen readers only */}
			{!pristine && (
				<p aria-live="assertive" className="sr-only">
					{error}
				</p>
			)}
		</div>
	);
};
