import { Organization } from "@api/client/models/Organization";
import { User } from "@api/client/models/User";
import FormField from "@components/FormField";
import Modal from "@components/Modal";
import SelectNative from "@components/SelectNative";
import Spacer from "@components/Spacer";
import UserRole from "@components/UserRole";
import { Role } from "@contexts/userContext";
import { getFullName } from "@utils/users";
import { useTranslations } from "next-intl";
import { FormEventHandler, useCallback, useState } from "react";
import { roles } from "../constants";
import { UserInviteRequest, getInitialRequest } from "../service";
import Buttons from "./Buttons";

interface Props {
	user: User;
	organization: Organization;
	isOpen: boolean;
	onClose(): void;
}

export default function UserEditModal(props: Props) {
	const { user, organization, isOpen, onClose } = props;
	const t = useTranslations("User-Details");
	const initialRequest = getInitialRequest(user, organization);
	const [request, setRequest] = useState<UserInviteRequest>(initialRequest);
	// TODO: const apiClient = useApiClient();
	const handleSubmit = useCallback<FormEventHandler>(
		async (event) => {
			event.preventDefault();
			// TODO: Invite user via apiClient (and show error message if it failed).
			onClose();
		},
		[onClose],
	);
	const handleDelete = useCallback(async () => {
		// TODO: Delete user via apiClient (and show error message if it failed).
		onClose();
	}, [onClose]);
	return (
		<Modal
			modalTitle={t("edit-modal-title")}
			isOpen={isOpen}
			onClose={onClose}
			onAfterClose={() => setRequest(initialRequest)}
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
				<Buttons onClose={onClose} onDelete={handleDelete} />
			</form>
		</Modal>
	);
}
