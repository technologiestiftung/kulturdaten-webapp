import React from 'react';
import App from 'next/app';
import { applyPolyfills, defineCustomElements } from '@public-ui/components/dist/loader';
import { ITZBund } from '@public-ui/themes';
import { register, KoliBriDevHelper } from '@public-ui/components';
import '../style.css';
import '../style.scss';
import { UserContextProvider } from '../contexts/userContext';
import { KulturDBTheme } from '../theme';

//TODO: Build own compiler with sourcecode for the css to json parcer: https://github.com/public-ui/kolibri/blob/main/packages/designer/src/components/app/component.solid.tsx
// Anybody good in node scripting?

//TODO: Proper Readme Documentation

class RootApp extends App {
	componentDidMount() {
		void applyPolyfills()
			.then(() => {
				return register(ITZBund, []).then(() => {
					void defineCustomElements(window);
					KoliBriDevHelper.patchTheme('itzbund', KulturDBTheme);
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
