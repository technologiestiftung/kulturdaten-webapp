import { Location } from "@api/client/models/Location";
import { spacings } from "@common/styleVariables";
import Button from "@components/Button";
import styled from "@emotion/styled";
import { StatusUpdate } from "@services/locations";
import { ReactNode } from "react";
import StatusButtons from "./StatusButtons";

const Container = styled.div({
	display: "flex",
	justifyContent: "space-between",
	flexWrap: "wrap",
	gap: spacings.get(2),
});

interface Props {
	location: Location | null;
	onUpdateStatus(newStatus: StatusUpdate): void;
	submitLabel: ReactNode;
}

export default function Buttons({ location, onUpdateStatus, submitLabel }: Props) {
	return (
		<Container>
			<Button type="submit">{submitLabel}</Button>
			<div>{location !== null && <StatusButtons location={location} onUpdate={onUpdateStatus} />}</div>
		</Container>
	);
}
