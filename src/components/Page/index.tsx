import { boxShadows, colors, mediaQueries, spacings, widths } from "@common/styleVariables";
import styled from "@emotion/styled";
import { ReactNode, useState } from "react";
import Head from "./Head";
import Navigation from "./Navigation";
import NavigationMobile from "./NavigationMobile";
import NavigationOverlay from "./NavigationOverlay";

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
	const [navigationExpanded, setNavigationExpanded] = useState(false);
	return (
		<>
			<Head metadata={metadata} />
			<PageContainer>
				{showNavigation && (
					<>
						{navigationExpanded && <NavigationOverlay onCollapse={() => setNavigationExpanded(false)} />}
						<Navigation expanded={navigationExpanded} onCollapse={() => setNavigationExpanded(false)} />
						<NavigationMobile onExpand={() => setNavigationExpanded(true)} />
					</>
				)}
				<Main>{children}</Main>
			</PageContainer>
		</>
	);
}
