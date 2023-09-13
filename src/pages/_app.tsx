import React from "react";
import App from "next/app";
import "../style.css";
import "../style.scss";
import { UserContextProvider } from "../contexts/userContext";

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
