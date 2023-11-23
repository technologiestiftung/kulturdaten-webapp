import GlobalStyles from "@components/GlobalStyles";
import { UserContextProvider } from "@contexts/UserContext";
import { NextIntlClientProvider } from "next-intl";
import App from "next/app";
import ReactModal from "react-modal";
import { APP_ELEMENT_ID } from "./_document";

ReactModal.setAppElement(`#${APP_ELEMENT_ID}`);

class RootApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<NextIntlClientProvider messages={pageProps.messages}>
				<UserContextProvider>
					<GlobalStyles />
					<Component {...pageProps} />
				</UserContextProvider>
			</NextIntlClientProvider>
		);
	}
}

export default RootApp;
