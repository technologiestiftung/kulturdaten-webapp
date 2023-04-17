export const KulturDBTheme = {
	GLOBAL: `html {
		font-size: 16px;
		line-height: 24px;
	}
	* {
		--full-white: #fbfbfb;
		--text-black: #0b1d1e;
		--gray-350: #c8c8c8;
		--border-color: #0b1d1e;
		--clumsy-carmine: #993539;
		--error: #cc411e;
		--error-bg-color: #fbeff0;
		--border-radius: 4px;
		--box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.08),
			0px 0px 16px rgba(0, 0, 0, 0.07);
		--spacing: 0.125rem;
		font-size: inherit; /* ermöglicht proportionales Skalieren */
		hyphens: auto; /* aktiviert die sprachspezifische Silbentrennung */
		letter-spacing: inherit; /* ermöglicht das Ändern des Buchstabenabstands */
		word-break: break-word; /* ermöglicht das Umbrechen von Wörtern */
		word-spacing: inherit; /* ermöglicht das Änderen des Wortabstands */
	}`,
	'KOL-FORM': `* {
		display: flex;
		flex-direction: column;
	}`,
	'KOL-DETAILS': `* {
		background-color: aqua;
	}`,
	'KOL-BUTTON': `a > kol-span-wc,
	button > kol-span-wc {
		border-radius: 0.25rem;
		border-style: solid;
		min-width: 44px;
		min-height: 44px;
		border-width: var(--spacing);
		font-size: inherit;
		background-color: var(--clumsy-carmine);
		border: 2px solid var(--clumsy-carmine);
		padding: 0.5rem 2rem;
		color: white;
	}
	.button a.icon-only > kol-span-wc,
	.button button.icon-only > kol-span-wc {
		padding: 0 0.5rem;
	}
	a > kol-span-wc,
	button > kol-span-wc {
		gap: 0.25em;
		transition-delay: 0;
		transition-timing-function: ease-in-out;
		transition-duration: 0.5s;
		transition-property: background, color, border-color;
	}
	kol-icon.left::part(icon) {
		margin-right: 0.25rem;
	}`,
	'KOL-ICON': `kol-icon > i {
		padding: 0 0.5rem;
	}`,
	'KOL-INPUT-TEXT': `input:hover,
	input:focus {
		border-color: var(--border-color) !important;
		border-radius: none !important;
		outline-color: var(--color-achat) !important;
		outline-offset: 0;
		outline-style: solid;
		outline-width: 1px;
	}
	label {
		color: var(--text-black);
		gap: 8px;
		width: 100%;
		font-weight: 500;
		margin-bottom: 10px;
	}
	input {
		cursor: pointer;
		padding: 0 1.25rem;
		width: 100%;
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		overflow: hidden;
		line-height: 24px;
		font-size: 16px;
		box-shadow: var(--box-shadow);
	}
	.error input {
		border-color: var(--error);
		background-color: var(--error-bg-color);
	}
	.error {
		color: var(--error);
	}

	input:disabled {
		background-color: var(--color-input-bg-default);
		border-color: var(--border-color);
		cursor: not-allowed;
	}
	kol-alert {
		margin-top: calc(2 * var(--spacing));
		display: block;
	}
	.kol-required span::after {
		content: "*";
	}
	input::placeholder {
		color: var(--gray-350);
	}`,
	'KOL-INPUT-PASSWORD': `input:hover,
	input:focus {
		border-color: var(--border-color) !important;
		border-radius: none !important;
		outline-color: var(--color-achat) !important;
		outline-offset: 0;
		outline-style: solid;
		outline-width: 1px;
	}
	label {
		color: var(--text-black);
		gap: 8px;
		width: 100%;
		font-weight: 500;
		margin-bottom: 10px;
	}
	input {
		cursor: pointer;
		padding: 0 1.25rem;
		width: 100%;
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		overflow: hidden;
		line-height: 24px;
		font-size: 16px;
		box-shadow: var(--box-shadow);
	}
	.error input {
		border-color: var(--error);
		background-color: var(--error-bg-color);
	}
	.error {
		color: var(--error);
	}
	input:disabled {
		background-color: var(--color-input-bg-default);
		border-color: var(--border-color);
		cursor: not-allowed;
	}
	kol-alert {
		margin-top: calc(2 * var(--spacing));
		display: block;
	}

	kol-alert .error {
		border-width: 0;
	}
	.kol-required span::after {
		content: "*";
	}
	input::placeholder {
		color: var(--gray-350);
	}`,
	'KOL-INPUT-CHECKBOX': `label {
		cursor: pointer;
	}
	input {
		color: var(--border-color);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	input:hover {
		border-color: var(--border-color);
	} /* NEU */
	kol-input {
		display: grid;
		align-items: flex-start;
		justify-items: left;
		width: 100%;
	}
	kol-input.checkbox {
		grid-template-columns: calc(6 * 2 * var(--spacing)) auto;
	}
	kol-input.switch {
		grid-template-columns: calc(13 * 2 * var(--spacing)) auto;
	}
	kol-input > div.input {
		display: inline-flex;
		order: 1;
	}
	kol-input > div.input input {
		margin: 0px;
	}
	kol-input > label {
		order: 2;
		padding-left: calc(2 * 2 * var(--spacing));
	}
	kol-input > kol-alert.error {
		order: 3;
		padding-top: 0.25em;
		grid-column: span 2 / auto;
	} /* CHECKBOX */
	input[type="checkbox"] {
		appearance: none;
		background-color: white;
		cursor: pointer;
		transition: 0.5s;
	}
	input[type="checkbox"].kol-disabled:before {
		cursor: not-allowed;
	}
	input[type="checkbox"]:before {
		content: "";
		cursor: pointer;
	}
	input[type="checkbox"]:checked {
		background-color: var(--full-white);
		border-color: var(--border-color);
		color: var(--border-color);
	}
	.checkbox input[type="checkbox"] {
		height: calc(6 * 2 * var(--spacing));
		min-width: calc(6 * 2 * var(--spacing));
		width: calc(6 * 2 * var(--spacing));
	}
	.checkbox input[type="checkbox"]:before {
		background-color: transparent;
		display: block;
		height: calc(6 * 2 * var(--spacing));
		position: relative;
		width: calc(6 * 2 * var(--spacing));
	}
	.checkbox input[type="checkbox"]:checked:before {
		border-color: var(--border-color);
		transform: rotate(40deg) translate(-30%, -50%);
		border-width: 0px 2px 2px 0px;
	}
	.checkbox input[type="checkbox"]:indeterminate:before {
		border-color: var(--border-color);
	}
	.switch input[type="checkbox"] {
		min-width: 3.2em;
		width: 3.2em;
		height: 1.7em;
		display: inline-block;
		position: relative;
	}
	.switch input[type="checkbox"]:before {
		-webkit-transition: 0.5s;
		-moz-transition: 0.5s;
		-ms-transition: 0.5s;
		transition: 0.5;
		width: 1.2em;
		height: 1.2em;
		left: calc(0.25em - 2px);
		top: calc(0.25em - 2px);
		background-color: black;
		border-radius: var(--border-radius);
		position: absolute;
	}
	.switch input[type="checkbox"]:checked:before {
		-webkit-transform: translateX(1.5em);
		-moz-transform: translateX(1.5em);
		-ms-transform: translateX(1.5em);
		transform: translateX(1.5em);
		background-color: white;
		border-color: var(--border-color);
	}
	.switch input[type="checkbox"]:indeterminate:before {
		-webkit-transform: translateX(0.75em);
		-moz-transform: translateX(0.75em);
		-ms-transform: translateX(0.75em);
		transform: translateX(0.75em);
		background-color: var(--border-color);
	}
	.disabled {
		opacity: 0.33;
	}
	.checkbox kol-icon,
	.switch kol-icon {
		display: none;
	}
	kol-input span.hint {
		grid-column: span 2;
		font-style: italic;
		color: gray;
		display: block;
		order: 3;
		padding: 0 var(--spacing);
	}`,
	'KOL-LINK': `a {
		color: var(--clumsy-carmine);
		font-weight: 700;
	}
	kol-icon.external-link-icon {
		display: none;
	}`,
	'KOL-INPUT-EMAIL': `input:hover,
	input:focus {
		border-color: var(--border-color) !important;
		border-radius: none !important;
		outline-color: var(--color-achat) !important;
		outline-offset: 0;
		outline-style: solid;
		outline-width: 1px;
	}
	label {
		color: var(--text-black);
		gap: 8px;
		width: 100%;
		font-weight: 500;
		margin-bottom: 10px;
	}
	input {
		cursor: pointer;
		padding: 0 1.25rem;
		width: 100%;
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		overflow: hidden;
		line-height: 24px;
		font-size: 16px;
		box-shadow: var(--box-shadow);
	}
	.error {
		color: var(--error);
		border-color: var(--error);
	}
	input:disabled {
		background-color: var(--color-input-bg-default);
		border-color: var(--border-color);
		cursor: not-allowed;
	}
	kol-alert {
		margin-top: calc(2 * var(--spacing));
		display: block;
	}
	.kol-required span::after {
		content: "*";
	}
	input::placeholder {
		color: var(--gray-350);
	}`,
};
