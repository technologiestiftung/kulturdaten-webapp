import NextHead from "next/head";
import { useTranslations } from "use-intl";
import { Metadata } from "..";
import SocialMetadata from "./SocialMetadata";

interface Props {
	metadata: Metadata;
}

export default function Head({ metadata }: Props) {
	const t = useTranslations("Common");
	const title = `${metadata.title} | ${t("site-name")}`;
	return (
		<>
			<NextHead>
				<title>{title}</title>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{metadata.description && <meta name="description" content={metadata.description} />}
				{metadata.url && <link rel="canonical" href={metadata.url} />}
				<link rel="icon" href="/favicon.ico" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<meta name="theme-color" content="#1e3791" />
			</NextHead>
			<SocialMetadata metadata={metadata} />
		</>
	);
}
