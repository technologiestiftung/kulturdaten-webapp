import { User } from "@api/client/models/User";
import Badge from "@components/Badge";
import Button from "@components/Button";
import ContentTable, { ACTIONS_CELL_STYLE } from "@components/ContentTable";
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
import UserEditModal from "./UserEditModal";
import UserInviteModal from "./UserInviteModal";
import UserName from "./UserName";
import { getRole } from "./service";

interface Props {
	users: User[];
	pagination: PaginationType;
}

export default function UsersPage(props: Props) {
	const t = useTranslations("Users");
	const router = useRouter();
	const [isInviteModalOpen, setInviteModalOpen] = useState(false);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [editedUser, setEditedUser] = useState<User | null>(null);
	const { user: activeUser, activeOrganization } = useUser();
	const { users, pagination } = props;
	const editUser = useCallback((user: User) => {
		setEditedUser(user);
		setEditModalOpen(true);
	}, []);
	const handleUpdated = useCallback(() => {
		router.replace(router.asPath, undefined, { scroll: false });
		// TODO: Show success message.
	}, [router]);
	const isCurrentUser = (user: User) => user.identifier === activeUser!.identifier;
	return (
		<Page metadata={{ title: t("page-title") }}>
			<PageTitleHeader
				title={t("page-title")}
				description={t("page-description", { organizationName: getLocalizedLabel(activeOrganization!.title) })}
				side={<Button onClick={() => setInviteModalOpen(true)}>{t("invite-user")}</Button>}
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
							const role = getRole(user, activeOrganization!);
							return role ? <UserRole role={role} /> : "-";
						},
						canBeSorted: false,
					},
					{
						header: "",
						getContent: (user) => <Actions user={user} onEdit={editUser} onUpdated={handleUpdated} />,
						canBeSorted: false,
						headerStyle: ACTIONS_CELL_STYLE,
						cellStyle: ACTIONS_CELL_STYLE,
					},
				]}
				onClickItem={editUser}
			/>
			<Spacer size={20} />
			<Pagination pagination={pagination} info={t("number-users", { count: pagination.totalCount })} />
			<UserInviteModal
				organization={activeOrganization!}
				isOpen={isInviteModalOpen}
				onClose={() => setInviteModalOpen(false)}
			/>
			{editedUser && (
				<UserEditModal
					user={editedUser}
					organization={activeOrganization!}
					isOpen={isEditModalOpen}
					onClose={() => setEditModalOpen(false)}
				/>
			)}
		</Page>
	);
}
