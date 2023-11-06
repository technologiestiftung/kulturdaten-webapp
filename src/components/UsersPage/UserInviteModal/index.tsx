import { Organization } from "@api/client/models/Organization";
import FormField from "@components/FormField";
import Modal from "@components/Modal";
import SelectNative from "@components/SelectNative";
import Spacer from "@components/Spacer";
import UserRole from "@components/UserRole";
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
			setRequest(defaultRequest);
		},
		[defaultRequest, onClose],
	);
	const roles: Role[] = ["admin", "editor", "author", "member", "unassigned"];
	return (
		<Modal
			modalTitle={t("modal-title")}
			isOpen={isOpen}
			onClose={onClose}
			onAfterClose={() => setRequest(defaultRequest)}
			minWidth="500px"
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
					component={SelectNative}
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
				>
					{roles.map((role) => (
						<option key={role} value={role}>
							<UserRole role={role} />
						</option>
					))}
				</FormField>
				<Spacer size={20} />
				<Buttons onClose={onClose} />
			</form>
		</Modal>
	);
}
