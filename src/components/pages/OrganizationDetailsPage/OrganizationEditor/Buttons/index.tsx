import { Organization } from "@api/client/models/Organization";
import { spacings } from "@common/styleVariables";
import Button from "@components/Button";
import styled from "@emotion/styled";
import { StatusUpdate } from "@services/organizations";
import { ReactNode } from "react";
import StatusButtons from "./StatusButtons";

const Container = styled.div({
	display: "flex",
	justifyContent: "space-between",
	flexWrap: "wrap",
	gap: spacings.get(2),
});

interface Props {
	organization: Organization | null;
	onUpdateStatus(newStatus: StatusUpdate): void;
	submitLabel: ReactNode;
}

export default function Buttons({ organization, onUpdateStatus, submitLabel }: Props) {
	return (
		<Container>
			<Button type="submit">{submitLabel}</Button>
			<div>{organization !== null && <StatusButtons organization={organization} onUpdate={onUpdateStatus} />}</div>
		</Container>
	);
}
