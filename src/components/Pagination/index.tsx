import { borderRadiuses, colors, fontSizes, spacings } from "@common/styleVariables";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import { IconNext, IconPrevious } from "./Icons";
import PageEntry from "./PageEntry";
import { getPages, getTotalPages } from "./service";

const Container = styled.div({
	display: "flex",
	flexFlow: "row wrap",
	justifyContent: "space-between",
	alignItems: "center",
	fontSize: fontSizes.small,
	border: `1px solid ${colors.neutral200}`,
	borderRadius: borderRadiuses.big,
});

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

export interface PaginationType {
	page: number;
	pageSize: number;
	totalCount: number;
}

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
