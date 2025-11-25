import { marked } from "marked";
import sanitize from "sanitize-html";
import TurndownService from "turndown";

export const sanitizeMarkdownContent = (markdownContent) => {

    const turndownService = new TurndownService();

    // 1. Convert Markdown to HTML
    const convertedHtmlContent = marked.parse(markdownContent);

    // 2. Sanitize the HTML content
    const sanitizedHtmlContent = sanitize(convertedHtmlContent, {
        allowedTags: sanitize.defaults.allowedTags.concat([ 'img' ]),
        allowedAttributes: {
            ...sanitize.defaults.allowedAttributes,
            img: [ 'src', 'alt', 'title', 'width', 'height' ]
        }
    });

    // 3. Convert sanitized HTML back to Markdown

    const sanitizedMarkdown = turndownService.turndown(sanitizedHtmlContent);
    return sanitizedMarkdown;
};
