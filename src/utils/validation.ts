export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
  sanitized: string
}

export const validateInput = (
  input: string,
  type: 'email' | 'number' | 'text' | 'currency' | 'date',
  maxLength: number = 255
): ValidationResult => {
  const errors: Record<string, string> = {}
  let sanitized = input.trim()

  // Length check
  if (sanitized.length > maxLength) {
    errors.length = `Maximum ${maxLength} characters allowed`
  }

  // Type-specific validation
  if (type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(sanitized)) {
      errors.email = 'Invalid email format'
    }
  } else if (type === 'number') {
    if (isNaN(Number(sanitized))) {
      errors.number = 'Must be a valid number'
    }
  } else if (type === 'currency') {
    const currencyRegex = /^\d+(\.\d{1,2})?$/
    if (!currencyRegex.test(sanitized)) {
      errors.currency = 'Invalid currency format (e.g., 123.45)'
    }
  } else if (type === 'date') {
    const date = new Date(sanitized)
    if (isNaN(date.getTime())) {
      errors.date = 'Invalid date format'
    }
  }

  // XSS Protection
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized
  }
}
