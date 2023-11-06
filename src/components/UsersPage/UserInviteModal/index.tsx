import { Organization } from "@api/client/models/Organization";
import FormField from "@components/FormField";
import Modal from "@components/Modal";
import Spacer from "@components/Spacer";
import UserRoleSelect from "@components/UserRoleSelect";
import { Role } from "@contexts/userContext";
import { useTranslations } from "next-intl";
import { FormEventHandler, useCallback, useState } from "react";
import { UserInviteRequest, getInitialRequest } from "../service";
import Buttons from "./Buttons";

interface Props {
	organization: Organization;
	isOpen: boolean;
	onClose(): void;
}

export default function UserInviteModal(props: Props) {
	const { organization, isOpen, onClose } = props;
	const t = useTranslations("User-Details");
	const defaultRequest = getInitialRequest(null, organization);
	const [request, setRequest] = useState<UserInviteRequest>(defaultRequest);
	// TODO: const apiClient = useApiClient();
	const handleSubmit = useCallback<FormEventHandler>(
		async (event) => {
			event.preventDefault();
			// TODO: Invite user via apiClient (and show error message if it failed).
			onClose();
		},
		[onClose],
	);
	return (
		<Modal
			modalTitle={t("invite-modal-title")}
			isOpen={isOpen}
			onClose={onClose}
			onAfterClose={() => setRequest(defaultRequest)}
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
			</form>
		</Modal>
	);
}
