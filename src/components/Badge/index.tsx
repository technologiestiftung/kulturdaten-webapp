import { borderRadiuses, colors, fontSizes, spacings } from "@common/styleVariables";
import styled from "@emotion/styled";
import { ReactNode } from "react";

const Container = styled.span({
	fontSize: fontSizes.small,
	borderRadius: borderRadiuses.medium,
	color: colors.white,
	padding: `${spacings.get(0.5)} ${spacings.get(1)}`,
});

type ColorKey = keyof typeof colors;

interface Props {
	children: ReactNode;
	color?: ColorKey;
}

export default function Badge({ children, color = "mediumContrast" }: Props) {
	return (
		<Container
			style={{
				backgroundColor: colors[color],
			}}
		>
			{children}
		</Container>
	);
}
