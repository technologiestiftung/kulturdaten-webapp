import { spacings } from "@common/styleVariables";
import PageTitle from "@components/PageTitle";
import styled from "@emotion/styled";
import { ReactNode } from "react";

const Container = styled.div({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	flexWrap: "wrap",
	gap: spacings.get(2),
});

const Side = styled.div({});

const Description = styled.div({
	marginTop: spacings.get(2),
});

interface Props {
	title: string;
	description?: string;
	side?: ReactNode;
}

export default function PageTitleHeader({ title, description, side }: Props) {
	return (
		<>
			<Container>
				<PageTitle>{title}</PageTitle>
				{side && <Side>{side}</Side>}
			</Container>
			{description && <Description>{description}</Description>}
		</>
	);
}
