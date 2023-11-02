import { User } from "@api/client/models/User";
import { spacings } from "@common/styleVariables";
import Badge from "@components/Badge";
import Button from "@components/Button";
import ContentTable from "@components/ContentTable";
import Page from "@components/Page";
import PageTitleHeader from "@components/PageTitleHeader";
import Pagination, { PaginationType } from "@components/Pagination";
import Spacer from "@components/Spacer";
import UserRole from "@components/UserRole";
import useUser from "@hooks/useUser";
import { getLocalizedLabel } from "@utils/content";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useTranslations } from "use-intl";
import Actions from "./Actions";
import UserAddModal from "./UserAddModal";
import UserName from "./UserName";

interface Props {
	users: User[];
	pagination: PaginationType;
}

export default function UsersPage(props: Props) {
	const t = useTranslations("Users");
	const router = useRouter();
	const [isAddModalOpen, setAddModalOpen] = useState(false);
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
				side={<Button onClick={() => setAddModalOpen(true)}>{t("add-user")}</Button>}
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
						getContent: (user) => {
							const role = getRole(user);
							return role ? <UserRole role={role} /> : "-";
						},
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
			<UserAddModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
		</Page>
	);
}
