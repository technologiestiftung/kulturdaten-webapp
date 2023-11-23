import { CreateMembershipRequest } from "@api/client/models/CreateMembershipRequest";
import { Organization } from "@api/client/models/Organization";
import { Role } from "@common/types";
import FormField from "@components/FormField";
import Modal from "@components/Modal";
import Spacer from "@components/Spacer";
import UserRoleSelect from "@components/UserRoleSelect";
import useApiClient from "@hooks/useApiClient";
import { useTranslations } from "next-intl";
import { FormEventHandler, useCallback, useState } from "react";
import Buttons from "./Buttons";
import Error from "./Error";

interface Props {
	organization: Organization;
	isOpen: boolean;
	onClose(): void;
	onInvited(): void;
}

export default function UserInviteModal(props: Props) {
	const { organization, isOpen, onClose, onInvited } = props;
	const t = useTranslations("User-Details");
	const apiClient = useApiClient();
	const defaultRequest: CreateMembershipRequest = {
		email: "",
		role: "member",
	};
	const [request, setRequest] = useState<CreateMembershipRequest>(defaultRequest);
	const [error, setError] = useState<string | null>(null);
	const handleSubmit = useCallback<FormEventHandler>(
		async (event) => {
			event.preventDefault();
			try {
				setError(null);
				await apiClient.manageYourOrganizationData.postOrganizationsMemberships(organization.identifier, request);
			} catch (error) {
				setError((error as Error).message);
				return;
			}
			onInvited();
		},
		[apiClient, organization.identifier, request, onInvited],
	);
	return (
		<Modal
			modalTitle={t("invite-modal-title")}
			isOpen={isOpen}
			onClose={onClose}
			onAfterClose={() => {
				setRequest(defaultRequest);
				setError(null);
			}}
		>
			<form onSubmit={handleSubmit}>
				<FormField
					label={t("label-email")}
					id="email"
					type="email"
					value={request.email}
					onChange={(event) => {
						setRequest((prev) => ({
							...prev,
							email: event.target.value,
						}));
					}}
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
				<Buttons onClose={onClose} />
				{error && <Spacer size={15} />}
				<Error error={error} />
			</form>
		</Modal>
	);
}
