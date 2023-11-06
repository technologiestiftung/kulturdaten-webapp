import { borderRadiuses, colors, iconSizes, spacings } from "@common/styleVariables";
import styled from "@emotion/styled";
import { MouseEvent, ReactEventHandler, ReactNode, useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import Popover from "../Popover";

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

export interface MenuOption {
	label: ReactNode;
	onClick: ReactEventHandler<HTMLButtonElement>;
}

interface Props {
	options: MenuOption[];
}

export default function PopoverMenu({ options }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const handleItemClick = (event: MouseEvent<HTMLButtonElement>, option: MenuOption) => {
		event.stopPropagation();
		option.onClick(event);
		setIsOpen(false);
	};
	return (
		<Popover
			isOpen={isOpen}
			onOpenChange={setIsOpen}
			triggerProps={{
				color: "neutral",
				style: {
					padding: spacings.get(1.5),
				},
				children: <Icon name="chevron-down" size={iconSizes[16]} />,
				onClick: (event: MouseEvent) => event.stopPropagation(),
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
