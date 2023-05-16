/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A short (max. 150 characters) text that can be in different languages. German (de) is required. In addition, an English translation (en) and a text in simple language (de-easy) are recommended. The text is stored in a dictionary with an ISO-639-1 code as the key and the translation as the value. A special feature is the code de-easy, which refers to a text in simple German.
 */
export type ShortInternationalizedText = Record<string, string>;
