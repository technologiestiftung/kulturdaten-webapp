import { borderRadiuses, colors, fontSizes, fontWeights, mediaQueries, spacings } from "@common/styleVariables";
import styled from "@emotion/styled";
import { CSSProperties, ReactNode } from "react";

const Table = styled.table({
	width: "100%",
	fontSize: fontSizes.small,
	borderSpacing: 0,
	border: `1px solid ${colors.neutral200}`,
	borderRadius: borderRadiuses.big,
});

const TrHeader = styled.tr({
	display: "none",
	[mediaQueries.m]: {
		display: "table-row",
	},
});

const Th = styled.th({
	display: "flex",
	textAlign: "left",
	fontWeight: fontWeights.medium,
	backgroundColor: colors.neutral200,
	padding: spacings.get(2),
	[mediaQueries.m]: {
		display: "table-cell",
	},
	":first-of-type": { borderTopLeftRadius: borderRadiuses.big },
	":last-of-type": { borderTopRightRadius: borderRadiuses.big },
});

const TrBody = styled.tr(({ onClick }) => ({
	display: "flex",
	alignItems: "center",
	flexWrap: "wrap",
	borderBottom: `1px solid ${colors.neutral300}`,
	[mediaQueries.m]: {
		display: "table-row",
		borderBottom: "none",
	},
	"&:hover": onClick && {
		cursor: "pointer",
		backgroundColor: colors.grayLight,
	},
	":last-of-type": {
		borderBottom: "none",
		td: {
			borderBottom: "none",
			":first-of-type": { borderBottomLeftRadius: borderRadiuses.big },
			":last-of-type": { borderBottomRightRadius: borderRadiuses.big },
		},
	},
}));

const Td = styled.td({
	flex: "1 0 auto",
	padding: spacings.get(1.5),
	":first-of-type": {
		flex: "1 0 100%",
		fontWeight: fontWeights.medium,
	},
	[mediaQueries.m]: {
		padding: spacings.get(2),
		borderBottom: `1px solid ${colors.neutral300}`,
		":first-of-type": {
			fontWeight: fontWeights.default,
		},
	},
});

type Column<Item> = {
	header: ReactNode;
	getContent(item: Item): ReactNode;
	canBeSorted: boolean;
	headerStyle?: CSSProperties;
	cellStyle?: CSSProperties;
};

type Props<Item> = {
	items: Item[];
	columns: Column<Item>[];
	onClickItem?(item: Item): void;
};

export const ACTIONS_CELL_STYLE: CSSProperties = {
	padding: "0px",
	width: "40px",
	flex: "0 0 auto",
};

export default function ContentTable<Item>(props: Props<Item>) {
	const { items, columns, onClickItem } = props;
	return (
		<Table>
			<thead>
				<TrHeader>
					{columns.map((column, index) => (
						<Th key={index} style={column.headerStyle}>
							{column.header}
						</Th>
					))}
				</TrHeader>
			</thead>
			<tbody>
				{items.map((item, index) => (
					<TrBody
						key={index}
						onClick={onClickItem ? () => onClickItem(item) : undefined}
						tabIndex={onClickItem ? 0 : -1}
					>
						{columns.map((column, index) => (
							<Td key={index} style={column.cellStyle}>
								{column.getContent(item)}
							</Td>
						))}
					</TrBody>
				))}
			</tbody>
		</Table>
	);
}
