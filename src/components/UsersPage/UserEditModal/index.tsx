import { Organization } from "@api/client/models/Organization";
import { UpdateOrganizationMembershipRequest } from "@api/client/models/UpdateOrganizationMembershipRequest";
import { User } from "@api/client/models/User";
import FormField from "@components/FormField";
import Modal from "@components/Modal";
import Spacer from "@components/Spacer";
import UserRoleSelect from "@components/UserRoleSelect";
import { Role } from "@contexts/userContext";
import useApiClient from "@hooks/useApiClient";
import { getFullName } from "@utils/users";
import { useTranslations } from "next-intl";
import { FormEventHandler, useCallback, useState } from "react";
import { getRole } from "../service";
import Buttons from "./Buttons";
import Error from "./Error";

interface Props {
	user: User;
	organization: Organization;
	isOpen: boolean;
	onClose(): void;
}

export default function UserEditModal(props: Props) {
	const { user, organization, isOpen, onClose } = props;
	const t = useTranslations("User-Details");
	const apiClient = useApiClient();
	const initialRequest: UpdateOrganizationMembershipRequest = { role: getRole(user, organization)! };
	const [request, setRequest] = useState<UpdateOrganizationMembershipRequest>(initialRequest);
	const [error, setError] = useState<string | null>(null);
	const handleSubmit = useCallback<FormEventHandler>(
		async (event) => {
			event.preventDefault();
			setError(null);
			try {
				await apiClient.manageYourOrganizationData.patchOrganizationsMemberships(
					organization.identifier,
					user.identifier,
					request,
				);
			} catch (error) {
				setError((error as Error).message);
				return;
			}
			onClose();
		},
		[apiClient, organization.identifier, user.identifier, request, onClose],
	);
	const handleDelete = useCallback(async () => {
		setError(null);
		try {
			await apiClient.manageYourOrganizationData.deleteOrganizationsMemberships(
				organization.identifier,
				user.identifier,
			);
		} catch (error) {
			setError((error as Error).message);
			return;
		}
		onClose();
	}, [apiClient, organization.identifier, user.identifier, onClose]);
	return (
		<Modal
			modalTitle={t("edit-modal-title")}
			isOpen={isOpen}
			onClose={onClose}
			onAfterClose={() => {
				setRequest(initialRequest);
				setError(null);
			}}
		>
			<form onSubmit={handleSubmit}>
				<FormField
					label={t("label-name")}
					id="name"
					value={getFullName(user)}
					readOnly={true}
					disabled={true}
					required={true}
				/>
				<Spacer size={15} />
				<FormField
					label={t("label-email")}
					id="email"
					type="email"
					value={user.email}
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
