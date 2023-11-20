import { Borough } from "@common/types";
import SelectNative from "@components/SelectNative";
import { useTranslations } from "next-intl";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<typeof SelectNative>;

const boroughs: Borough[] = [
	"Charlottenburg-Wilmersdorf",
	"Friedrichshain-Kreuzberg",
	"Lichtenberg",
	"Marzahn-Hellersdorf",
	"Mitte",
	"Neukölln",
	"Pankow",
	"Reinickendorf",
	"Spandau",
	"Steglitz-Zehlendorf",
	"Tempelhof-Schöneberg",
	"Treptow-Köpenick",
	"außerhalb",
];

export default function BoroughSelect(props: Props) {
	const t = useTranslations("Address-Details");
	return (
		<SelectNative {...props}>
			<option value={undefined}>{t("borough-none")}</option>
			{boroughs.map((borough) => (
				<option key={borough} value={borough}>
					{borough}
				</option>
			))}
		</SelectNative>
	);
}
