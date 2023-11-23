import GlobalStyles from "@components/GlobalStyles";
import { NextIntlClientProvider } from "next-intl";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import ReactModal from "react-modal";
import { UserContextProvider } from "../contexts/userContext";
import { APP_ELEMENT_ID } from "./_document";

ReactModal.setAppElement(`#${APP_ELEMENT_ID}`);

export default function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	return (
		<NextIntlClientProvider messages={pageProps.messages} locale={router.locale}>
			<UserContextProvider>
				<GlobalStyles />
				<Component {...pageProps} />
			</UserContextProvider>
		</NextIntlClientProvider>
	);
}
