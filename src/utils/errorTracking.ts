import * as Sentry from '@sentry/react'

export const initializeSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN

  if (!dsn) {
    console.warn('Sentry DSN not configured - error tracking disabled')
    return
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
    beforeSend(event) {
      // Filter out sensitive data
      if (event.request?.headers) {
        delete event.request.headers['Authorization']
        delete event.request.headers['X-CSRF-Token']
      }
      return event
    }
  })
}

export const captureError = (
  error: unknown,
  context: string,
  extra?: Record<string, unknown>
) => {
  console.error(`[${context}]`, error)
  
  Sentry.captureException(error, {
    tags: {
      context
    },
    extra
  })
}

export const captureMessage = (
  message: string,
  level: 'info' | 'warning' | 'error' = 'info'
) => {
  Sentry.captureMessage(message, level)
}
