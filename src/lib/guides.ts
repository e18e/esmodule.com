export interface GuideMeta {
	slug: string;
	title: string;
	/** The kind of tool the guide covers, e.g. "Bundler". */
	stack: string;
	description: string;
}

export interface Guide extends GuideMeta {
	/** Rendered markdown body. */
	html: string;
}
