import { Organization } from "@api/client/models/Organization";
import Select from "@components/Select";
import { getLocalizedLabel } from "@utils/content";
import { useTranslations } from "next-intl";

interface Props {
	organizations: Organization[];
	activeOrganization: Organization | null;
	onSelectOrganization: (organization: Organization | null) => void;
}

export default function OrganizationSelect({ organizations, activeOrganization, onSelectOrganization }: Props) {
	const t = useTranslations("Navigation");
	const options = organizations.map((organization) => ({
		value: organization.identifier,
		organization,
		label: getLocalizedLabel(organization.title),
	}));
	const selectedOption =
		options.find((option) => option.organization.identifier === activeOrganization?.identifier) || null;
	return (
		<Select
			options={options}
			value={selectedOption}
			onChange={(option) => onSelectOrganization(option?.organization || null)}
			isClearable={false}
			isSearchable={false}
			aria-label={t("organization-select-label")}
			placeholder={t("organization-select-placeholder")}
			noOptionsMessage={() => t("organization-select-no-options")}
		/>
	);
}
