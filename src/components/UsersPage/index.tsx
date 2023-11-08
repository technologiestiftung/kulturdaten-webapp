import { Membership } from "@common/types";
import Badge from "@components/Badge";
import Button from "@components/Button";
import ContentTable, { ACTIONS_CELL_STYLE } from "@components/ContentTable";
import Page from "@components/Page";
import PageTitleHeader from "@components/PageTitleHeader";
import Spacer from "@components/Spacer";
import UserRoleSelect from "@components/UserRoleSelect";
import { Role } from "@contexts/userContext";
import useApiClient from "@hooks/useApiClient";
import useUser from "@hooks/useUser";
import { getLocalizedLabel } from "@utils/content";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useState } from "react";
import { useTranslations } from "use-intl";
import Actions from "./Actions";
import UserEditModal from "./UserEditModal";
import UserInviteModal from "./UserInviteModal";
import UserName from "./UserName";

interface Props {
	memberships: Membership[];
}

export default function UsersPage(props: Props) {
	const { memberships } = props;
	const t = useTranslations("Users");
	const router = useRouter();
	const apiClient = useApiClient();
	const [isInviteModalOpen, setInviteModalOpen] = useState(false);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [editedMembership, setEditedMembership] = useState<Membership | null>(null);
	const { user: activeUser, activeOrganization } = useUser();
	const reloadPage = useCallback(() => router.replace(router.asPath, undefined, { scroll: false }), [router]);
	const editMembership = useCallback((membership: Membership) => {
		setEditedMembership(membership);
		setEditModalOpen(true);
	}, []);
	const deleteMembership = useCallback(
		async (membership: Membership) => {
			// TODO: Error handling!
			await apiClient.manageYourOrganizationData.deleteOrganizationsMemberships(
				activeOrganization!.identifier,
				membership.userIdentifier,
			);
			reloadPage();
		},
		[activeOrganization, apiClient, reloadPage],
	);
	const handleChangeRole = useCallback(
		async (event: ChangeEvent<HTMLSelectElement>, membership: Membership) => {
			const newRole = event.target.value as Role;
			// TODO: Error handling!
			await apiClient.manageYourOrganizationData.patchOrganizationsMemberships(
				activeOrganization!.identifier,
				membership.userIdentifier,
				{ role: newRole },
			);
			reloadPage();
			// TODO: Show success message.
		},
		[apiClient, activeOrganization, reloadPage],
	);
	const isCurrentUser = (userIdentifier: string) => userIdentifier === activeUser!.identifier;
	return (
		<Page metadata={{ title: t("page-title") }}>
			<PageTitleHeader
				title={t("page-title")}
				description={t("page-description", { organizationName: getLocalizedLabel(activeOrganization!.title) })}
				side={<Button onClick={() => setInviteModalOpen(true)}>{t("invite-user")}</Button>}
			/>
			<Spacer size={20} />
			<ContentTable
				items={memberships}
				columns={[
					{
						header: t("table-header-email"),
						getContent: (membership) => (
							<>
								{membership.email}{" "}
								{isCurrentUser(membership.userIdentifier) && <Badge>{t("table-name-current-user-indicator")}</Badge>}
							</>
						),
						canBeSorted: false,
					},
					{
						header: t("table-header-name"),
						getContent: (membership) => <UserName user={membership} />,
						canBeSorted: false,
					},
					{
						header: t("table-header-role"),
						getContent: (membership) => {
							if (membership.role) {
								return (
									<UserRoleSelect
										value={membership.role}
										onClick={(event) => event.stopPropagation()}
										onChange={(event) => handleChangeRole(event, membership)}
										variation="table"
									/>
								);
							}
							return "-";
						},
						canBeSorted: false,
						headerStyle: { width: "160px" },
						cellStyle: { width: "160px" },
					},
					{
						header: "",
						getContent: (membership) => (
							<Actions membership={membership} onEdit={editMembership} onDelete={deleteMembership} />
						),
						canBeSorted: false,
						headerStyle: ACTIONS_CELL_STYLE,
						cellStyle: ACTIONS_CELL_STYLE,
					},
				]}
				onClickItem={editMembership}
			/>
			<Spacer size={20} />
			{t("number-users", { count: memberships.length })}
			<UserInviteModal
				organization={activeOrganization!}
				isOpen={isInviteModalOpen}
				onClose={() => setInviteModalOpen(false)}
			/>
			{editedMembership && (
				<UserEditModal
					membership={editedMembership}
					organization={activeOrganization!}
					isOpen={isEditModalOpen}
					onClose={() => setEditModalOpen(false)}
				/>
			)}
		</Page>
	);
}
