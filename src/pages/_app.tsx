import React from 'react';
import App from 'next/app';
import { applyPolyfills, defineCustomElements } from '@public-ui/components/dist/loader';
import { ITZBund } from '@public-ui/themes';
import { register } from '@public-ui/components';
import '../style.css';
import '../style.scss';
import { UserContextProvider } from '../contexts/userContext';

class RootApp extends App {
	componentDidMount() {
		void applyPolyfills()
			.then(() => {
				return register(ITZBund, []).then(() => {
					void defineCustomElements(window);
				});
			})
			.catch(console.warn);
	}

	render() {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
