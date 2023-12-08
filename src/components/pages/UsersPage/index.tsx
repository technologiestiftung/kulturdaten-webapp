import { Membership, Role } from "@common/types";
import Badge from "@components/Badge";
import Button from "@components/Button";
import ContentTable, { ACTIONS_CELL_STYLE } from "@components/ContentTable";
import Page from "@components/Page";
import PageTitleHeader from "@components/PageTitleHeader";
import { PaginationInfo } from "@components/Pagination";
import Spacer from "@components/Spacer";
import UserRoleSelect from "@components/UserRoleSelect";
import useApiClient from "@hooks/useApiClient";
import useUser from "@hooks/useUser";
import { getLocalizedLabel } from "@services/content";
import { showErrorToast, showSuccessToast } from "@services/toast";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useState } from "react";
import { useTranslations } from "use-intl";
import Actions from "./Actions";
import MembershipEditModal from "./MembershipEditModal";
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
			try {
				await apiClient.manageYourOrganizationData.deleteOrganizationsMemberships(
					activeOrganization!.identifier,
					membership.userIdentifier,
				);
				showSuccessToast(t("membership-delete-success"));
				reloadPage();
			} catch (error) {
				showErrorToast(t("membership-delete-error"));
			}
		},
		[activeOrganization, apiClient, reloadPage, t],
	);
	const handleChangeRole = useCallback(
		async (event: ChangeEvent<HTMLSelectElement>, membership: Membership) => {
			try {
				const newRole = event.target.value as Role;
				await apiClient.manageYourOrganizationData.patchOrganizationsMemberships(
					activeOrganization!.identifier,
					membership.userIdentifier,
					{ role: newRole },
				);
				showSuccessToast(t("role-update-success"));
				reloadPage();
			} catch (error) {
				showErrorToast(t("role-update-error"));
			}
		},
		[apiClient, activeOrganization, reloadPage, t],
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
			<PaginationInfo info={t("number-users", { count: memberships.length })} />
			<UserInviteModal
				organization={activeOrganization!}
				isOpen={isInviteModalOpen}
				onClose={() => setInviteModalOpen(false)}
				onInvited={() => {
					setInviteModalOpen(false);
					showSuccessToast(t("membership-invite-success"));
					reloadPage();
				}}
			/>
			{editedMembership && (
				<MembershipEditModal
					membership={editedMembership}
					organization={activeOrganization!}
					isOpen={isEditModalOpen}
					onClose={() => setEditModalOpen(false)}
					onChanged={() => {
						setEditModalOpen(false);
						setEditedMembership(null);
						showSuccessToast(t("user-edit-success"));
						reloadPage();
					}}
				/>
			)}
		</Page>
	);
}
