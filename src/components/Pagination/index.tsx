import { spacings } from "@common/styleVariables";
import { PaginationType } from "@common/types";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import Container from "./Container";
import { IconNext, IconPrevious } from "./Icons";
import PageEntry from "./PageEntry";
import { getPages, getTotalPages } from "./service";

const Info = styled.div({
	padding: `${spacings.get(1)} ${spacings.get(3)}`,
});

const List = styled.ul({
	display: "flex",
	listStyle: "none",
	padding: spacings.get(1),
});

const ListItem = styled.li({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

interface Props {
	pagination: PaginationType;
	info: ReactNode;
}

export default function Pagination({ pagination, info }: Props) {
	const pages = getPages(pagination);
	const totalPages = getTotalPages(pagination);
	return (
		<Container>
			<Info>{info}</Info>
			<List>
				<ListItem>
					<PageEntry interactive={pagination.page > 1} targetPage={pagination.page - 1} active={false}>
						<IconPrevious />
					</PageEntry>
				</ListItem>
				{pages.map((page) => (
					<ListItem key={page.index}>
						<PageEntry interactive={page.interactive} targetPage={page.index + 1} active={page.active}>
							{page.label}
						</PageEntry>
					</ListItem>
				))}
				<ListItem>
					<PageEntry interactive={pagination.page < totalPages} targetPage={pagination.page + 1} active={false}>
						<IconNext />
					</PageEntry>
				</ListItem>
			</List>
		</Container>
	);
}

export function PaginationInfo({ info }: { info: ReactNode }) {
	return (
		<Container>
			<Info>{info}</Info>
		</Container>
	);
}
