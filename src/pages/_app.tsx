import App from "next/app";
import GlobalStyles from "../components/GlobalStyles";
import { UserContextProvider } from "../contexts/userContext";

class RootApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<>
				<UserContextProvider>
					<GlobalStyles />
					<Component {...pageProps} />
				</UserContextProvider>
			</>
		);
	}
}

export default RootApp;
