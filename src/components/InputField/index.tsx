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
	validate?: (value: string) => string;
	onChange: (value: string, pristine: boolean, error: string, id: string) => void;
	required?: boolean;
	placeholder: string;
	id: string;
}

export const Input = ({
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		const error = validate ? validate(inputValue) : '';
		onChange(inputValue, pristine, error, id);
		valueSet(inputValue);
		setPristine(pristine);
		errorSet(error);
	};

	const handleBlur = () => {
		setPristine(false);
		onChange(value, pristine, error, id);
	};

	return (
		<div className="mb-8">
			<label className="flex flex-col font-bold">
				{label}
				<input
					className="border border-black rounded font-normal p-2 text-sm leading-6 placeholder:italic"
					type={type}
					value={value}
					placeholder={placeholder}
					onChange={handleChange}
					onBlur={handleBlur}
					required={required}
					id={id}
				/>
			</label>
			{error && !pristine && <span className="block text-warning mt-3">{error}</span>}
		</div>
	);
};
