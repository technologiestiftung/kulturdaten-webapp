import GlobalStyles from "@components/GlobalStyles";
import { UserContextProvider } from "@contexts/UserContext";
import { NextIntlClientProvider } from "next-intl";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import ReactModal from "react-modal";
import { APP_ELEMENT_ID } from "./_document";

ReactModal.setAppElement(`#${APP_ELEMENT_ID}`);

export default function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	return (
		<NextIntlClientProvider messages={pageProps.messages} locale={router.locale} timeZone={timeZone}>
			<UserContextProvider>
				<GlobalStyles />
				<Component {...pageProps} />
			</UserContextProvider>
		</NextIntlClientProvider>
	);
}
