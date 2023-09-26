import { borderRadiuses, colors, spacings } from "@common/styleVariables";
import styled from "@emotion/styled";
import { MouseEvent, ReactEventHandler, ReactNode } from "react";
import Button from "../Button";
import Icon from "../Icon";
import Popover from "../Popover";

const TriggerIcon = styled.div({
	width: "1rem",
});

const Options = styled.ul({
	listStyle: "none",
	padding: 0,
	backgroundColor: colors.white,
	border: `1px solid ${colors.neutral300}`,
	borderRadius: borderRadiuses.medium,
});

const Option = styled.li({});

const OptionButton = styled(Button)(() => ({
	width: "100%",
	textAlign: "left",
	padding: `${spacings.get(1)} ${spacings.get(2)}`,
	"&:hover": {
		cursor: "pointer",
		backgroundColor: colors.neutral200,
	},
}));

interface MenuOption {
	label: ReactNode;
	onClick: ReactEventHandler<HTMLButtonElement>;
}

interface Props {
	options: MenuOption[];
}

export default function PopoverMenu({ options }: Props) {
	const handleItemClick = (event: MouseEvent<HTMLButtonElement>, option: MenuOption) => {
		event.stopPropagation();
		option.onClick(event);
	};
	return (
		<Popover
			triggerProps={{
				color: "neutral",
				style: {
					padding: spacings.get(2),
				},
				children: (
					<TriggerIcon>
						<Icon name="chevron-down" size="1rem" />
					</TriggerIcon>
				),
			}}
		>
			<Options>
				{options.map((option, index) => (
					<Option key={index}>
						<OptionButton unstyled={true} onClick={(event) => handleItemClick(event, option)}>
							{option.label}
						</OptionButton>
					</Option>
				))}
			</Options>
		</Popover>
	);
}
