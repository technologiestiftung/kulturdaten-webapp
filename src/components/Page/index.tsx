import { boxShadows, colors, spacings, widths } from "@common/styleVariables";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import Head from "./Head";
import Navigation from "./Navigation";

const PageContainer = styled.div({
	width: `min(100%, ${widths.maxContentWidth})`,
	margin: "0 auto",
	position: "relative",
	boxShadow: boxShadows.elevation100,
});

const Main = styled.main<{ showNavigation: boolean }>(({ showNavigation }) => ({
	width: showNavigation ? `calc(100% - ${widths.sidebar})` : "100%",
	minHeight: "100vh",
	margin: "0 0 0 auto",
	padding: spacings.get(4),
	backgroundColor: colors.white,
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
	showNavigation?: boolean;
}

export default function Page({ children, metadata, showNavigation = true }: Props) {
	return (
		<>
			<Head metadata={metadata} />
			<PageContainer>
				{showNavigation && <Navigation />}
				<Main showNavigation={showNavigation}>{children}</Main>
			</PageContainer>
		</>
	);
}
