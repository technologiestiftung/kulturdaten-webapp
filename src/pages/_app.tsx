import App from "next/app";
import { UserContextProvider } from "../contexts/userContext";
import "../style.css";
import "../style.scss";

class RootApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<>
				<UserContextProvider>
					<Component {...pageProps} />
				</UserContextProvider>
			</>
		);
	}
}

export default RootApp;
