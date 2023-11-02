import { User } from "@api/client/models/User";

interface Props {
	user: User;
}

export default function UserName({ user }: Props) {
	return (
		<>
			{user.firstName || "-"} {user.lastName || ""}
		</>
	);
}
