import { User } from "@api/client/models/User";
import { spacings } from "@common/styleVariables";
import Page from "@components/Page";
import useUser from "@hooks/useUser";
import { getLocalizedLabel } from "@utils/content";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useTranslations } from "use-intl";
import Badge from "../Badge";
import ContentTable from "../ContentTable";
import PageTitleHeader from "../PageTitleHeader";
import Pagination, { PaginationType } from "../Pagination";
import Spacer from "../Spacer";
import Actions from "./Actions";
import UserName from "./UserName";

interface Props {
	users: User[];
	pagination: PaginationType;
}

export default function UsersPage(props: Props) {
	const t = useTranslations("Users");
	const router = useRouter();
	const { user: activeUser, activeOrganization } = useUser();
	const { users, pagination } = props;
	const handleUpdated = useCallback(() => {
		router.replace(router.asPath, undefined, { scroll: false });
		// TODO: Show success message.
	}, [router]);
	const isCurrentUser = (user: User) => user.identifier === activeUser!.identifier;
	const getRole = (user: User) =>
		user.memberships.find((membership) => membership.organizationIdentifier === activeOrganization?.identifier)?.role;
	return (
		<Page metadata={{ title: t("page-title") }}>
			<PageTitleHeader
				title={t("page-title")}
				description={t("page-description", { organizationName: getLocalizedLabel(activeOrganization!.title) })}
			/>
			<Spacer size={20} />
			<ContentTable
				items={users}
				columns={[
					{
						header: t("table-header-email"),
						getContent: (user) => (
							<>
								{user.email} {isCurrentUser(user) && <Badge>{t("table-name-current-user-indicator")}</Badge>}
							</>
						),
						canBeSorted: false,
					},
					{
						header: t("table-header-name"),
						getContent: (user) => <UserName user={user} />,
						canBeSorted: false,
					},
					{
						header: t("table-header-role"),
						getContent: (user) => getRole(user),
						canBeSorted: false,
					},
					{
						header: "",
						getContent: (user) => <Actions user={user} onUpdated={handleUpdated} />,
						canBeSorted: false,
						headerStyle: { padding: `0 ${spacings.get(1)} 0 0` },
						cellStyle: { padding: `0 ${spacings.get(1)} 0 0` },
					},
				]}
				// onClickItem={(attraction) => router.push(ROUTES.admin.attractionDetails(attraction.identifier))}
			/>
			<Spacer size={20} />
			<Pagination pagination={pagination} info={t("number-users", { count: pagination.totalCount })} />
		</Page>
	);
}
