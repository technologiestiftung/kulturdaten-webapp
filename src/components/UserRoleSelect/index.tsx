import SelectNative from "@components/SelectNative";
import UserRole from "@components/UserRole";
import { Role } from "@contexts/userContext";
import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

interface Props extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {}

const roles: Role[] = ["admin", "editor", "author", "member", "unassigned"];

export default function UserRoleSelect(props: Props) {
	return (
		<SelectNative {...props}>
			{roles.map((role) => (
				<option key={role} value={role}>
					<UserRole role={role} />
				</option>
			))}
		</SelectNative>
	);
}
