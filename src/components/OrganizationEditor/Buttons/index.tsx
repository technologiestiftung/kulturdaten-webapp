import { Organization } from "@api/client/models/Organization";
import { spacings } from "@common/styleVariables";
import Button from "@components/Button";
import styled from "@emotion/styled";
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
	onUpdated(): void;
	submitLabel: ReactNode;
}

export default function Buttons({ organization, onUpdated, submitLabel }: Props) {
	return (
		<Container>
			<Button type="submit">{submitLabel}</Button>
			<div>{organization !== null && <StatusButtons organization={organization} onUpdated={onUpdated} />}</div>
		</Container>
	);
}
