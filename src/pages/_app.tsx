import React from 'react';
import App from 'next/app';
import '../style.css';
import '../style.scss';
import { NextUIProvider } from '@nextui-org/react';
import { UserContextProvider } from '../contexts/userContext';

class RootApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<>
				<UserContextProvider>
					<NextUIProvider>
						<Component {...pageProps} />
					</NextUIProvider>
				</UserContextProvider>
			</>
		);
	}
}

export default RootApp;
