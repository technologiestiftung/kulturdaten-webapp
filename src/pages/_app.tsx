import { NextIntlClientProvider } from "next-intl";
import App from "next/app";
import GlobalStyles from "../components/GlobalStyles";
import { UserContextProvider } from "../contexts/userContext";

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
