/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A text that can also contain Markdown as a markup language. The text that can be in different languages. German (de) is required. In addition, an English translation (en) and a text in simple language (de-easy) are recommended. The text is stored in a dictionary with an ISO-639-1 code as the key and the translation as the value. A special feature is the code de-easy, which refers to a text in simple German. Please use Markdown very sparingly.
 */
export type InternationalizedDescriptionText = Record<string, string>;
