import { Organization } from "@api/client/models/Organization";
import { UpdateOrganizationMembershipRequest } from "@api/client/models/UpdateOrganizationMembershipRequest";
import { Membership } from "@common/types";
import FormField from "@components/FormField";
import Modal from "@components/Modal";
import Spacer from "@components/Spacer";
import UserRoleSelect from "@components/UserRoleSelect";
import { Role } from "@contexts/userContext";
import useApiClient from "@hooks/useApiClient";
import { getFullName } from "@utils/users";
import { useTranslations } from "next-intl";
import { FormEventHandler, useCallback, useState } from "react";
import Buttons from "./Buttons";
import Error from "./Error";

interface Props {
	membership: Membership;
	organization: Organization;
	isOpen: boolean;
	onClose(): void;
	onChanged(): void;
}

export default function MembershipEditModal(props: Props) {
	const { membership, organization, isOpen, onClose, onChanged } = props;
	const t = useTranslations("User-Details");
	const apiClient = useApiClient();
	const initialRequest: UpdateOrganizationMembershipRequest = { role: membership.role };
	const [request, setRequest] = useState<UpdateOrganizationMembershipRequest>(initialRequest);
	const [error, setError] = useState<string | null>(null);
	const handleSubmit = useCallback<FormEventHandler>(
		async (event) => {
			event.preventDefault();
			setError(null);
			const hasRoleChanged = request.role !== membership.role;
			// If there is nothing to save, just close the modal.
			if (!hasRoleChanged) {
				onClose();
				return;
			}
			try {
				await apiClient.manageYourOrganizationData.patchOrganizationsMemberships(
					organization.identifier,
					membership.userIdentifier,
					request,
				);
			} catch (error) {
				setError((error as Error).message);
				return;
			}
			onChanged();
		},
		[request, membership, onChanged, onClose, apiClient.manageYourOrganizationData, organization.identifier],
	);
	const handleDelete = useCallback(async () => {
		setError(null);
		try {
			await apiClient.manageYourOrganizationData.deleteOrganizationsMemberships(
				organization.identifier,
				membership.userIdentifier,
			);
		} catch (error) {
			setError((error as Error).message);
			return;
		}
		onChanged();
	}, [apiClient, organization.identifier, membership.userIdentifier, onChanged]);
	return (
		<Modal
			modalTitle={t("edit-modal-title")}
			isOpen={isOpen}
			onClose={onClose}
			onAfterClose={() => {
				setRequest(initialRequest);
				setError(null);
			}}
			minWidth="550px"
		>
			<form onSubmit={handleSubmit}>
				<FormField
					label={t("label-name")}
					id="name"
					value={getFullName(membership)}
					readOnly={true}
					disabled={true}
					required={true}
				/>
				<Spacer size={15} />
				<FormField
					label={t("label-email")}
					id="email"
					type="email"
					value={membership.email}
					readOnly={true}
					disabled={true}
					required={true}
				/>
				<Spacer size={15} />
				<FormField
					component={UserRoleSelect}
					label={t("label-role")}
					id="role"
					value={request.role}
					onChange={(event) => {
						setRequest((prev) => ({
							...prev,
							role: event.target.value as Role,
						}));
					}}
					required={true}
				/>
				<Spacer size={20} />
				<Buttons onClose={onClose} onDelete={handleDelete} />
				{error && <Spacer size={15} />}
				<Error error={error} />
			</form>
		</Modal>
	);
}
