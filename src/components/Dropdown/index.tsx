import React from 'react';

interface DropdownProps {
	label: string;
	options: {
		value: string;
		label: string;
	}[];
	value?: string;
	onChange: (value: string, id: string, e: React.ChangeEvent<HTMLSelectElement>) => void;
	id: string;
}
//CHatGPT for generic type infusion

const Dropdown = ({ label, options, onChange, id, value }: DropdownProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const inputValue = e.target.value;
		console.log(inputValue);
		onChange(inputValue, id, e);
	};

	return (
		<div className="mb-8 flex flex-col gap-1.5">
			<label htmlFor="district" className="font-bold">
				{label}
			</label>
			<select
				name="district"
				className="border border-black rounded font-normal p-2 py-3 text-sm leading-6 placeholder:italic p-2 bg-white"
				onChange={(e) => handleChange(e)}
				value={value || undefined}
			>
				{options.map((option) => (
					<option key={option.label} value={option.label || undefined}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Dropdown;
