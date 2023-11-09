import { borderRadiuses, colors, fontSizes, getAsNumber, spacings } from "@common/styleVariables";
import ReactSelect, { GroupBase, Props as ReactSelectProps } from "react-select";

export default function Select<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>,
>(props: ReactSelectProps<Option, IsMulti, Group>) {
	return (
		<ReactSelect
			{...props}
			theme={(theme) => ({
				...theme,
				borderRadius: getAsNumber(borderRadiuses.medium),
				spacing: {
					baseUnit: spacings.getNumber(1),
					controlHeight: 16,
					menuGutter: spacings.getNumber(1),
				},
				colors: {
					...theme.colors,
					neutral0: colors.white,
					primary: colors.blueDark,
					primary25: colors.blueLight,
					// TODO: Override more colors with our own, if needed.
				},
			})}
			styles={{
				control: (baseStyles, state) => ({
					...baseStyles,
					fontSize: fontSizes.small,
					border: `1px solid ${state.isFocused ? colors.mediumContrast : colors.neutral300}`,
					cursor: "pointer",
				}),
				option: (baseStyles) => ({
					...baseStyles,
					fontSize: fontSizes.small,
					cursor: "pointer",
				}),
				noOptionsMessage: (baseStyles) => ({
					...baseStyles,
					fontSize: fontSizes.small,
				}),
			}}
		/>
	);
}
