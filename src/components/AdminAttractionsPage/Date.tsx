import { formatDate } from "@utils/dates";
import { useRouter } from "next/router";

interface Props {
	/** Date string in ISO format. */
	date: string;
}

export default function Date({ date }: Props) {
	const router = useRouter();
	const locale = router.locale || "de";
	return <time dateTime={date}>{formatDate(date, locale, { dateStyle: "short", timeStyle: "short" })}</time>;
}
