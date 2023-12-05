import { boxShadows, colors, mediaQueries, spacings, widths } from "@common/styleVariables";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import Head from "./Head";
import NavigationDesktop from "./NavigationDesktop";
import NavigationMobile from "./NavigationMobile";

const PageContainer = styled.div({
	width: `min(100%, ${widths.maxContentWidth})`,
	margin: "0 auto",
	position: "relative",
	boxShadow: boxShadows.elevation100,
});

const Main = styled.main({
	width: "100%",
	minHeight: "100vh",
	margin: "0 0 0 auto",
	padding: spacings.get(2),
	backgroundColor: colors.white,
	[mediaQueries.m]: {
		width: `calc(100% - ${widths.sidebar})`,
		padding: spacings.get(4),
	},
});

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
				{showNavigation && (
					<>
						<NavigationDesktop />
						<NavigationMobile />
					</>
				)}
				<Main>{children}</Main>
			</PageContainer>
		</>
	);
}
