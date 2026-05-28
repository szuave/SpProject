import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: true });

/**
 * Render door de admin/personeel geschreven markdown naar HTML.
 * De output wordt gesaneerd zodat ingesloten ruwe HTML (script, iframe,
 * event-handlers, javascript:-URI's) geen stored-XSS kan veroorzaken —
 * defense-in-depth, ook al zijn de auteurs ingelogd.
 */
export function renderMarkdown(md: string): string {
  const html = marked.parse(md ?? "", { async: false }) as string;
  return sanitize(html);
}

function sanitize(html: string): string {
  return html
    // Verwijder gevaarlijke elementen volledig (incl. inhoud).
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?(?:script|style|iframe|object|embed|form|input|textarea|button|link|meta|base)\b[^>]*>/gi, "")
    // Strip inline event-handlers: onclick=, onerror=, onload=, ...
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, "")
    // Neutraliseer javascript:/data:-URI's in links en bronnen.
    .replace(/(href|src)\s*=\s*"(?:\s*(?:javascript|data|vbscript):)[^"]*"/gi, '$1="#"')
    .replace(/(href|src)\s*=\s*'(?:\s*(?:javascript|data|vbscript):)[^']*'/gi, "$1='#'");
}
