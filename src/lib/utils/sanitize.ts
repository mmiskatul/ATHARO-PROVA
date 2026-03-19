import sanitizeHtml from "sanitize-html";

export function sanitizeRichText(value: string) {
  return sanitizeHtml(value, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "h3"]),
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
}
