import { colors, fontSizes, fontWeights, spacings, widths } from "@common/styleVariables";
import { IconName } from "@components/Icon";
import Spacer from "@components/Spacer";
import styled from "@emotion/styled";
import useUser from "@hooks/useUser";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useTranslations } from "use-intl";
import NavigationLink, { NavigationButton } from "./NavigationLink";

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
		links: [
			{ href: "/", i18nKey: "link-offers", icon: "star" },
			{ href: "/locations", i18nKey: "link-locations", icon: "map-pin" },
		],
	};
	const adminNavigationGroup: NavigationGroup = {
		type: "admin",
		i18nKey: "group-admin",
		links: [{ href: "/organizations", i18nKey: "link-organizations", icon: "users" }],
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
	const { logOut } = useUser();
	const router = useRouter();
	const isAdmin = true;
	const navigationGroups = useMemo(() => getNavigationGroups(isAdmin), [isAdmin]);
	const isLinkActive = useCallback(
		(href: string) => {
			const path = router.asPath;
			const useStrictComparison = path === "/" || href === "/";
			if (useStrictComparison) {
				return path === href;
			}
			return path.startsWith(href);
		},
		[router.asPath],
	);
	return (
		<Container>
			<div>
				<PageTitle>{t("title")}</PageTitle>
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
