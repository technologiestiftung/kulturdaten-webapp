import { UserLike, getFullName } from "@services/users";

interface Props {
	user: UserLike;
}

export default function UserName({ user }: Props) {
	return <>{getFullName(user)}</>;
}
