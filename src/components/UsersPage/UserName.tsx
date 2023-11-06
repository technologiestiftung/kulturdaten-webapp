import { User } from "@api/client/models/User";
import { getFullName } from "@utils/users";

interface Props {
	user: User;
}

export default function UserName({ user }: Props) {
	return <>{getFullName(user)}</>;
}
