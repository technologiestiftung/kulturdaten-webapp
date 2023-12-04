import ROUTES from "@common/routes";
import { colors, fontWeights, spacings, widths } from "@common/styleVariables";
import { IconName } from "@components/Icon";
import Spacer from "@components/Spacer";
import styled from "@emotion/styled";
import useUser from "@hooks/useUser";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useTranslations } from "use-intl";
import NavigationLink, { NavigationButton } from "./NavigationLink";
import OrganizationSelect from "./OrganizationSelect";

type Link = {
	href: string;
	icon: IconName;
	i18nKey: keyof IntlMessages["Navigation"];
};

function getLinks(): Array<Link> {
	return [
		{ href: ROUTES.attractions(), i18nKey: "link-admin-attractions", icon: "star" },
		{ href: ROUTES.locations(), i18nKey: "link-admin-locations", icon: "map-pin" },
		{ href: ROUTES.organizations(), i18nKey: "link-admin-organizations", icon: "drama" },
		{ href: ROUTES.users(), i18nKey: "link-admin-users", icon: "users" },
	];
}

const Container = styled.div({
	width: `min(100%, ${widths.sidebar})`,
	height: "100vh",
	position: "fixed",
	top: 0,
	left: `max(0, calc(50% - ${widths.maxContentWidth} / 2))`,
	overflow: "auto",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	padding: spacings.get(4),
	backgroundColor: colors.grayLight,
});

const PageTitle = styled.div({
	fontWeight: fontWeights.medium,
});

const LinkList = styled.ul({
	listStyle: "none",
	padding: 0,
});

const LinkItem = styled.li({});

export default function Navigation() {
	const t = useTranslations("Navigation");
	const { organizations, activeOrganization, selectOrganization, logOut } = useUser();
	const router = useRouter();
	const links = useMemo(() => getLinks(), []);
	const isLinkActive = useCallback(
		(href: string) => {
			const route = router.route;
			const useStrictComparison = route === "/" || href === "/";
			if (useStrictComparison) {
				return route === href;
			}
			return route.startsWith(href);
		},
		[router.route],
	);
	return (
		<Container>
			<nav>
				<PageTitle>{t("title")}</PageTitle>
				<Spacer size={20} />
				<OrganizationSelect
					organizations={organizations}
					activeOrganization={activeOrganization}
					onSelectOrganization={selectOrganization}
				/>
				<Spacer size={20} />
				<LinkList>
					{links.map((link, index) => (
						<LinkItem key={index}>
							<NavigationLink href={link.href} icon={link.icon} isActive={isLinkActive(link.href)}>
								{t(link.i18nKey)}
							</NavigationLink>
						</LinkItem>
					))}
				</LinkList>
			</nav>
			<nav>
				<LinkList>
					<LinkItem>
						<NavigationButton onClick={logOut} icon="log-out">
							{t("link-logout")}
						</NavigationButton>
					</LinkItem>
				</LinkList>
			</nav>
		</Container>
	);
}
