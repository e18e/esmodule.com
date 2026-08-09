import { createHighlighter, type Highlighter } from 'shiki';

/** Languages a code sample or guide code fence is allowed to use. */
export const languages = [
	'javascript',
	'typescript',
	'json',
	'jsonc',
	'shellscript',
	'html',
	'svelte'
];

let highlighter: Highlighter | undefined;

export async function get_highlighter() {
	highlighter ??= await createHighlighter({
		themes: ['vitesse-light', 'vitesse-dark'],
		langs: languages
	});

	return highlighter;
}

/**
 * `defaultColor: false` emits both themes as CSS variables on every token, so
 * the theme toggle switches colours without anything being re-highlighted.
 */
export function highlight(instance: Highlighter, code: string, lang: string) {
	return instance.codeToHtml(code, {
		lang: languages.includes(lang) ? lang : 'text',
		themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
		defaultColor: false
	});
}
