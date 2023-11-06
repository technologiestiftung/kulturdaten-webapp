import GlobalStyles from "@components/GlobalStyles";
import { NextIntlClientProvider } from "next-intl";
import App from "next/app";
import ReactModal from "react-modal";
import { UserContextProvider } from "../contexts/userContext";
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
