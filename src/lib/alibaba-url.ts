/** Turn pasted Alibaba text (full URL, domain, or offer id) into a browser href. */
export function resolveAlibabaHref(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;

  if (/^https?:\/\/\S+$/i.test(t)) return t;
  if (/^\/\/\S+$/i.test(t)) return `https:${t}`;
  if (/^www\./i.test(t)) return `https://${t}`;

  const withoutProto = t.replace(/^https?:\/\//i, "");
  if (/alibaba\.com/i.test(withoutProto)) return `https://${withoutProto}`;

  if (/^[a-zA-Z0-9_-]{5,}$/.test(t)) {
    return `https://www.alibaba.com/product-detail/_${t}.html`;
  }

  return null;
}
