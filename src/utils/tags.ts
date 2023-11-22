import { Tag } from "@common/types";

export interface TagGroup extends Tag {
	children: Tag[];
}

export function groupTags(tags: Tag[]): TagGroup[] {
	return (
		tags
			// Sort tags so that all groups are before the children.
			.sort((tagA, TagB) => {
				if (isGroup(tagA)) {
					return -1;
				}
				if (isGroup(TagB)) {
					return 1;
				}
				return 0;
			})
			.reduce((tagGroups: TagGroup[], tag: Tag) => {
				if (isGroup(tag)) {
					const newGroup: TagGroup = {
						...tag,
						children: [],
					};
					tagGroups.push(newGroup);
					return tagGroups;
				}
				const matchingGroup = tagGroups.find((group) => getGroupIdentifier(group) === getGroupIdentifier(tag))!;
				matchingGroup.children.push(tag);
				return tagGroups;
			}, [])
	);
}

const getGroupIdentifier = (tag: Tag) => tag.identifier.split(".").slice(0, 3).join(".");

const isGroup = (tag: Tag) => getGroupIdentifier(tag) === tag.identifier;
