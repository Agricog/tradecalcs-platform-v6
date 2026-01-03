import DOMPurify from 'dompurify'

export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: []
  })
}

export const sanitizeText = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  })
}

export const sanitizeForPdf = (input: string): string => {
  // Strip all HTML, keep plain text only
  const clean = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  })
  
  // Remove any remaining special characters that could break PDF
  return clean
    .replace(/[\x00-\x1F\x7F]/g, '') // Control characters
    .trim()
}
