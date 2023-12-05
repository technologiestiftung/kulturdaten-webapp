import ROUTES from "@common/routes";
import { colors, fontWeights, iconSizes, mediaQueries, spacings, widths } from "@common/styleVariables";
import Button from "@components/Button";
import Icon, { IconName } from "@components/Icon";
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
		{ href: ROUTES.attractions(), i18nKey: "link-attractions", icon: "star" },
		{ href: ROUTES.locations(), i18nKey: "link-locations", icon: "map-pin" },
		{ href: ROUTES.organizations(), i18nKey: "link-organizations", icon: "drama" },
		{ href: ROUTES.users(), i18nKey: "link-users", icon: "users" },
	];
}

const Container = styled.div({
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	width: widths.sidebar,
	maxWidth: "100%",
	height: "100vh",
	padding: spacings.get(3),
	backgroundColor: colors.grayLight,
	[mediaQueries.m]: {
		padding: spacings.get(4),
	},
});

const Header = styled.div({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
});

const PageTitle = styled.div({
	fontWeight: fontWeights.medium,
});

const CollapseButton = styled(Button)({
	padding: spacings.get(1),
});

const LinkList = styled.ul({
	listStyle: "none",
	padding: 0,
});

const LinkItem = styled.li({});

interface Props {
	onCollapse?(): void;
}

export default function Navigation({ onCollapse }: Props) {
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
				<Header>
					<PageTitle>{t("title")}</PageTitle>
					{onCollapse && (
						<CollapseButton color="neutral" onClick={onCollapse} title={t("menu-collapse")}>
							<Icon name="arrow-left-from-line" size={iconSizes[24]} />
						</CollapseButton>
					)}
				</Header>
				<Spacer size={20} />
				<OrganizationSelect
					organizations={organizations}
					activeOrganization={activeOrganization}
					onSelectOrganization={selectOrganization}
				/>
				<Spacer size={30} />
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
