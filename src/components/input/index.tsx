import React, { useEffect, useState } from 'react';

const InputTypes = {
	EMAIL: 'email',
	PASSWORD: 'password',
	TEXT: 'text',
	URL: 'url',
	TEL: 'tel',
} as const;

type InputType = (typeof InputTypes)[keyof typeof InputTypes];

interface InputProps {
	type: InputType;
	label: string;
	placeholder: string;
	validate?: (value: string) => string | null;
	onChange: (value: string, pristine: boolean, error: string | null) => void;
	required?: boolean;
}

export const Input = ({ type, label, placeholder, validate, onChange, required }: InputProps) => {
	const [value, valueSet] = useState('');
	const [error, errorSet] = useState<string | null>(null);
	const [pristine, setPristine] = useState(true);

	const handleChange = (e) => {
		const inputValue = e.target.value;
		setPristine(false);
		errorSet(null);
		valueSet(inputValue);
	};

	const handleBlur = () => {
		if (validate) {
			errorSet(validate(value));
		}
	};

	useEffect(() => {
		onChange(value, pristine, error);
	}, [value, onChange]);

	return (
		<div className="mb-8">
			<label className="flex flex-col font-bold">
				{label}
				<input
					className="border border-black rounded-md font-normal p-2 text-sm leading-6"
					data-type={type}
					data-value={value}
					placeholder={placeholder}
					onChange={handleChange}
					onBlur={handleBlur}
					data-required={required}
				/>
			</label>
			{error && <span style={{ color: 'red' }}>{error}</span>}
		</div>
	);
};
