import React from 'react';

interface DropdownProps {
	label: string;
	options: {
		value: string;
		label: string;
	}[];
	value?: string;
}
//CHatGPT for generic type infusion

const Dropdown = ({ label, options }: DropdownProps) => {
	return (
		<div className="mb-8 flex flex-col gap-1.5">
			<label htmlFor="district" className="font-bold">
				{label}
			</label>
			<select
				name="district"
				className="border border-black rounded font-normal p-2 py-3 text-sm leading-6 placeholder:italic p-2 bg-white"
			>
				{options.map((option) => (
					<option key={option.label} value={option.value || undefined}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Dropdown;
