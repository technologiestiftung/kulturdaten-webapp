import { AdminAttraction } from "@api/client/models/AdminAttraction";
import { spacings } from "@common/styleVariables";
import Button from "@components/Button";
import styled from "@emotion/styled";
import { StatusUpdate } from "@services/attractions";
import { ReactNode } from "react";
import StatusButtons from "./StatusButtons";

const Container = styled.div({
	display: "flex",
	justifyContent: "space-between",
	flexWrap: "wrap",
	gap: spacings.get(2),
});

interface Props {
	attraction: AdminAttraction | null;
	onUpdated(newStatus: StatusUpdate): void;
	submitLabel: ReactNode;
}

export default function Buttons({ attraction, onUpdated, submitLabel }: Props) {
	return (
		<Container>
			<Button type="submit">{submitLabel}</Button>
			<div>{attraction !== null && <StatusButtons attraction={attraction} onUpdated={onUpdated} />}</div>
		</Container>
	);
}
