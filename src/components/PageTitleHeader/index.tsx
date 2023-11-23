import { mediaQueries, spacings } from "@common/styleVariables";
import PageTitle from "@components/PageTitle";
import styled from "@emotion/styled";
import { ReactNode } from "react";

const Container = styled.div({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "flex-start",
	flexWrap: "wrap",
	gap: spacings.get(2),
	[mediaQueries.m]: {
		flexWrap: "nowrap",
	},
});

const Side = styled.div({
	marginTop: "5px",
});

interface Props {
	title: string;
	description?: string;
	side?: ReactNode;
}

export default function PageTitleHeader({ title, description, side }: Props) {
	return (
		<Container>
			<div>
				<PageTitle>{title}</PageTitle>
				{description}
			</div>
			{side && <Side>{side}</Side>}
		</Container>
	);
}
