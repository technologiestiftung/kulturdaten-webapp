import { borderRadiuses, colors, lineHeights, spacings } from "@common/styleVariables";
import { Tag } from "@common/types";
import Checkbox from "@components/Checkbox";
import FormFieldset from "@components/FormFieldset";
import FormLegend from "@components/FormLegend";
import Spacer from "@components/Spacer";
import styled from "@emotion/styled";
import { TagGroup, groupTags } from "@utils/tags";
import { useTranslations } from "next-intl";
import { ChangeEvent, useMemo } from "react";

const GroupList = styled.ul({
	display: "flex",
	flexDirection: "column",
	gap: spacings.get(2),
	listStyle: "none",
	padding: 0,
});

const Group = styled.li({
	lineHeight: lineHeights.single,
	border: `1px solid ${colors.mediumContrast}`,
	borderRadius: borderRadiuses.medium,
});

const GroupTitle = styled.div({
	padding: `${spacings.get(3)} ${spacings.get(3)}`,
});

const Fieldset = styled.fieldset({
	border: "none",
	backgroundColor: colors.neutral200,
	padding: `${spacings.get(3)} ${spacings.get(3)}`,
});

const ChildList = styled.ul({
	listStyle: "none",
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
	gap: spacings.get(2),
	padding: 0,
});

const Child = styled.li({});

interface Props {
	/** List of tags to choose from. */
	tags: Tag[];
	/** List of tag identifiers that are currently selected/checked. */
	selectedTagIdentifiers: string[];
	language: string;
	onChange(tagIdentifiers: string[]): void;
}

export default function TagEditor(props: Props) {
	const { tags, selectedTagIdentifiers, language, onChange } = props;
	const groups = useMemo(() => groupTags(tags), [tags]);
	const t = useTranslations("Tags");
	const isChecked = (identifier: string) => selectedTagIdentifiers.includes(identifier);
	const isExpanded = (group: TagGroup) => group.children.length > 0 && isChecked(group.identifier);
	const handleChange = (identifier: string, event: ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked;
		if (checked && !isChecked(identifier)) {
			const newSelectedTagIdentifiers = [...selectedTagIdentifiers, identifier];
			onChange(newSelectedTagIdentifiers);
		}
		if (!checked && isChecked(identifier)) {
			const newSelectedTagIdentifiers = selectedTagIdentifiers.filter(
				(selectedIdentifier) => selectedIdentifier !== identifier,
			);
			onChange(newSelectedTagIdentifiers);
		}
	};
	return (
		<FormFieldset>
			<FormLegend>{t("title")}</FormLegend>
			<Spacer size={10} />
			<GroupList>
				{groups.map((group) => (
					<Group key={group.identifier}>
						<GroupTitle>
							<Checkbox
								label={group.title[language]}
								name={group.title[language]}
								checked={isChecked(group.identifier)}
								onChange={(event) => handleChange(group.identifier, event)}
							/>
						</GroupTitle>
						{isExpanded(group) && (
							<Fieldset>
								<ChildList>
									{group.children.map((child) => (
										<Child key={child.identifier}>
											<Checkbox
												label={child.title[language]}
												name={child.title[language]}
												checked={isChecked(child.identifier)}
												onChange={(event) => handleChange(child.identifier, event)}
											/>
										</Child>
									))}
								</ChildList>
							</Fieldset>
						)}
					</Group>
				))}
			</GroupList>
		</FormFieldset>
	);
}
