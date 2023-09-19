import { spacings, widths } from "@common/styleVariables";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import Head from "./Head";
import Navigation from "./Navigation";

const PageContainer = styled.div({
	width: `min(100%, ${widths.maxContentWidth})`,
	margin: "0 auto",
	position: "relative",
});

const Main = styled.main(() => ({
	width: `calc(100% - ${widths.sidebar})`,
	margin: "0 0 0 auto",
	padding: spacings.get(4),
}));

export interface Metadata {
	title: string;
	description?: string;
	image?: string;
	imageAlt?: string;
	url?: string;
}

interface Props {
	children: ReactNode;
	metadata: Metadata;
}

export default function Page({ children, metadata }: Props) {
	return (
		<>
			<Head metadata={metadata} />
			<PageContainer>
				<Navigation />
				<Main>{children}</Main>
			</PageContainer>
		</>
	);
}
