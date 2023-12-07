import styled from "@emotion/styled";
import { formatDate } from "@services/dates";
import { useRouter } from "next/router";

const Time = styled.time({
	fontVariantNumeric: "tabular-nums",
});

interface Props {
	/** Date string in ISO format. */
	date: string;
}

export default function Date({ date }: Props) {
	const router = useRouter();
	const locale = router.locale || "de";
	return <Time dateTime={date}>{formatDate(date, locale, { dateStyle: "short", timeStyle: "short" })}</Time>;
}
