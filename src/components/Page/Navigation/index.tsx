import ROUTES from "@common/routes";
import { colors, fontSizes, fontWeights, spacings, widths } from "@common/styleVariables";
import { IconName } from "@components/Icon";
import Spacer from "@components/Spacer";
import styled from "@emotion/styled";
import useUser from "@hooks/useUser";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useTranslations } from "use-intl";
import NavigationLink, { NavigationButton } from "./NavigationLink";
import OrganizationSelect from "./OrganizationSelect";

type NavigationGroupType = "user" | "admin";

type NavigationGroup = {
	type: NavigationGroupType;
	i18nKey: keyof IntlMessages["Navigation"];
	links: Array<Link>;
};

export type Link = {
	href: string;
	icon: IconName;
	i18nKey: keyof IntlMessages["Navigation"];
};

function getNavigationGroups(isAdmin: boolean): Array<NavigationGroup> {
	const userNavigationGroup: NavigationGroup = {
		type: "user",
		i18nKey: "group-user",
		links: [{ href: ROUTES.user.attractions(), i18nKey: "link-user-attractions", icon: "star" }],
	};
	const adminNavigationGroup: NavigationGroup = {
		type: "admin",
		i18nKey: "group-admin",
		links: [
			{ href: ROUTES.admin.attractions(), i18nKey: "link-admin-attractions", icon: "star" },
			{ href: ROUTES.admin.locations(), i18nKey: "link-admin-locations", icon: "map-pin" },
			{ href: ROUTES.admin.organizations(), i18nKey: "link-admin-organizations", icon: "users" },
		],
	};
	return [userNavigationGroup, ...(isAdmin ? [adminNavigationGroup] : [])];
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

const Group = styled.nav({});

const GroupTitle = styled.div({
	color: colors.black,
	fontWeight: fontWeights.medium,
	fontSize: fontSizes.small,
});

const GroupList = styled.ul({
	listStyle: "none",
	padding: 0,
	margin: `0px -${spacings.get(2)}`,
});

const GroupItem = styled.li({});

export default function Navigation() {
	const t = useTranslations("Navigation");
	const { organizations, activeOrganization, activeRole, selectOrganization, logOut } = useUser();
	const router = useRouter();
	const isAdmin = activeRole === "admin";
	const navigationGroups = useMemo(() => getNavigationGroups(isAdmin), [isAdmin]);
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
			<div>
				<PageTitle>{t("title")}</PageTitle>
				<Spacer size={20} />
				<OrganizationSelect
					organizations={organizations}
					activeOrganization={activeOrganization}
					onSelectOrganization={selectOrganization}
				/>
				<Spacer size={20} />
				{navigationGroups.map((group, index) => (
					<Group key={index}>
						<GroupTitle>{t(group.i18nKey)}</GroupTitle>
						<GroupList>
							{group.links.map((link, index) => (
								<GroupItem key={index}>
									<NavigationLink href={link.href} icon={link.icon} isActive={isLinkActive(link.href)}>
										{t(link.i18nKey)}
									</NavigationLink>
								</GroupItem>
							))}
						</GroupList>
						<Spacer size={20} />
					</Group>
				))}
			</div>
			<div>
				<GroupList>
					<GroupItem>
						<NavigationButton onClick={logOut} icon="log-out">
							{t("link-logout")}
						</NavigationButton>
					</GroupItem>
				</GroupList>
			</div>
		</Container>
	);
}
