import { UserLike, getFullName } from "@utils/users";

interface Props {
	user: UserLike;
}

export default function UserName({ user }: Props) {
	return <>{getFullName(user)}</>;
}
