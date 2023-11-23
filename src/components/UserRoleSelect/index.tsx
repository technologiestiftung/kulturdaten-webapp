import SelectNative from "@components/SelectNative";
import UserRole from "@components/UserRole";
import { Role } from "@contexts/UserContext";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<typeof SelectNative>;

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
