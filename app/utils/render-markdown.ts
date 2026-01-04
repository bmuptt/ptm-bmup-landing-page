import sanitizeHtml from 'sanitize-html'

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    'p',
    'div',
    'span',
    'br',
    'hr',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'ul',
    'ol',
    'li',
    'strong',
    'em',
    's',
    'code',
    'pre',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName: string, attribs: Record<string, string | undefined>) => {
      const href = String(attribs.href || '')
      const isExternal = /^https?:\/\//i.test(href)

      const target = attribs.target || (isExternal ? '_blank' : undefined)
      const rel = attribs.rel || (isExternal ? 'noopener noreferrer' : undefined)

      return {
        tagName,
        attribs: {
          ...attribs,
          ...(target ? { target } : {}),
          ...(rel ? { rel } : {}),
        },
      }
    },
    img: (tagName: string, attribs: Record<string, string | undefined>) => {
      const loading = attribs.loading || 'lazy'
      return { tagName, attribs: { ...attribs, loading } }
    },
  },
}

export const sanitizeHtmlContent = (html: string): string => {
  return sanitizeHtml(String(html || ''), sanitizeOptions)
}

export const toPlainTextFromHtml = (html: string): string => {
  const text = sanitizeHtml(String(html || ''), { allowedTags: [], allowedAttributes: {} })
  return text.replace(/\s+/g, ' ').trim()
}

export const renderMarkdownToSafeHtml = sanitizeHtmlContent
export const toPlainTextFromMarkdown = toPlainTextFromHtml
