import FormField from "@components/FormField";
import Modal from "@components/Modal";
import SelectNative from "@components/SelectNative";
import Spacer from "@components/Spacer";
import UserRole from "@components/UserRole";
import { Role } from "@contexts/userContext";
import { useTranslations } from "next-intl";
import { FormEventHandler, useCallback, useState } from "react";
import Buttons from "./Buttons";

interface Props {
	isOpen: boolean;
	onClose(): void;
}

// TODO: Use proper type from generated API client.
interface UserCreateRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: Role;
}

const defaultRequest: UserCreateRequest = {
	email: "",
	password: "",
	firstName: "",
	lastName: "",
	role: "member",
};

export default function UserAddModal(props: Props) {
	const { isOpen, onClose } = props;
	const t = useTranslations("User-Details");
	const [request, setRequest] = useState<UserCreateRequest>(defaultRequest);
	console.log("request: ", request);
	// TODO: const apiClient = useApiClient();
	const handleSubmit = useCallback<FormEventHandler>(
		async (event) => {
			event.preventDefault();
			// TODO: Invite user via apiClient.
			onClose();
			setRequest(defaultRequest);
		},
		[onClose],
	);
	const handleClose = () => {
		setRequest(defaultRequest);
		onClose();
	};
	const roles: Role[] = ["admin", "editor", "author", "member", "unassigned"];
	return (
		<Modal modalTitle={t("modal-title")} isOpen={isOpen} onClose={handleClose} minWidth="500px">
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
					label={t("label-password")}
					id="password"
					type="password"
					value={request.password}
					onChange={(event) => {
						setRequest((prev) => ({
							...prev,
							password: event.target.value,
						}));
					}}
					required={true}
				/>
				<Spacer size={15} />
				<FormField
					label={t("label-firstName")}
					id="firstName"
					value={request.firstName}
					onChange={(event) => {
						setRequest((prev) => ({
							...prev,
							firstName: event.target.value,
						}));
					}}
					required={false}
				/>
				<Spacer size={15} />
				<FormField
					label={t("label-lastName")}
					id="lastName"
					value={request.lastName}
					onChange={(event) => {
						setRequest((prev) => ({
							...prev,
							lastName: event.target.value,
						}));
					}}
					required={false}
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
				<Buttons onClose={handleClose} />
			</form>
		</Modal>
	);
}
