import { spacings } from "@common/styleVariables";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import PageTitle from "../PageTitle";

const Container = styled.div({
	display: "flex",
	flexFlow: "row wrap",
	justifyContent: "space-between",
	alignItems: "center",
	gap: spacings.get(2),
});

const Side = styled.div({});

interface Props {
	title: string;
	side: ReactNode;
}

export default function PageTitleHeader({ title, side }: Props) {
	return (
		<Container>
			<PageTitle>{title}</PageTitle>
			<Side>{side}</Side>
		</Container>
	);
}
