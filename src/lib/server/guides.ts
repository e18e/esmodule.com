import { Marked, type Tokens } from 'marked';
import type { Guide, GuideMeta } from '../guides.ts';
import { get_highlighter, highlight } from './highlight.ts';

/**
 * Guides are plain markdown files in `guides/` at the root of the repo.
 */
const guide_sources = import.meta.glob('/guides/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parse_frontmatter(source: string, path: string) {
	const match = FRONTMATTER.exec(source);

	if (!match) {
		throw new Error(`${path}: missing frontmatter block`);
	}

	const fields: Record<string, string> = {};

	for (const line of match[1].split('\n')) {
		if (!line.trim()) continue;

		const separator = line.indexOf(':');

		if (separator === -1) {
			throw new Error(`${path}: frontmatter line is not "key: value": ${line}`);
		}

		fields[line.slice(0, separator).trim()] = line
			.slice(separator + 1)
			.trim()
			.replace(/^['"]|['"]$/g, '');
	}

	for (const required of ['title', 'stack', 'description']) {
		if (!fields[required]) {
			throw new Error(`${path}: frontmatter is missing "${required}"`);
		}
	}

	return { fields, body: source.slice(match[0].length) };
}

function slugify(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

async function create_renderer() {
	const highlighter = await get_highlighter();

	const marked = new Marked({
		renderer: {
			code({ text, lang }: Tokens.Code) {
				return highlight(highlighter, text, lang ?? 'text');
			},
			heading({ tokens, depth }: Tokens.Heading) {
				const text = this.parser.parseInline(tokens);
				const id = slugify(this.parser.parseInline(tokens).replace(/<[^>]+>/g, ''));

				return `<h${depth} id="${id}">${text}</h${depth}>\n`;
			}
		}
	});

	return marked;
}

function read(path: string) {
	const slug = path.split('/').pop()!.replace(/\.md$/, '');
	const { fields, body } = parse_frontmatter(guide_sources[path], path);

	return {
		meta: {
			slug,
			title: fields.title,
			stack: fields.stack,
			description: fields.description
		} satisfies GuideMeta,
		body
	};
}

/** Every guide's metadata, alphabetical by title. */
export function list_guides(): GuideMeta[] {
	return Object.keys(guide_sources)
		.map((path) => read(path).meta)
		.sort((a, b) => a.title.localeCompare(b.title));
}

export async function get_guide(slug: string): Promise<Guide | undefined> {
	const path = Object.keys(guide_sources).find((candidate) => candidate.endsWith(`/${slug}.md`));

	if (!path) return undefined;

	const { meta, body } = read(path);
	const marked = await create_renderer();

	return { ...meta, html: await marked.parse(body) };
}
