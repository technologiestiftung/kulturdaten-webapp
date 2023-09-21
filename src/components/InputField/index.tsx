import React, { FC, ReactNode, useId, useState } from "react";

const InputTypes = {
	EMAIL: "email",
	PASSWORD: "password",
	TEXT: "text",
	URL: "url",
	TEL: "tel",
	NUMBER: "number",
} as const;

type InputType = (typeof InputTypes)[keyof typeof InputTypes];

interface InputProps {
	type?: InputType;
	label: ReactNode;
	onChange?: (value: string, id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
	setPristine?: (pristine: boolean) => void;
	required?: boolean;
	placeholder?: string;
	id: string;
	errorMessage?: string;
	initialValue?: string;
}

export const Input: FC<InputProps> = ({
	type = "text",
	label,
	placeholder,
	onChange,
	required,
	setPristine,
	id,
	errorMessage,
	initialValue,
}: InputProps) => {
	const [value, valueSet] = useState(initialValue || "");

	const idPrefix = useId();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		onChange?.(inputValue, id, e);
		valueSet(inputValue);
	};

	const handleBlur = () => {
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
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={handleChange}
				onBlur={handleBlur}
				required={required}
				aria-invalid={!!errorMessage}
				aria-describedby={"errorMessage" + idPrefix}
				id={id}
			/>
			{errorMessage && (
				<>
					{/* This is the visible error message for sighted users which is not read by screen readers */}
					<span id={"errorMessage" + idPrefix} className="block text-warning mt-1" aria-hidden>
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
