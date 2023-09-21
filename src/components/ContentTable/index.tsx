import { borderRadiuses, colors, fontSizes, fontWeights, spacings } from "@common/styleVariables";
import styled from "@emotion/styled";
import { ReactNode } from "react";

const Table = styled.table({
	width: "100%",
	fontSize: fontSizes.small,
	borderSpacing: 0,
	border: `1px solid ${colors.neutral200}`,
	borderRadius: borderRadiuses.big,
});

const Tr = styled.tr(({ onClick }) => ({
	"&:hover": onClick && {
		cursor: "pointer",
		backgroundColor: colors.grayLight,
	},
	":last-of-type": {
		td: {
			borderBottom: "none",
			":first-of-type": { borderBottomLeftRadius: borderRadiuses.big },
			":last-of-type": { borderBottomRightRadius: borderRadiuses.big },
		},
	},
}));

const Th = styled.th({
	textAlign: "left",
	fontWeight: fontWeights.medium,
	backgroundColor: colors.neutral200,
	padding: spacings.get(2),
	":first-of-type": { borderTopLeftRadius: borderRadiuses.big },
	":last-of-type": { borderTopRightRadius: borderRadiuses.big },
});

const Td = styled.td({
	padding: spacings.get(2),
	borderBottom: `1px solid ${colors.neutral300}`,
});

type Column<Item> = {
	header: ReactNode;
	getContent(item: Item): ReactNode;
	canBeSorted: boolean;
};

type Props<Item> = {
	items: Item[];
	columns: Column<Item>[];
	onClickItem?(item: Item): void;
};

export default function ContentTable<Item>(props: Props<Item>) {
	const { items, columns, onClickItem } = props;
	return (
		<Table>
			<thead>
				<Tr>
					{columns.map((column, index) => (
						<Th key={index}>{column.header}</Th>
					))}
				</Tr>
			</thead>
			<tbody>
				{items.map((item, index) => (
					<Tr key={index} onClick={onClickItem ? () => onClickItem(item) : undefined} tabIndex={onClickItem ? 0 : -1}>
						{columns.map((column, index) => (
							<Td key={index}>{column.getContent(item)}</Td>
						))}
					</Tr>
				))}
			</tbody>
		</Table>
	);
}
